const { request, response } = require('express')
const { CategoryModel } = require('../models')

// get categories - public - paginated - total - populate
const getCategories = async (req = request, res = response) => {
  const { limit, from = 0 } = req.query
  const query = { state: true }
  const [total, categories] = await Promise.all([
    CategoryModel.countDocuments(query),
    CategoryModel.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', 'name')
  ])
  res.json({ total, categories })
}
// get category by id - populate {}
const getCategory = async (req = request, res = response) => {
  const { id } = req.params
  const category = await CategoryModel.findById(id).populate('user', 'name')
  res.json(category)
}
// create categorie - any person with token valid
const addCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase()
  const categoryDB = await CategoryModel.findOne({ name })
  if(categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`
    })
  }
  const data = { name, user: req.user._id }
  // Generate data save
  const category = new CategoryModel(data)
  await category.save()
  res.status(201).json({ msg: 'categories - POST', category })
}
// update category
const updateCategory = async (req = request, res = response) => {
  const id = req.params.id
  const { state, user, ...data } = req.body
  data.name = req.body.name.toUpperCase()
  data.user = req.user._id
  const category = await CategoryModel.findByIdAndUpdate(id, data, { new: true })
  res.json(category)
}
// delete categorie by state: false
const deleteCategory = async (req = request, res = response) => {
  const id = req.params.id
  const category = await CategoryModel.findByIdAndUpdate(id, { state: false })
  res.json({ msg: 'categories - delete success', category })
}

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}