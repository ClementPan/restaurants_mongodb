const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
let keyword = ''

////// simple search //////
router.get('/', (req, res) => {
  keyword = req.query.keyword.toLocaleLowerCase()
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { name_en: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } }
    ]
  })
    .lean()
    .then(restaurants => {
      searchedData = restaurants
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

////// sort //////
router.get('/by/:mean', (req, res) => {
  let mean = req.params.mean
  let meanForIndex = ''
  let field = ""

  // 處理搜尋條件
  if (mean === 'asc') {
    field = "name_en"
    meanForIndex = 'A to Z'
  } else if (mean === 'desc') {
    field = "name_en"
    meanForIndex = ' Z to A'
  } else if (mean === 'category') {
    field = 'category'
    mean = 1
    meanForIndex = 'Category'
  } else if (mean === 'location') {
    field = "location"
    mean = 1
    meanForIndex = 'Location'
  } else if (mean === 'rating') {
    field = 'rating'
    mean = -1
    meanForIndex = 'Rating'
  }
  console.log(`Find in ${field} and sort by ${mean}`)

  // 執行搜尋排序
  return Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { name_en: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ]
  })
    .sort({ [field]: mean })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, mean: meanForIndex, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router
