const express = require('express')
const { config } = require('../config')
const { join } = require('path')
const cors = require('cors')
const userRoute = require('../routes/user')
const authRoute = require('../routes/auth')
const { dbConnection } = require('../db/config')

class Server {
  constructor() {
    this.app = express()
    this.port = config.port
    this.dbConnect()
    this.middlewares()
    this.paths = {
      users: '/api/users',
      auth: '/api/auth'
    }
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.static(join(__dirname, '../../public')))
  }

  routes() {
    this.app.use(this.paths.users, userRoute)
    this.app.use(this.paths.auth, authRoute)
  }

  async dbConnect() {
    await dbConnection()
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto http://localhost:${this.port}`)
    })
  }
}

module.exports = Server