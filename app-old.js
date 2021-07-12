const http = require('http')
const port = 8080

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  const person = {
    id: 1,
    name: 'Fernando'
  }
  res.write(JSON.stringify(person))
  res.end()
})
.listen(port)
console.log(`Escuchando en el puerto http://localhost:${port}`)