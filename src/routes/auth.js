const { Router } = require('express')
const { check } = require('express-validator')
const { validateFileds } = require('../middlewares/validate-user-fileds')
const { login } = require('../controllers/auth')

const router = Router()

router.post('/login', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').notEmpty(),
  validateFileds
], login)

module.exports = router