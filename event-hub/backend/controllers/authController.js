const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Organizador } = require('../models')

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto'
const JWT_EXPIRES = '1d'

module.exports = {
    async login(req, res){
        try{
            const { email, senha } = req.body

            if(!email || !senha){
                return res.status(400).json({ message: 'Email e senha são obrigatórios.' })
            }

            const user = await Organizador.findOne({ where: { email } })
            if(!user){
                return res.status(401).json({ message: 'Credenciais inválidas.' })
            }
            if(!user.status){
                return res.status(403).json({ message: 'Usuário inativo.' })
            }

            const senhaCorreta = await bcrypt.compare(senha, user.senha_hash)
            if(!senhaCorreta){
                return res.status(401).json({ message: 'Credenciais inválidas.' })
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, perfil: user.perfil },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES }
            )

            return res.json({
                message: 'Login realizado com sucesso.',
                token
            })

        }catch(error){
            console.error(error)
            return res.status(500).json({ message: 'Erro interno do servidor.' })
        }
    },
    
    logout(req, res){
        return res.json({ message: 'Logout realizado.' })
    },

    async perfil(req, res){
        return res.json(req.user)
    }
}
