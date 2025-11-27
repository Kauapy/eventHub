module.exports = (req, res, next) => {
    if(req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar este recurso.' })
    }
    next()
}