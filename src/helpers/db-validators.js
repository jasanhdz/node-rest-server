const { CategoryModel, ProductModel } = require('../models')
const RoleModel = require('../models/role')
const UserModel = require('../models/user')

const isRoleValid = async (role = '') => {
  const roleExist = await RoleModel.findOne({ role })
  if(!roleExist) {
     throw new Error(`El rol: ${role} no está registrado en la base de datos`)
  }
}

const emailExist = async (email = '') => {
  const emailExist = await UserModel.findOne({ email })
  if(emailExist) {
    throw new Error(`El correo: ${email} ya esta registrado`)
  }
}

const userExistById = async (id = '') => {
  const userExist = await UserModel.findById(id)
  if(!userExist) {
    throw new Error(`El id: ${id} no existe`)
  }
}

const categoryExistById = async (id = '') => {
  const category = await CategoryModel.findById(id)
  if(!category) throw new Error('This category not exist in database')
  if(!category.state) throw new Error('Talk to the admin - state: false')
}

const productExistById = async (id = '') => {
  const product = await ProductModel.findById(id)
  if(!product) throw new Error('This product not exist in database')
  if(!product.state) throw new Error('Talk to the admin - state: false')
}

module.exports = {
  isRoleValid,
  emailExist,
  userExistById,
  categoryExistById,
  productExistById,
}