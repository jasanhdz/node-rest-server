require('dotenv').config()

const config = {
  port: process.env.port || '3001'
}

module.exports = {
  config
}