const User = require('../models/user')
const bcrypt = require('bcryptjs')

const getUser = (req, res) => {
  res.json('getUsers')
}

const getUsers = async (req, res) => {
  const { limit = 5, from = 0 } = req.query
  const activeUsers = { status: true }
  const usersPromise = User.find(activeUsers)
    .skip(Number(from))
    .limit(Number(limit))

  const totalPromise = User.countDocuments(activeUsers)

  const [{ value: users }, { value: total }] = await Promise.allSettled([usersPromise, totalPromise])

  res.json({
    total,
    users
  })
}

const createtUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    // encrypt the password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    // save in DB
    await user.save()

    res.json({
      msg: 'User created succesfully',
      user: user.toJSON()
    })
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { password, google, ...restBody } = req.body

  if (password) {
    const salt = bcrypt.genSaltSync()
    restBody.password = bcrypt.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, restBody)
  res.json({
    msg: `User ${id} succesfully updated`,
    user
  })
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  // Physically deleted
  // const user = await User.findByIdAndDelete(id)

  // Logically deleted
  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json({ msg: `User ${id} succesfully deleted`, user })
}

module.exports = {
  getUsers,
  createtUser,
  updateUser,
  deleteUser,
  getUser
}
