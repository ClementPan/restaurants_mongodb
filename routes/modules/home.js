const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// const restaurant = require('../../models/restaurant')

// set root path
router.get('/', (req, res) => {
  Restaurant.find()  // find all data, not specific one.
    .sort({ _id: 1 })
    .lean() // don't process it, Mongoose.
    .then(restaurants => { res.render('index', { restaurants }) }) //use the todos data found by mongoose to bulit index.
    .catch(error => console.error(error))
})

// set search 
router.get('/search', (req, res) => {
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

module.exports = router