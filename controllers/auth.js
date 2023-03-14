const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../utils/generateJWT')
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // TODO:
    // Verify is exists the email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'User / password incorrect'
      })
    }
    // Verify if the user is active in DB
    if (!user.status) {
      return res.status(400).json({
        msg: 'User / password incorrect'
      })
    }

    // Verify password
    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        msg: 'User / password incorrect'
      })
    }

    // Generate the JWT

    const token = await generateJWT(user.id)

    return res.json({ msg: 'Login ok', user, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Something went wrong, contact the administrator'
    })
  }
}

module.exports = {
  login
}
