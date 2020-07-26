const mongoose = require('mongoose')
const Restaurant = require('../restaurant') //載入 restaurant model
const restaurantData = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurants_mongodb', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// connection error
db.on('error', () => {
  console.log('MongoDB connection error!')
})

// connection success
db.once('open', () => {
  console.log('MongoDB connection success!')
  restaurantData.results.forEach(restaurant => Restaurant.create({
    id: restaurant.id,
    name: restaurant.name,
    name_en: restaurant.name_en,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.google_map,
    rating: restaurant.rating,
    description: restaurant.description
  }))
  console.log('restaurants created.')
})