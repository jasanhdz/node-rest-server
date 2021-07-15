const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-user-fileds')
const { login, googleSignIn } = require('../controllers/auth')

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

module.exports = router