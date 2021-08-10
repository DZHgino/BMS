/*
 * @Description: 
 * @Author: zhihong deng
 * @Date: 2021-05-16 19:37:56
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-16 20:02:58
 */
const express = require('express')
const router = express.Router()
const md5 = require('md5')
const app = express()
const siteConfig = require('../config/salt')
const cookieSession = require('cookie-session')
// 操作数据库
const mongoose = require('mongoose');
const AdminModel = mongoose.model('Admin', { 
    username: String,
    password: String,
});
app.use(cookieSession({
    name: 'sessionId',
    keys: ['@zhe.shi→deng.zhi.hong:de.li;an;xi?xi?ang,mu'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

router.get('/login',(req,res) => {
    res.render('login');
})
router.post('/checkLogin',(req,res) => {
    // console.log('req.body',req.body);
    let username = req.body.username.trim();
    let password = req.body.password.trim();
    if( username === '' && password === ''){
        console.log('请输入信息！！！');
        return;
    }else if( password === '' ){
        console.log('请输入密码');
        return;
    }else if( username === '' ){
        console.log('请输入用户名');
        return;
    }
    mongoose.connect('mongodb://localhost/BMSdb');
    AdminModel.find({username}).exec((error,data) => {
        if( error ){
            res.redirect('/admin/login');
            return;
        }else{
            if( data.length == 1 ){
                if( data[0].password === md5(md5( password ) + siteConfig.AdminSalt )){
                    req.session.username = username;
                    res.redirect('/admin/index');
                    return;
                }else {
                    res.redirect('/admin/login');
                    return;
                }
            }
            console.log('获取到的管理员信息：',data);
            res.redirect('/admin/login');
            return;
        }
    })
    console.log('账号：',username,'密码：',password);
})
router.get('/logOut',(req,res) => {
    req.session.username = null;
    res.redirect('/admin/login');
})

module.exports = router