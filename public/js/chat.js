
let user = null
let socket = null

// Referencias HTML

const $uid = document.querySelector('#uid')
const $textMessage = document.querySelector('#textMessage')
const $users = document.querySelector('#users')
const $messages = document.querySelector('#menssages')
const $btnlogout = document.querySelector('#btnlogout')


var pathname = window.location.origin
const url = `${pathname}/api/auth/`

// validity jwt of localStorage
const validityJWT = async () => {
  const token = localStorage.getItem('token') || ''
  if(token.length < 10) {
    window.location = 'index.html'
    throw new Error('No hay token en el servidor')
  }
  const res = await fetch(url , {
    headers: { 'Authorization': token }
  })
  const { user: userDB, token: tokenDB } = await res.json()
  localStorage.setItem('token', tokenDB)
  user = userDB
  document.title = user.name
  await connectSocket()
}

const connectSocket = async () => {
  socket = io({
    'extraHeaders': {
      'Authorization': localStorage.getItem('token')
    }
  })
  
  socket.on('connect', () => {
    console.log('sockets online')
  })
  
  socket.on('disconnect', () => {
    console.log('sockets online')
  })

  socket.on('recived-messages', drawingMessages)
  socket.on('active-users', drawingUsers)
  socket.on('private-message', (payload) => {
    console.log('Privado: ', payload)
  })
}

const drawingUsers = (users = []) => {
  let usersHTML = ''
  users.forEach(({ name, uid }) => {
    usersHTML += `
    <li>
      <p>
        <h5 class="text-success">
          ${name}
        </h5>
        <span class="fs-6-text-muted"> ${uid} </span>
      </p>
    </li>`
  })
  $users.innerHTML = usersHTML
}

const drawingMessages= (messages = []) => {
  console.log(messages)
  let messagesHTML = ''
  messages.forEach(({ name, message }) => {
    messagesHTML += `
    <li>
      <p>
        <span class="text-primary">
          ${name}
        </span>
        <span> ${message} </span>
      </p>
    </li>`
  })
  $messages.innerHTML = messagesHTML
}

$textMessage.addEventListener('keyup', ({ keyCode }) => {
  const message = $textMessage.value
  const uid = $uid.value
  if(keyCode !== 13) return;
  if(message.length === 0) return;
  socket.emit('seend-message', {
    message,
    uid,
  })
  $textMessage.value = ''

})

const main = async () => {
  await validityJWT()
}

main()


//const socket = io()
