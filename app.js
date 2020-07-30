// setting
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


// require routes
const routes = require('./routes')

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// connect to database
require('./config/mongoose')

// require Restaurant (Schema)
const Restaurant = require('./models/restaurant')
const { urlencoded } = require('body-parser')
const restaurant = require('./models/restaurant')

//////////////////////////////////////////////////

//set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// use method-override
app.use(methodOverride('_method'))

// set static = public
app.use(express.static('public'))

// set routes
app.use(routes)

// starting the server
app.listen(port, () => {
  console.log(`The restaurants server is working on http://localhost:${port}`)
})
