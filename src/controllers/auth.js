const { request, response } = require('express')
const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT }  = require('../helpers/generate-jwt')
const { googleVerify }  = require('../helpers/google-verify')

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body
  try {
  const { email, name, image } = await googleVerify(id_token)
   // verify user not exist in database
   let user = await UserModel.findOne({ email })
   if(!user) {
     // i have created user
     const data = {
       name,
       email,
       password: ':P',
       image,
       google: true
     }
     user = new UserModel(data)
     await user.save()
   } 
   if(!user.state) {
     return res.status(401).json({
       msg: 'Hable con el administrador, user blockead'
     })
   }

   // Generate JWT
   const token = await generateJWT(user.id)

    res.json({
      msg: 'Ok Google Sign In',
      token
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Token de Google no es válido',
    })
  }
}

module.exports = {
  login,
  googleSignIn
}