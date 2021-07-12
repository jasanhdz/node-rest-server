const express = require('express')
const hbs = require('hbs')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8080

hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static('public'))

app.set('view engine', 'hbs')

app.get('/', function(req, res) {
  res.render('home', {
    name: 'Jasan Hernández',
    title: 'Curso de NodeJS'
  })
})

app.get('/generic', function(req, res) {
  res.render('generic')
})

app.get('/elements', function(req, res) {
  res.render('elements')
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
  console.log(`Escuchando en el puerto http://localhost:${port}`)
})