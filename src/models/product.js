const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: { type: String, unique: true, require: [true, 'El nombre es obligatorio'] },
  state: { type: Boolean, default: true, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: { type: Number, default: 0 },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  },
  description: { type: String },
  available: { type: Boolean, default: true }
})


ProductSchema.methods.toJSON = function() {
  const { __v, _id, state, ...otherProps } = this.toObject()
  otherProps.uid = _id 
  return otherProps
}

module.exports = model('Product', ProductSchema)