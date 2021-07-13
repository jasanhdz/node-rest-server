const { request, response } = require('express')

const getUsers = (req = request, res = response) => {
  const query = req.query
  res.json({ msg: 'GET API - Users', query })
}
const postUser = (req = request, res = response) => {
  const body = req.body
  res.json({ msg: 'POST API - Users', body })
}
const putUser = (req = request, res = response) => {
  const id = req.params.id
  res.json({ msg: 'PUT API - Users', id })
}
const deleteUser = (req = request, res = response) => {
  res.json({ msg: 'DELETE API - Users' })
}


module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser
}