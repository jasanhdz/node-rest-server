const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields, validateJWT, isAdmin } = require('../middlewares')
const { productExistById, categoryExistById } = require('../helpers/db-validators')
const { 
  getProductAll, 
  getProduct, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/product')
const router = Router() 

router.get('/', getProductAll)

router.get('/:id', [
  check('id', 'No es un id de Mongo Válido').isMongoId(),
  check('id').custom(productExistById),
  validateFields
], getProduct)

router.post('/', [
  validateJWT,
  check('name', 'Name is required').notEmpty(),
  check('description', 'Name is required').notEmpty(),
  check('category', 'Category is required').notEmpty(),
  check('category', 'Category is not MongoId').isMongoId(),
  validateFields,
  check('category').custom(categoryExistById),
  validateFields
], addProduct)

router.put('/:id', [
  validateJWT,
  check('id', 'No es un id de Mongo Válido').isMongoId(),
  validateFields,
  check('id').custom(productExistById),
  validateFields,
], updateProduct)

router.delete('/:id', [
  validateJWT,
  isAdmin,
  check('id', 'No es un id de Mongo Válido').isMongoId(),
  check('id').custom(productExistById),
  validateFields
], deleteProduct)

module.exports = router