const jwt = require('jsonwebtoken')
const User = require('../models/user')

const jwtValidate = async (req, res, next) => {
  const SECRET = process.env.SECRET_JWT_KEY
  const token = req.header('token')

  if (!token) return res.status(400).json({ msg: 'Empty token header' })

  try {
    const { uid } = jwt.verify(token, SECRET)
    const user = await User.findById(uid)

    // Verify user
    if (!user) res.status(401).json({ msg: 'Not valid token' })
    if (!user.status) res.status(401).json({ msg: 'Not valid token' })

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: 'Not valid token' })
  }
}

module.exports = { jwtValidate }
