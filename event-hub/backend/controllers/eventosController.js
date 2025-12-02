import Evento from '../models/Evento.js';
import Ingresso from '../models/Ingresso.js';


exports.listar = async (req, res) => {
    try {
        const { status, categoria, data } = req.query
        const filtros = {}

        if(status) filtros.status = status
        if(categoria) filtros.categoria = categoria
        if(data) filtros.data_evento = data

        const eventos = await Evento.findAll({ where: filtros })
        res.json(eventos)
    } catch (error) {
        console.error(error)
        res.status(500).json({erro: 'Erro ao listar eventos'})
    }
}

exports.buscarUm = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if(!evento) return res.status(404).json({erro: 'Evento não encontrado'})
        res.json(evento)
    } catch (error) {
        console.error(error)
        res.status(500).json({erro: 'Erro ao buscar cliente'})
    }
}

exports.criar = async (req, res) => {
    try {
        const dados = req.body
        if(!dados.nome || !dados.local || !dados.data_evento){
            return res.status(400).json({erro: 'Campos obrigatórios ausents'})
        }

        dados.createdBy = req.user.id
        dados.organizadorId = req.user.id

        const novo = await Evento.create(dados)
        res.status(201).json(novo)
    } catch (error) {
        console.error(error)
        res.status(500).json({erro: 'Erro ao criar evento'})
    }
}

exports.atualizar = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if(!evento) return res.status(404).json({erro: 'Evento não encontrado'})

        const { organizadorId, createdBy, updatedBy, ...dadosAtualizados } = req.body

        await evento.update({
        ...dadosAtualizados,
        updatedBy: req.user.id
        })

        res.json(evento)
    } catch (error) {
        console.error(error)
        res.status(500).json({erro: 'Erro ao atualizar evento'})
    }
}

exports.atualizarStatus = async (req, res) => {
    try {
        const { status } = req.body
        const validos = ['aberto', 'esgotado', 'encerrado', 'cancelado']

        if (!validos.includes(status)) {
            return res.status(400).json({ erro: 'Status inválido' })
        }

        const evento = await Evento.findByPk(req.params.id)
        if (!evento) return res.status(404).json({ erro: 'Evento não encontrado' })

        await evento.update({
            status,
            updatedBy: req.user.id
        })

        return res.json({ mensagem: 'Status atualizado', evento })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ erro: 'Erro ao atualizar status do evento' })
    }
}

exports.deletar = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if (!evento) return res.status(404).json({ erro: 'Evento não encontrado' })

        const existeIngressos = await Ingresso.count({
            where: { eventoId: evento.id }
        })

        if (existeIngressos > 0) {
            return res.status(400).json({
                erro: 'Não é possível excluir evento com ingressos vendidos.'
            })
        }

        await evento.destroy()
        return res.json({ mensagem: 'Evento removido com sucesso.' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ erro: 'Erro ao remover evento.' })
    }
}

exports.disponibilidade = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if (!evento) return res.status(404).json({ erro: "Evento não encontrado." })

        const totalVendidos = await Ingresso.sum("quantidade", {
            where: { eventoId: evento.id, status: 'confirmado' }
        }) || 0

        const disponibilidade = evento.capacidade - totalVendidos

        if (disponibilidade === 0 && evento.status !== 'esgotado') {
            await evento.update({ status: 'esgotado' })
        }

        if (disponibilidade > 0 && evento.status === 'esgotado') {
            await evento.update({ status: 'aberto' })
        }

        res.json({
            eventoId: evento.id,
            capacidadeTotal: evento.capacidade,
            vendidos: totalVendidos,
            disponiveis: disponibilidade,
            status: evento.status
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao calcular disponibilidade." })
    }
}
