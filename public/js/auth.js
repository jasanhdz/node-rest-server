var pathname = 'http://localhost:3001/'
const url = `${pathname}api/auth/`
const myForm = document.querySelector('form')
myForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(myForm)
  const email = formData.get('email')
  const password = formData.get('password')
  const data = { email, password }

  fetch(url + 'login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  })
  .then((res) => res.json())
  .then(({ msg, token }) => {
    if(!token) return console.error(msg)
    console.log({ msg, token })
    localStorage.setItem('token', token)
    window.location = 'chat.html'
  })
  .catch(console.error)
})
function onSignIn(googleUser) {
  const { id_token } = googleUser.getAuthResponse()
  console.log(id_token)
  createUser(id_token)
}
function createUser(id_token) {
  fetch(url + 'google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_token })
  })
  .then((response) => response.json())
  .then(({ token }) => {
    localStorage.setItem('token', token)
    window.location = 'chat.html'
    console.log(token)
  })
  .catch(console.error)
}