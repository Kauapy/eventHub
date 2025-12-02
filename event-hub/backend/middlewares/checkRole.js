module.exports = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.perfil)) {
      return res.status(403).json({ message: 'Acesso negado: perfil não autorizado' });
    }
    next();
  };
};
