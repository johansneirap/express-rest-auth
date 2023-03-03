const User = require('../models/user')
const bcrypt = require('bcryptjs')
const getUsers = (req, res) => {
  res.json('getUsers')
}
const createtUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    console.log(req.body)
    const user = new User({ name, email, password, role })

    // check if the user exists

    // encrypt the password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    // save in DB
    await user.save()

    const { password: pwd, ...userWithoutPassword } = user
    res.json({
      userWithoutPassword
    })
  } catch (error) {
    console.log(error)
  }
}
const updateUser = (req, res) => {
  res.json('updateUser')
}
const deleteUser = (req, res) => {
  res.json('deleteUser')
}

module.exports = {
  getUsers,
  createtUser,
  updateUser,
  deleteUser
}
