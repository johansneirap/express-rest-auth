const express = require('express')
const { login } = require('../controllers/auth')
const { check } = require('express-validator')
const { fieldsValidate } = require('../middlewares/fieldValidator')

const router = express.Router()

router.post('/login', [
  check('email', 'Email required').isEmail(),
  check('password', 'Password required').notEmpty(),
  fieldsValidate
], login)
module.exports = router
