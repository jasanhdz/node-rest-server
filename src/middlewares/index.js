const validateFields = require('./validate-user-fileds')
const validateJWT = require('./validate-jwt')
const validateRoles = require('./validate-roles')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles
}