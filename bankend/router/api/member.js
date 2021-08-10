/*
 * @Description: 电影相关接口
 * @Author: zhihong deng
 * @Date: 2021-05-18 21:40:34
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-22 20:44:10
 */
const express = require('express')
const router = express.Router()
const memberController = require('../../controllers/api/memberController')

router.post('/register',memberController.register)
router.post('/login',memberController.login)

module.exports = router