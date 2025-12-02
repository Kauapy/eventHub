import Participante from '../models/Participantes.js';
import Ingresso from '../models/Ingresso.js';
import Evento from '../models/Evento.js';


module.exports = {

    async listar(req, res){
        try{
            const lista = await Participante.findAll()
            return res.json(lista)
        }catch(error){
            console.error(error)
            return res.status(500).json({ erro: 'Erro ao listar participantes' })
        }
    },

    async criar(req, res) {
        try{
            const { nome, cpf, email, telefone } = req.body

            if(!nome || !cpf || !email || !telefone){
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios' })
            }

            const existeCpf = await Participante.findOne({ where: { cpf } })
            if(existeCpf){
                return res.status(400).json({ erro: 'CPF já cadastrado' })
            }

            const existeEmail = await Participante.findOne({ where: { email } })
            if(existeEmail){
                return res.status(400).json({ erro: 'Email já cadastrado' })
            }

            const novo = await Participante.create({
                nome,
                cpf,
                email,
                telefone,
                createdBy: req.user.id,
                updatedBy: req.user.id   // <--- ADICIONADO
            })
            return res.status(201).json(novo)

        }catch(error){
            console.error(error)
            return res.status(500).json({ erro: 'Erro ao criar participante' })
        }
    },

    async buscarUm(req, res){
        try{
            const participante = await Participante.findByPk(req.params.id)

            if(!participante){
                return res.status(404).json({ erro: 'Participante não encontrado' })
            }
            return res.json(participante)

        }catch(error){
            console.error(error)
            return res.status(500).json({ erro: 'Erro ao buscar participante' })
        }
    },

    async atualizar(req, res){
        try{
            const participante = await Participante.findByPk(req.params.id)

            if(!participante){
                return res.status(404).json({ erro: 'Participante não encontrado' })
            }

            if(req.body.email && req.body.email !== participante.email){
                const existeEmail = await Participante.findOne({ where: { email: req.body.email } })
                if(existeEmail){
                    return res.status(400).json({ erro: 'Email já cadastrado' })
                }
            }

            await participante.update({
                ...req.body,
                updatedBy: req.user.id
            })

            return res.json(participante)

        }catch(error){
            console.error(error)
            return res.status(500).json({ erro: 'Erro ao atualizar participante' })
        }
    },

    async deletar(req, res) {
        try{
            const participante = await Participante.findByPk(req.params.id)

            if(!participante){
                return res.status(404).json({ erro: 'Participante não encontrado' })
            }

            const ingressos = await Ingresso.count({
                where: { participanteId: req.params.id }
            })

            if(ingressos > 0){
                return res.status(400).json({
                    erro: 'Não é possível excluir participante com ingressos vinculados'
                })
            }

            await participante.destroy()
            return res.json({ mensagem: 'Participante deletado com sucesso' })

        }catch(error){
            console.error(error)
            return res.status(500).json({ erro: 'Erro ao deletar participante' })
        }
    },

    async historico(req, res){
        try{
            const ingressos = await Ingresso.findAll({
                where: { participanteId: req.params.id },
                include: [
                    { model: Evento, as: 'evento' }
                ]
            })
            return res.json(ingressos)

        }catch(error){
            console.error(error)
            return res.status(500).json({ erro: 'Erro ao buscar histórico de ingressos' })
        }
    }
}