const { Socket } = require('socket.io')
const { checkJWT } = require('../helpers/generate-jwt')
const { ChatMessages } = require('../models')
const chatMessages = new ChatMessages()

const socketController = async (socket = new Socket(), io) => {
  const user = await checkJWT(socket.handshake.headers['authorization'])
  if(!user) return socket.disconnect()
  console.log('Se connecto: ', user)
  chatMessages.addUser(user)
  io.emit('active-users', chatMessages.usersArr)
  io.emit('recived-messages', chatMessages.lastTen)

  socket.join(user.id) // gloabl, socket.id, user.id

  socket.on('disconnect', () => {
    chatMessages.disconectUser(user.id)
  })

  socket.on('seend-message', ({ uid, message }) => {
    if(uid) {
      // menssage private
      socket.to(uid).emit('private-message', { de: user.name, message })
    } else {
      chatMessages.seendMessage({ uid: user.id, name: user.name, message })
      io.emit('recived-messages', chatMessages.lastTen)
    }
  })
}

module.exports = {
  socketController
}