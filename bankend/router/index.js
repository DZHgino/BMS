/*
 * @Description: 
 * @Author: zhihong deng
 * @Date: 2021-05-16 19:28:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-16 19:38:19
 */
const express = require('express')
const router = express.Router()

router.get('/index',(req,res) => {
    // console.log('用户标识：',req.session.username);
    res.render('index');
})
router.get('/welcome',(req,res) => {
    res.render('welcome');
})
module.exports = router