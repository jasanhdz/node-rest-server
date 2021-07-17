const jwt = require('jsonwebtoken')
const { request, response } = require('express')
const { config } = require('../config')
const UserModel = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('Authorization')
  if(!token) {
    return res.status(401).json({
      msg: 'Unauthorized '
    })
  }
  try {
    const { uid } = jwt.verify(token, config.secreteKey)
    const user = await UserModel.findById(uid)
    if(!user) {
      return res.status(401).json({
        msg: 'User deleted or not exist in DB'
      })
    }
    // verify if user has state true
    if(!user.state) {
      return res.status(401).json({
        msg: 'Token no válido - User with state false'
      })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      msg: 'Unauthorized '
    })
  }
}

module.exports = {
  validateJWT
}