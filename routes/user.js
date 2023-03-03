const express = require('express')
const { getUsers, createtUser, updateUser, deleteUser } = require('../controllers/user')
const router = express.Router()

router.get('/', getUsers)
router.post('/', createtUser)
router.put('/', updateUser)
router.delete('/', deleteUser)

module.exports = router
