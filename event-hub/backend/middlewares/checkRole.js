module.exports.permitirPerfis = (...perfisPermitidos)=>{
    return (req, res, next) => {

        if(!req.user){
            return res.status(401).json({ 
                message: 'Usuário não autenticado.' 
            })
        }
        if(!perfisPermitidos.includes(req.user.perfil)){
            return res.status(403).json({
                message: 'Acesso negado. Permissão insuficiente.'
            })
        }
        next()
    }
}