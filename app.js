// setting
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// require routes
const routes = require('./routes')

// to be replaced
const restaurants = require('./restaurant.json')

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// connect database "restaurants_mongodb: restaurants"
require('./config/mongoose')

// require Restaurant (Schema)
const Restaurant = require('./models/restaurant')
const { urlencoded } = require('body-parser')
const restaurant = require('./models/restaurant')

//////////////////////////////////////////////////

//set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// setting static = public
app.use(express.static('public'))

app.use(routes)

// starting the server
app.listen(port, () => {
  console.log(`The restaurants server is working on http://localhost:${port}`)
})
