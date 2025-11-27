const brcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Organizador } = require('../models/Organizador')

module.exports = {
    async listar(req, res){
        try{
            const lista = await Organizador.findAll()
            res.status(200).json(lista)
        }catch(error){
            res.status(500).json({message: 'Erro ao listar organizadores', error: error.message})
        }
    },
    async criar(req, res){
        try{
            const { nome, email, senha } = req.body

            if(!nome || !email || !senha){
                return res.status(400).json({message: 'Nome, email e senha são obrigatórios'})
            }

            const organizadorExistente = await Organizador.findOne({where: {email}})
            if(organizadorExistente){
                return res.status(400).json({message: 'Já existe um organizador com este email.'})
            }

            const senhaHash = await brcrypt.hash(senha, 10)

            const novoOrganizador = await Organizador.create({
                nome,
                email,
                senha: senhaHash
            })
            menssage: 'Organizador criado com sucesso',
            res.status(201).json(novoOrganizador)
        }catch(error){
            res.status(500).json({message: 'Erro ao criar organizador', error: error.message})
        }
    },
    async atualizar(req, res){
        try{
            const { id } = req.params
            const { nome, email, senha } = req.body

            const organizador = await Organizador.findByPk(id)
        if(!organizador){
            return res.status(404).json({message: 'Organizador não encontrado.'})
        }

        if(email && email !== organizador.email){
            const organizadorExistente = await Organizador.findOne({where: {email}})
            if(organizadorExistente){
                return res.status(400).json({message: 'Já existe um organizador com este email.'})
        }
    }

    const dadosAtualizados = {
        nome: nome ?? organizador.nome,
        email: email ?? organizador.email
    }

    if(senha){
        dadosAtualizados.senha = await brcrypt.hash(senha, 10)
    }
    await organizador.update(dadosAtualizados)
    return res.json({message: 'Organizador atualizado com sucesso'})
    }
    catch(error){
        res.status(500).json({message: 'Erro ao atualizar organizador', error: error.message})
    }
    },
    async deletar(req, res){
    try{
        const { id } = req.params

        const organizador = await Organizador.findByPk(id)

        if(!organizador){
            return res.status(404).json({message: 'Organizador não encontrado.'})
        }
        await organizador.destroy()
        return res.json({message: 'Organizador deletado com sucesso'})
    }catch(error){
        res.status(500).json({message: 'Erro ao deletar organizador', error: error.message})
    }
    }
}