const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role })
  if (!roleExists) throw new Error(`The role ${role} is not registered in db`)
}

const isValidEmail = async (email = '') => {
  const emailExists = await User.findOne({ email })
  if (emailExists) throw new Error(`The email <${email}> is already registered.`)
}
const isValidUserID = async (id = '') => {
  const idExists = await User.findById(id)
  if (!idExists) throw new Error(`The id <${id}> doesn't exists.`)
}

module.exports = {
  isValidRole,
  isValidEmail,
  isValidUserID
}
