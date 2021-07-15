const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
  name: { type: String, unique: true, require: [true, 'El nombre es obligatorio'] },
  state: { type: Boolean, default: true, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


CategorySchema.methods.toJSON = function() {
  const { __v, _id, state, ...otherProps } = this.toObject()
  otherProps.uid = _id 
  return otherProps
}

module.exports = model('Categorie', CategorySchema)