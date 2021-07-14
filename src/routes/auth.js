const { Router } = require('express')
const { check } = require('express-validator')
const { validateFileds } = require('../middlewares/validate-user-fileds')
const { login, googleSignIn } = require('../controllers/auth')

const router = Router()

router.post('/login', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').notEmpty(),
  validateFileds
], login)

router.post('/google', [
  check('id_token', 'El id_token es obligatorio').notEmpty(),
  validateFileds
], googleSignIn)

module.exports = router