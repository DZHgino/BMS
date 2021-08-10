/*
 * @Description: 
 * @Author: zhihong deng
 * @Date: 2021-05-16 20:14:25
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-17 00:03:23
 */
const express = require('express')
const router = express.Router()



const memberController = require('../controllers/memberController')
router.get('/lst',memberController.showMemberList);
router.get('/add',memberController.showMemberForm);
module.exports = router