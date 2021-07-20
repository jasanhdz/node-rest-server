
class Message {
  constructor( uid, name, message ) {
    this.uid = uid
    this.name = name
    this.message = message
  }
}

class ChatMessages {
  constructor() {
    this.messages = []
    this.users = {}
  }

  get lastTen() {
    this.messages = this.messages.splice(0, 10)
    return this.messages
  }

  get usersArr() {
    return Object.values(this.users)
  }

  seendMessage({ uid, name, message }) {
    this.messages.unshift(
      new Message(uid, name, message)
    )
    console.log(this.messages)
  }

  addUser(user) {
    this.users[user.id] = user
  }

  disconectUser(uid) {
    delete this.users[uid]
  }
}

module.exports = ChatMessages