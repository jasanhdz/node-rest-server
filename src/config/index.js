require('dotenv').config()

const config = {
  port: process.env.port || '3001',
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
}

module.exports = {
  config
}