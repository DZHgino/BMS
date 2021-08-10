/*
 * @Description: 电影数据层，处理相关数据
 * @Author: zhihong deng
 * @Date: 2021-05-18 22:05:03
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-22 12:44:15
 */
const DBConfig = require('../config/db');
// 操作数据库
const mongoose = require('mongoose');
//全局变量
const MovieModel = mongoose.model('Movie', { 
    movieName: String,
    imgUrl: String,
    markup: String,
    downUrl: String,
    sercet: String
});
function getMovieData(callback){
    mongoose.connect(DBConfig.DSN);
    MovieModel.find().exec((error,data) => {
        if(error){
            callback(error)
            console.log('获取电影数据失败');
        }else{
            data = JSON.parse(JSON.stringify(data));
            callback(null,data);
        }
    }); 
}
module.exports = {
    getMovieData
}