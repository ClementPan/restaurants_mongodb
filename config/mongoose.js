const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants_mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
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