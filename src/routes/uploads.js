const { Router } = require('express')
const { check } = require('express-validator')
const { allowedCollections } = require('../helpers')
const { validateFields, validateUploadFile } = require('../middlewares')
const { loadFiles, showImage, updateImageCloudinary } = require('../controllers/uploads')
const router = Router()

router.post('/', validateUploadFile, loadFiles)

router.put('/:collection/:id', [
  validateUploadFile,
  check('id', 'El Id debe ser un ID válido de mongo').isMongoId(),
  validateFields,
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateFields
//], updateImage)
], updateImageCloudinary)

router.get('/:collection/:id', [
  check('id', 'El Id debe ser un ID válido de mongo').isMongoId(),
  validateFields,
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateFields
],  showImage)

module.exports = router