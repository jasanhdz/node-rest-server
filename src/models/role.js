const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
  role: { type: String, require: [true, 'El role es obligatorio'] },
})

module.exports = model('Role', RoleSchema)