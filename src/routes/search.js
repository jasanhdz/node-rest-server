const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields, validateJWT } = require('../middlewares')
const { search } = require('../controllers/search')
const router = Router() 

router.get('/:collection/:termino', search)


module.exports = router