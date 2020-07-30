const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// set root path
router.get('/', (req, res) => {
  Restaurant.find()  // find all data, not specific one.
    .sort({ _id: 1 })
    .lean() // don't process it, Mongoose.
    .then(restaurants => { res.render('index', { restaurants }) }) //use the todos data found by mongoose to bulit index.
    .catch(error => console.error(error))
})

module.exports = router