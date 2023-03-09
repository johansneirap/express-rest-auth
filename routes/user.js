const express = require('express')
const { check } = require('express-validator')
const { getUser, getUsers, createtUser, updateUser, deleteUser } = require('../controllers/user')
const { fieldsValidate } = require('../middlewares/fieldValidator')
const { isValidRole, isValidEmail, isValidUserID } = require('../utils/dbValidators')
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', [
  check('email', 'The email is not valid').isEmail(),
  check('email').custom(isValidEmail),
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password is required').not().isEmpty(),
  check('password', 'The password should have minumum 6 characters').isLength({ min: 6 }),
  // check('role', 'The role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isValidRole),
  fieldsValidate

], createtUser)

router.put('/:id', [
  check('id', 'Must be a valid ID').isMongoId(),
  check('id').custom(isValidUserID),
  fieldsValidate
], updateUser)

router.delete('/:id', [
  check('id', 'Must be a valid ID').isMongoId(),
  check('id').custom(isValidUserID),
  fieldsValidate
], deleteUser)

module.exports = router
