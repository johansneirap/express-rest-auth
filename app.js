const express = require('express')
const { dbConnection } = require('./db/config')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use('/api', require('./routes'))

const initDB = async () => await dbConnection()

initDB().catch(e => console.log(e))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
