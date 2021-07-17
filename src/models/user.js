const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: { type: String, require: [true, 'El nombre es obligatorio'] },
  email: { type: String, require: [true, 'El email es obligatorio'], unique: true },
  password: { type: String, require: [true, 'La contraseña es obligatoria'] },
  image: { type: String },
  role: { type: String, require: true, enum: ['ADMIN_ROLE', 'USER_ROLE'] },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...userProps } = this.toObject()
  userProps.uid = _id
  return userProps
}

module.exports = model('User', UserSchema)