const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields, validateJWT } = require('../middlewares')
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { categoryExistById } = require('../helpers/db-validators')
const router = Router() 

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'No es un id de Mongo Válido').isMongoId(),
  check('id').custom(categoryExistById),
  validateFields
], getCategory)

router.post('/', [
  validateJWT,
  check('name', 'Name is required').notEmpty(),
  validateFields
], addCategory)

router.put('/:id', [
  validateJWT,
  check('id', 'No es un id de Mongo Válido').isMongoId(),
  check('name', 'Name is required').notEmpty(),
  check('id').custom(categoryExistById),
  validateFields
], updateCategory)

router.delete('/:id', [
  validateJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(categoryExistById),
  validateFields
], deleteCategory)


module.exports = router