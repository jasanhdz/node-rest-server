const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields, validateJWT } = require('../middlewares')
const { login, googleSignIn, renewToken } = require('../controllers/auth')

const router = Router()

router.post('/login', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').notEmpty(),
  validateFields
], login)

router.post('/google', [
  check('id_token', 'El id_token es obligatorio').notEmpty(),
  validateFields
], googleSignIn)

router.get('/', validateJWT, renewToken)

module.exports = router