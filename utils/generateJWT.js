const jwt = require('jsonwebtoken')
const generateJWT = (uid = '') => {
  const SECRET = process.env.SECRET_JWT_KEY

  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, SECRET, { expiresIn: '4h' }, (err, token) => {
      if (err) {
        console.log(err)
        return reject(new Error("The token couldn't be generated"))
      }

      resolve(token)
    })
  })
}

module.exports = { generateJWT }
