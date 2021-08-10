/*
 * @Description: 
 * @Author: zhihong deng
 * @Date: 2021-05-17 00:07:31
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-17 00:28:25
 */
const DBConfig = require('../config/db');
const mongoose = require('mongoose');
const memberModel = mongoose.model('Member', { 
    username: String,
    password: String,
});
function memberList (callback) {
    mongoose.connect( DBConfig.DSN );
    memberModel.find().exec((error,data) => {
        if(error){
           callback(error);
            return;
        }else{
            let jsonString = JSON.stringify(data);
            data = JSON.parse(jsonString);
            callback(null,data);
        }
    }); 
}
module.exports = {
    memberList
}