// 總路由器
// require router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')

// 準備引入路由模組
router.use('/search', search)
router.use('/restaurants', restaurant)
router.use('/', home)


// 匯出路由器
module.exports = router