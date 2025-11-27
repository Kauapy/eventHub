const Evento = require('../models/Evento')
const Ingresso = require('../models/Ingresso')

exports.listar = async (req, res) => {
    try {
        const { status, categoria, data } = req.query
        const filtros = {}

        if(status) filtros.status = status
        if(categoria) filtros.categoria = categoria
        if(data) filtros.data = data

        const eventos = await Evento.findAll({ where: filtros })
        res.json(eventos)
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao listar eventos'})
    }
}

exports.buscarUm = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if(!evento) return res.status(404).json({erro: 'Evento não encontrado'})
        res.json(evento)
    } catch (error) {
        console.erro(err)
        res.status(500).json({erro: 'Erro ao buscar cliente'})
    }
}

exports.criar = async (req, res) => {
    try {
        const dados = req.body
        if(!dados.nome || !dados.local || !dados.data_evento){
            return res.status(400).json({erro: 'Campos obrigatórios ausents'})
        }

        dados.createBy = req.user.id
        dados.organizadorId = req.user.id

        const novo = await Evento.create(dados)
        res.status(201).json(novo)
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao criar evento'})
    }
}

exports.atualizar = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if(!evento) return res.status(404).json({erro: 'Evento não encontrado'})

        await evento.update({
            ...req.body,
            updateBy: req.user.id
        })

        res.json(evento)
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao atualizar evento'})
    }
}

exports.atualizarStatus = async (req, res) => {
    try {
        const { status } = req.body
        const validos = ['aberto', 'esgotado', 'encerrado', 'cancelado']

        if(!validos.includes(status)){
            return res.status(400).json({erro: 'Status inválido'})
        }

        await evento.update({
            status, updateBy: req.user.id
        })

        res.json({mensagem: 'Status atualizado', evento})
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao atualizar status de evento'})
    }
}

exports.deletar = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if(!evento) return res.status(404).json({erro: 'Evento não encontrado'})
        await evento.destroy()
        res.json({mensagem: 'Evento removido'})
    } catch (error) {
        console.error(err)
        res.status(500).json({ erro: "Erro ao remover evento." })
    }
}

exports.disponibilidade = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id)
        if (!evento) return res.status(404).json({ erro: "Evento não encontrado." })

        // soma total de ingressos vendidos
        const totalVendidos = await Ingresso.sum("quantidade", {
            where: { eventoId: evento.id }
        }) || 0

        const disponibilidade = evento.capacidade - totalVendidos

        res.json({
            eventoId: evento.id,
            capacidadeTotal: evento.capacidade,
            vendidos: totalVendidos,
            disponiveis: disponibilidade,
            status: evento.status
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ erro: "Erro ao calcular disponibilidade." })
    }
}