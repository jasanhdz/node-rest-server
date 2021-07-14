const jwt = require('jsonwebtoken')
const { config } = require('../config')

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

module.exports = {
  generateJWT
}