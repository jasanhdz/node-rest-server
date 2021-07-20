const jwt = require('jsonwebtoken')
const { config } = require('../config')
const { UserModel } = require('../models')

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, config.secreteKey, {
      expiresIn: '10 days',
    }, (err, token) => {
      if(err) {
        console.log(err)
        reject(error)
      }
      resolve(token)
    })
  })
}

const checkJWT = async (token = '') => {
  try {
    if(token.length < 10) return null

    const { uid } = jwt.verify(token, config.secreteKey)
    const user = await UserModel.findById(uid)
    if(!user || !user.state) {
      return null
    }
    return user

  } catch (error) {
    return null
  }
}

module.exports = {
  generateJWT,
  checkJWT
}