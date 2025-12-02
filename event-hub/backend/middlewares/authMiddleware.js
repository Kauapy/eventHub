const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto'

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido.' })
    }

    const [bearer, token] = authHeader.split(' ')

    if (!token) {
        return res.status(401).json({ message: 'Token ausente.' })
    }

    if (bearer.toLowerCase() !== 'bearer') {
        return res.status(401).json({ message: 'Formato do Token inválido.' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado.' })
        }
        return res.status(401).json({ message: 'Token inválido.' })
    }
}
