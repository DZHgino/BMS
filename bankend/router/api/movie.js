/*
 * @Description: 电影相关接口
 * @Author: zhihong deng
 * @Date: 2021-05-18 21:40:34
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-18 22:51:05
 */
const express = require('express')
const router = express.Router()
const movieController = require('../../controllers/api/movieController')

router.get('/lst',movieController.getMovieList)

module.exports = router