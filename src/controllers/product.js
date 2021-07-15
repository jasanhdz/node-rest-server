const { request, response } = require('express')
const { ProductModel } = require('../models')

const getProductAll = async (req = request, res = response) => {
  const { limit, from = 0 } = req.query
  const query = { state: true }
  const [total, products] = await Promise.all([
    ProductModel.countDocuments(query),
    ProductModel.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', 'name')
  ])
  res.json({ total, products })
}
const getProduct = async (req = request, res = response) => {
  const { id } = req.params
  const category = await ProductModel.findById(id).populate('user', 'name')
  res.json(category)
}
const addProduct = async (req = request, res = response) => {
  const { state, user, ...body } = req.body
  const productDB = await ProductModel.findOne({ name: body.name.toUpperCase() })
  if(productDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`
    })
  }
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id
  }
  const product = new ProductModel(data)
  await product.save()
  res.status(201).json(product)
}
const updateProduct = async (req = request, res = response) => {
  const id = req.params.id
  const { state, user, ...data } = req.body
  if(data.name) {
    data.name = data.name.toUpperCase()
  }
  data.user = req.user._id
  const product = await ProductModel.findByIdAndUpdate(id, data, { new: true })
  res.json(product)
}
const deleteProduct = async (req = request, res = response) => {
  const id = req.params.id
  const product = await ProductModel.findByIdAndUpdate(id, { state: false })
  res.json({ msg: 'Product - delete success', product })
}

module.exports = {
  getProductAll,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
}