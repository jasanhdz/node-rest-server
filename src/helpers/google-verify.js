const { OAuth2Client } = require('google-auth-library')
const { config } = require('../config')
const client = new OAuth2Client(config.googleClientId)

const googleVerify = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.googleClientId,
  })
  const { email, name, picture: image } = ticket.getPayload()
  return { email, name, image }
}

module.exports = {
  googleVerify
}