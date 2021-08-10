/*
 * @Description: 处理前台的模型
 * @Author: zhihong deng
 * @Date: 2021-05-17 00:07:31
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-22 22:14:48
 */
const DBConfig = require('../config/db');
const mongoose = require('mongoose');
const md5 = require('md5');
const FmemberModel = mongoose.model('Fmember', { 
    username: String,
    password: String,
},'FrontMember');
function checkUserName (username,callback) {
    mongoose.connect(DBConfig.DSN);
    FmemberModel.find({username}).exec((error,data)=>{
        if(error){
            callback(error);
        }else{
            if(data.length == 1){
                callback(null,{status:false,data});
            }else{
                callback(null,{status:true,data:null});
            }
        }
    })
};
// 入库
function addUser(username,password,callback){
    let member = new FmemberModel({username,password});
    member.save()
    .then((data) => {
        data = JSON.parse(JSON.stringify(data));
        callback(null,data);
    })
    .catch((error) => {
        callback(error);
    })
}
// 登录
function login(username,password,callback){
    FmemberModel.findOne({username}).exec((error,data) => {
        if(error){
            callback(error);
        }else{
            if(data){
                let userInfo = JSON.parse(JSON.stringify(data));
                if( userInfo.password === md5(password) ){
                    callback(null,{status:true,msg:'登录成功',userInfo});
                }else{
                    callback(null,{status:false,msg: '×密码错误×'});
                }
            }else{
                callback(null,{status:false,msg: '用户信息不存在'});
            }
        }
    })
}
module.exports = {
    checkUserName,
    addUser,
    login
}