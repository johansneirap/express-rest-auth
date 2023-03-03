const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('DB succesfully connected')
  } catch (error) {
    console.log(error)
    throw new Error('Error initializing the database connection')
  }
}

module.exports = {
  dbConnection
}
