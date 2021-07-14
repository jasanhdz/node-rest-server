const { request, response } = require('express')
const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT }  = require('../helpers/generate-jwt')

const login = async (req = request, res = response) => {
  const { email, password } = req.body
  try {
    // TODO:
    // Verify if email exist
    const user = await UserModel.findOne({ email })
    if(!user) {
      return res.status(400).json({
        msg: 'Usuario / contraseña no son correctos - email'
      })
    }
    // If user is active
    if(!user.state) {
      return res.status(400).json({
        msg: 'Usuario / contraseña no son correctos - state false'
      })
    }
    // Verify password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if(!isPasswordCorrect) {
      return res.status(400).json({
        msg: 'Usuario / contraseña no son correctos - password'
      })
    }
    // Generate JWT
    const token = await generateJWT(user.id)

    res.json({
      msg: 'Login Ok',
      token
    })
  } catch (error) {
    return res.status(500).json({
      msg: "Algo salio mal, hable con el Administrador"
    })
  }
  res.json({
    msg: 'OK login'
  })
}

module.exports = {
  login
}