const mongoose = require('mongoose')
const { config } = require('../config')

const dbConnection = async () => {
  const { dbUser, dbPass, dbName } = config
  const mongoCNN = `mongodb+srv://${dbUser}:${dbPass}@cluster0.nnl4g.mongodb.net/${dbName}`
  try {
    await mongoose.connect(mongoCNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('Base de datos online')
  } catch(error) {
    console.error(error)
    throw new Error('Error a la hora de inicializar la base de datos')
  }
}

module.exports = {
  dbConnection
}