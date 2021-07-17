const { request, response } = require('express')
const { uploadFile } = require('../helpers')
const { UserModel, ProductModel } = require('../models')
const { join } = require('path')
const fs = require('fs')
const { config } = require('../config')
const cloudinary = require('cloudinary').v2
cloudinary.config(config.cloudinaryURL)

const allowedCollections = {
  users: UserModel,
  products: ProductModel
}

const loadFiles = async (req = request, res = response) => {
  try {
    const file = await uploadFile({ files: req.files, folder: 'usuarios' })
    res.json({ file })
  } catch(msg)  {
    res.status(400).json({ msg })
  }
  
}

const updateImage = async (req = request, res = response) => {
  const { id, collection } = req.params
  const model = await allowedCollections[collection].findById(id)
  const type = collection.split('').slice(0, collection.length - 1).join('')
  if(!model) return res.status(400).json({ msg: `No existe un ${type} con el id: ${id}` })

  // clear previus image
  if(model.image) {
    const imagePath =  join(__dirname, '../../uploads', collection, model.image)
    if(fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  model.image = await uploadFile({ files: req.files, folder: collection })
  await model.save()

  res.json(model)
}

const updateImageCloudinary = async (req = request, res = response) => {
  const { id, collection } = req.params
  const model = await allowedCollections[collection].findById(id)
  const type = collection.split('').slice(0, collection.length - 1).join('')
  if(!model) return res.status(400).json({ msg: `No existe un ${type} con el id: ${id}` })

  // clear previus image
  if(model.image) {
    const nameArr = model.image.split('/')
    const name = nameArr[nameArr.length - 1]
    const [public_id] = name.split('.')
    cloudinary.uploader.destroy(public_id)
  }
  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
  model.image = secure_url
  await model.save()

  res.json(image)
}

const showImage = async (req = request, res = response) => {
  const { id, collection } = req.params
  const model = await allowedCollections[collection].findById(id)
  const type = collection.split('').slice(0, collection.length - 1).join('')
  if(!model) return res.status(400).json({ msg: `No existe un ${type} con el id: ${id}` })

  // clear previus image
  if(model.image) {
    const imagePath =  join(__dirname, '../../uploads', collection, model.image)
    if(fs.existsSync(imagePath)) {
      return res.sendFile(imagePath)
    }
  }
  const pathDefaultImage = join(__dirname, '../../assets', 'no-image.jpg')
  res.sendFile(pathDefaultImage)
}

module.exports = {
  loadFiles,
  updateImage,
  updateImageCloudinary,
  showImage
}