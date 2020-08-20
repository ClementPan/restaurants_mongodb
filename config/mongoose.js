const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restaurants_mongodb'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// connection error
db.on('error', () => {
  console.log('MongoDB connection error!')
})

// connection success
db.once('open', () => {
  console.log('MongoDB connection success!')
})

module.exports = db