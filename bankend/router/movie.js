/*
 * @Description: 
 * @Author: 
 * @Date: 2021-05-16 17:08:02
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-22 15:58:13
 */

const express = require('express')
const app = express()
const router = express.Router()
const path = express('path')
// 上传功能
const multer  = require('multer')
const cookieSession = require('cookie-session')
// 操作数据库
const mongoose = require('mongoose');
// //全局变量
// const MovieModel = mongoose.model('Movie', { 
//     movieName: String,
//     imgUrl: String,
//     markup: String,
//     downUrl: String,
//     sercet: String
// });
// const upload = multer({ dest: 'public/uploads/' })//默认上传功能
// 自定义处理文件
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname( file.originalname ))
    }
  })
const upload = multer({ storage: storage }) 
app.use(cookieSession({
    name: 'sessionId',
    keys: ['@zhe.shi→deng.zhi.hong:de.li;an;xi?xi?ang,mu'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
router.get('/lst',(req,res) => {
    if( req.session && !req.session.username ){
        res.redirect('/admin/login');
        return;
    }
    // console.log('用户标识：',req.session.username);
    // 取出数据渲染
    mongoose.connect('mongodb://localhost/BMSdb');
    MovieModel.find().exec((error,data) => {
        // console.log('error',error);
        // console.log('data',data);
        if(error){
            console.log('获取电影数据失败');
            return;
        }else{
            res.render('movieList',{data});
        }
    }); 
})
router.get('/add',(req,res) => {
    res.render('movieAdd');
})
router.post('/store',upload.single('imgUrl'),(req,res) => {
    console.log(req.file);
    console.log(req.body);
    let imgUrl = 'uploads/default.png'
    if( req.file ){
        imgUrl = 'uploads/' + req.file.filename;
    };
    let movieName = req.body.movieName.trim();
    // let imgUrl = req.body.imgUrl;
    let markup = req.body.markup.trim();
    let downUrl = req.body.downUrl.trim();
    let sercet = req.body.sercet.trim(); 
    if(movieName === '' || downUrl === '' || sercet === ''){
        res.redirect('/admin/movie/add');
        return;
    }
    // 数据入库
    mongoose.connect('mongodb://localhost/BMSdb');
    const movieData = new MovieModel({ 
        movieName,
        imgUrl,
        markup,
        downUrl,
        sercet 
    });
    movieData.save().then(() => {
        console.log('数据存储成功！');
        res.redirect('/admin/movie/lst');
    });
})
module.exports = router