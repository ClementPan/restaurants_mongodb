const Restaurant = require('../restaurant') //載入 restaurant model
const restaurantData = require('../../restaurant.json')
const db = require('../../config/mongoose')

// connection success
db.once('open', () => {
  console.log('MongoDB connection success!')
  Restaurant.create(restaurantData.results)

    // restaurantData.results.forEach(restaurant =>
    // Restaurant.create(restaurant)
    // )
    .then(() => {
      console.log('restaurants created.')
      process.exit()
    })
    .catch(err => console.error(err))
})