const express = require('express')
const { config } = require('../config')
const { join } = require('path')
const cors = require('cors')
const userRoute = require('../routes/user')

class Server {
  constructor() {
    this.app = express()
    this.port = config.port
    this.middlewares()
    this.paths = {
      users: '/api/users'
    }
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.static(join(__dirname, '../../public')))
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello world')
    })
    this.app.use(this.paths.users, userRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto http://localhost:${this.port}`)
    })
  }
}

module.exports = Server