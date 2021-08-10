/*
 * @Description: 
 * @Author: zhihong deng
 * @Date: 2021-05-03 23:54:47
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-22 16:10:01
 */
const express = require('express')
const path = require('path')
const app = express()
const port = 6060
const cookieSession = require('cookie-session')
const cors = require('cors')

//专门解析post的模块
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use( cors() );//设置响应头，允许跨域请求
app.use(cookieSession({
    name: 'sessionId',
    keys: ['@zhe.shi→deng.zhi.hong:de.li;an;xi?xi?ang,mu'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  
app.use(express.static('public'))
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const movieRouter = require('./router/movie')
const indexRouter = require('./router/index')
const backRouter = require('./router/back')
const memberRouter = require('./router/member')
const movieRouterApi = require('./router/api/movie')
const memberRouterApi = require('./router/api/member')//会员注册api
app.use('/admin/movie',movieRouter)
app.use('/admin',indexRouter)
app.use('/admin',backRouter)
app.use('/admin/member',memberRouter)
app.use('/api/v1/movie',movieRouterApi)
app.use('/api/v1/member',memberRouterApi)

app.listen(port, () => {
  console.log(`端口运行在 http://localhost:${port}`)
})