// setting
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// to be replaced
const restaurants = require('./restaurant.json')

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// connect database "restaurants_mongodb: restaurants"
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants_mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// require Restaurant (Schema)
const Restaurant = require('./models/restaurant')
const { urlencoded } = require('body-parser')
const restaurant = require('./models/restaurant')

// connection error
db.on('error', () => {
  console.log('MongoDB connection error!')
})

// connection success
db.once('open', () => {
  console.log('MongoDB connection success!')
})

//////////////////////////////////////////////////

//set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// setting static = public
app.use(express.static('public'))

// set root path: index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => { res.render('index', { restaurants: restaurants }) })
    .catch(error => console.log(error))
})

// set show
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// set search 
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { name_en: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } }
    ]
  })
    .lean()
    .then(restaurants => { res.render('index', { restaurants: restaurants }) })
    .catch(error => console.log(error))
})

// set new: from index to new
app.get('/restaurants/create/new', (req, res) => {
  return res.render('new')
})

// set new: from new to index
app.post('/restaurants', (req, res) => {
  const newRest = req.body
  return Restaurant.create({
    name: newRest.name,
    name_en: newRest.name_en,
    category: newRest.category,
    location: newRest.location,
    google_map: newRest.google_map,
    phone: newRest.phone,
    description: newRest.description,
    image: newRest.image,
    rating: newRest.rating
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit: from index or show to edit
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// edit: from edit to index
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const newRest = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = newRest.name
      restaurant.name_en = newRest.name_en
      restaurant.category = newRest.category
      restaurant.location = newRest.location
      restaurant.google_map = newRest.google_map
      restaurant.phone = newRest.phone
      restaurant.description = newRest.description
      restaurant.image = newRest.image
      restaurant.rating = newRest.rating
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/`))
    .catch(error => console.log(error))
})

// remove 
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// starting the server
app.listen(port, () => {
  console.log(`The restaurants server is working on http://localhost:${port}`)
})
