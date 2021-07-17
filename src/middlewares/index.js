const validateFields = require('./validate-user-fileds')
const validateJWT = require('./validate-jwt')
const validateRoles = require('./validate-roles')
const validateFile = require('./validate-file')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
  ...validateFile,
}