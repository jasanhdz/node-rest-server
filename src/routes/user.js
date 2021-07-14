const { Router } = require('express')
const { getUsers, postUser, putUser, deleteUser } = require('../controllers/user')
const { check } = require('express-validator')
const { validateFileds, validateJWT, isAdmin, hasRole } = require('../middlewares')
const { isRoleValid, emailExist, userExistById } = require('../helpers/db-validators')

const router = Router()

router.get('/', getUsers)

router.post('/', [
  check('name', 'El name es requerido').not().isEmpty(),
  check('password', 'El password debe tener más de 6 letras').isLength({ min: 6 }),
  check('email', 'El email no es válido').isEmail(),
  // check('role', 'El ROLE no es válido').isIn(['ADMIN_ROLE, USER_ROLE']),
  check('role').custom(isRoleValid),
  check('email').custom(emailExist),
  validateFileds
], postUser)

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistById),
  check('role').custom(isRoleValid),
  validateFileds
], putUser)

router.delete('/:id', [
  validateJWT,
  // isAdmin,
  hasRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistById),
  validateFileds
], deleteUser)


module.exports = router

