// 總路由器
// require router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')

// 準備引入路由模組
router.use('/', home)
router.use('/restaurants', restaurant)

// 匯出路由器
module.exports = router