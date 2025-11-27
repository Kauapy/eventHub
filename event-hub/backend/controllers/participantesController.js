const Participante = require('../models/Participantes')

exports.listar = async(req, res) => {
    try {
        const lista = await Participante.findAll()
        res.json(lista)
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao lista participantes'})
    }
}

exports.buscarUm = async(req, res) => {
    try {
        const participante = await Participante.findByPk(req.params.id)
        if(!participante){
            res.status(404).json({erro: 'Participante não encontrado'})
        }
        res.json(participante)
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao buscar participante'})
    }
}

exports.atualizar = async(req, res) => {
    try {
    const participante = await Participante.findByPk(req.params.id)
    if(!participante){
        return res.status(404).json({erro: 'Participante não encontrado'})
    }
    await participante.update(req.body)
    res.json(participante)   
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao atualizar participante'})
    }
}

exports.deletar = async(req,res) => {
    try {
        const participante = await Participante.findByPk(req.params.id)
        if(!participante){
            return res.status(404).json({erro: 'Participante não encontrado'})
        }
        await participante.destroy()
        res.json({mensagem: 'Participante deletado com sucesso'})
    } catch (error) {
        console.error(error)
        res.status(500).json({erro: 'Erro ao deletar participante'})
    }
}

const Ingresso = require('../models/Ingresso')

exports.historico = async(req, res) => {
    try {
        const ingressos = await Ingresso.findAll({
            where: {participanteId: req.params.id}
        })

        res.json(ingressos)
    } catch (error) {
        console.error(err)
        res.status(500).json({erro: 'Erro ao buscar histórico de ingressos'})
    }
}