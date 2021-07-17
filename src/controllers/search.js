const { request, response } = require('express')
const { isValidObjectId } = require('mongoose')
const { UserModel, CategoryModel, ProductModel } = require('../models')
const allowedCollections = [
  'users',
  'categories',
  'products',
  'roles'
]

const searchUsers = async (termino = '', res = response) => {
  if(isValidObjectId(termino)) {
    const user = await UserModel.findById(termino)
    return res.json({
      results: (user) ? [user] : []
    })
  }
  const regex = new RegExp(termino, 'i')
  const users = await UserModel.find({ 
    $or: [{ name: regex }],
    $and: [{ state: true }]
  })
  return res.json({
    count: users.length,
    results: users
  })
}

const searchCategories = async (termino = '', res = response) => {
  if(isValidObjectId(termino)) {
    const category = await CategoryModel.findById(termino)
    return res.json({
      results: (category) ? [category] : []
    })
  }
  const regex = new RegExp(termino, 'i')
  const categories = await CategoryModel.find({ name: regex, state: true })
  return res.json({
    count: categories.length,
    results: categories
  })
}

const searchProducts = async (termino = '', res = response) => {
  if(isValidObjectId(termino)) {
    const product = await ProductModel.findById(termino).populate('category', 'name')
    return res.json({
      results: (product) ? [product] : []
    })
  }
  const regex = new RegExp(termino, 'i')
  const products = await ProductModel.find({ name: regex, state: true }).populate('category', 'name')
  return res.json({
    count: products.length,
    results: products
  })
}

const search = (req = request, res = response) => {
  const { collection, termino } = req.params
  if(!allowedCollections.includes(collection)) {
    return res.status(404).json({
      msg: 'The allowed collections are: ' + allowedCollections
    })
  }
  
  switch(collection) {
    case 'users':
      searchUsers(termino, res)
      break
    case 'categories':
      searchCategories(termino, res)
      break
    case 'products':
      searchProducts(termino, res)
      break
    default:
      return res.status(404).json({
        msg: 'Se le olvido esta busquedad: '
      })
  }
}

module.exports = {
  search
}