const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto'

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader){
        return res.status(401).json({ message: 'Token não fornecido.' })
    }

    const [bearer, token] = authHeader.split(' ')
    if(bearer !== 'Bearer'){
        return res.status(401).json({ message: 'Formato do Token inválido.' })
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    }catch(error){
        return res.status(401).json({ message: 'Token inválido ou expirado.' })
    }
}