const { request, response } = require('express')

const isAdmin = (req = request, res = response, next) => {
  if(!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero'
    })
  }
  const { role, name } = req.user
  if(role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} no es administrador`
    })
  }
  next()
}

const hasRole = (...roles) => {
  return (req, res, next) => {
    if(roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio require uno de estos roles ${roles}`
      })
    }
    next()
  }
}

module.exports = {
  isAdmin,
  hasRole
}