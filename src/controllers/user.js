const { request, response } = require('express')
const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')

const getUsers = async (req = request, res = response) => {
  const { limit, from = 0 } = req.query
  const query = { state: true }

  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])
  res.json({ total, users })
}
const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body
  const user = new UserModel({ name, email, password, role })
  // encrypt password
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)
  // save database
  await user.save()
  res.json(user)
}
const putUser = async (req = request, res = response) => {
  const id = req.params.id
  const { _id, password, google, ...otherProps } = req.body

  if(password) {
    // encrypt password
    const salt = bcrypt.genSaltSync()
    otherProps.password = bcrypt.hashSync(password, salt)
  }
  const user = await UserModel.findByIdAndUpdate(id, otherProps)
  res.json(user)
}
const deleteUser = async (req = request, res = response) => {
  const id = req.params.id
  // delete disk fisic
  // const user = await UserModel.findByIdAndDelete()
  const user = await UserModel.findByIdAndUpdate(id, { state: false })
  res.json(user)
}


module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser
}