const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// set show
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// set new: from index to new (get new page)
router.get('/create/new', (req, res) => {
  return res.render('new')
})

// set new: from new to index (send new data)
router.post('/', (req, res) => {
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

// edit: from index or show to edit (get edit page)
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// edit: from edit to index (send edition)
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
