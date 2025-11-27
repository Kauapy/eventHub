const Ingresso = require('../models/Ingressos')
const Evento = require('../models/Evento')
const Participante = require('../models/Participantes')
const Organizador = require('../models/Organizadores')
const sequelize = require('../database/database')

module.exports = {

    async listarIngressos(req, res){
        try{
            const ingressos = await Ingresso.findAll({
                include: [
                    { model: Evento, as: 'evento' },
                    { model: Participante, as: 'participante' },
                    { model: Organizador, as: 'vendedor' }
                ]
            })
            return res.json(ingressos)

        }catch(error){
            return res.status(500).json({ message: 'Erro ao listar ingressos', error: error.message })
        }
    },


    async comprarIngresso(req, res){
        const transaction = await sequelize.transaction()

        try{
            const { evento_id, participante_id, tipo, quantidade } = req.body
            const vendedor_id = req.user.id

            if(!evento_id || !participante_id || !tipo || !quantidade){
                return res.status(400).json({ message: 'Dados incompletos.' })
            }

            const evento = await Evento.findByPk(evento_id, { transaction })

            if(!evento){
                return res.status(404).json({ message: 'Evento não encontrado.' })
            }

            if(['cancelado', 'encerrado'].includes(evento.status)){
                return res.status(400).json({ message: 'Não é possível vender ingressos para este evento.' })
            }

            const participante = await Participante.findByPk(participante_id)

            if(!participante){
                return res.status(404).json({ message: 'Participante não encontrado.' })
            }

            const vendidos = await Ingresso.sum('quantidade', {
                where: { evento_id },
                transaction
            }) || 0

            if(vendidos + quantidade > evento.capacidade){
                return res.status(400).json({ message: 'Evento lotado ou quantidade excede a capacidade.' })
            }

            let valorUnitario = evento.valor_inteira

            if(tipo === 'meia'){
                valorUnitario = evento.valor_inteira / 2
            }

            if(tipo === 'vip'){
                valorUnitario = evento.valor_vip
            }

            const valorTotal = valorUnitario * quantidade

            const ingresso = await Ingresso.create({
                evento_id,
                participante_id,
                vendedor_id,
                tipo,
                quantidade,
                valor_unitario: valorUnitario,
                valor_total: valorTotal,
                status: 'confirmado',
                data_compra: new Date()
            },{ transaction })

            if(vendidos + quantidade === evento.capacidade){
                await evento.update({ status: 'esgotado' }, { transaction })
            }

            await transaction.commit()
            return res.status(201).json({
                message: 'Ingresso vendido com sucesso!',
                ingresso
            })

        }catch(error){
            await transaction.rollback()
            return res.status(500).json({ message: 'Erro ao vender ingresso', error: error.message })
        }
    },


    async buscarIngresso(req, res){
        try{
            const { id } = req.params

            const ingresso = await Ingresso.findByPk(id, {
                include: [
                    { model: Evento, as: 'evento' },
                    { model: Participante, as: 'participante' },
                    { model: Organizador, as: 'vendedor' }
                ]
            })

            if(!ingresso){
                return res.status(404).json({ message: 'Ingresso não encontrado.' })
            }
            return res.json(ingresso)

        }catch (error){
            return res.status(500).json({ message: 'Erro ao buscar ingresso', error: error.message })
        }
    },


    async checkinIngresso(req, res){
        try{
            const { id } = req.params

            const ingresso = await Ingresso.findByPk(id, {
                include: { model: Evento, as: 'evento' }
            })

            if(!ingresso){
                return res.status(404).json({ message: 'Ingresso não encontrado.' })
            }

            const hoje = new Date().toISOString().slice(0, 10)
            const diaEvento = ingresso.evento.data_evento.toISOString().slice(0, 10)

            if(hoje !== diaEvento){
                return res.status(400).json({ message: 'Check-in só pode ser feito no dia do evento.' })
            }

            if(ingresso.status === 'usado'){
                return res.status(400).json({ message: 'Ingresso já utilizado.' })
            }

            await ingresso.update({
                status: 'usado',
                data_checkin: new Date()
            })
            return res.json({ message: 'Check-in realizado com sucesso!', ingresso })

        }catch (error){
            return res.status(500).json({ message: 'Erro ao realizar check-in', error: error.message })
        }
    },


    async cancelarIngresso(req, res){
        try{
            const { id } = req.params

            const ingresso = await Ingresso.findByPk(id,{
                include: { model: Evento, as: 'evento' }
            })

            if(!ingresso){
                return res.status(404).json({ message: 'Ingresso não encontrado.' })
            }

            const agora = new Date()
            const dataEvento = new Date(ingresso.evento.data_evento)
            const horasRestantes = (dataEvento - agora) / 1000 / 60 / 60

            if(horasRestantes < 24){
                return res.status(400).json({ message: 'Cancelamento permitido apenas até 24h antes do evento.' })
            }

            await ingresso.update({
                status: 'cancelado'
            })
            return res.json({ message: 'Ingresso cancelado com sucesso.' })

        }catch(error){
            return res.status(500).json({ message: 'Erro ao cancelar ingresso', error: error.message })
        }
    },


    async ingressosEvento(req, res){
        try{
            const { id } = req.params

            const ingressos = await Ingresso.findAll({
                where: { evento_id: id },
                include: { model: Participante, as: 'participante' }
            })
            return res.json(ingressos)

        }catch(error){
            return res.status(500).json({ message: 'Erro ao buscar ingressos do evento', error: error.message })
        }
    },


    async ingressosParticipante(req, res){
        try{
            const { id } = req.params

            const ingressos = await Ingresso.findAll({
                where: { participante_id: id },
                include: { model: Evento, as: 'evento' }
            })
            return res.json(ingressos)

        }catch(error){
            return res.status(500).json({ message: 'Erro ao buscar ingressos do participante', error: error.message })
        }
    }
}