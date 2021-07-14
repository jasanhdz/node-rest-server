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

module.exports = {
  isRoleValid,
  emailExist,
  userExistById
}