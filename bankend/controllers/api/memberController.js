/*
 * @Description: 
 * @Author: zhihong deng
 * @Date: 2021-05-22 16:11:23
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-23 00:14:53
 */
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const siteSalt = require('../../config/salt');
const FmemberModel = require('../../models/fmemberModel')

function register(req,res){
    let username = req.body.username.trim();
    let password = req.body.password.trim();

    if(username == ''){
        let returnData = {
            error_code: 1001,
            reason: '注册失败，用户名不能为空',
            result: {
                data: null
            }
        }
        res.json( returnData );
    }else if(password == ''){
        let returnData = {
            error_code: 1002,
            reason: '注册失败，密码不能为空',
            result: {
                data: null
            }
        }
        res.json( returnData );
    }
        FmemberModel.checkUserName( username, (error,data) => {
            if(error){
                let returnData = {
                    error_code: 1003,
                    reason: '注册失败，系统内部错误，练习管理员',
                    result:{
                        data: null
                    }
                }
                res.json( returnData );
            }else if(data.status == false){//用户信息存在，不能注册
                let returnData = {
                    error_code: 1004,
                    reason: '注册失败，用户名已存在',
                    result:{
                        data: null
                    }
                }
                res.json( returnData );
            }else if(data.status == true){//用户信息不存在，可以注册
                FmemberModel.addUser(username,md5(password),(error,data) => {
                    if(error){
                        let returnData = {
                            error_code: 1005,
                            reason: '注册失败，系统错误',
                            result:{
                                data: null
                            }
                        }
                        res.json( returnData );
                    }else{
                        let returnData = {
                            error_code: 0,
                            reason: '注册成功',
                            result:{
                                id: data._id,
                                username: data.username,
                            }
                        }
                        res.json( returnData );
                    }
                })
            }
        })

    
}
function login(req,res){
    let username = req.body.username.trim();
    let password = req.body.password.trim();

    if(username == ''){
        let returnData = {
            error_code: 1001,
            reason: '登录失败，用户名不能为空',
            result: {
                data: null
            }
        }
        res.json( returnData );
    }else if(password == ''){
        let returnData = {
            error_code: 1002,
            reason: '登录失败，密码不能为空',
            result: {
                data: null
            }
        }
        res.json( returnData );
    }

    FmemberModel.login(username,password,(error,data) => {
        if(error){
            let returnData = {
                error_code: 2001,
                reason: '登录失败，系统错误',
                result:{
                    data:null
                }
            }
            res.json( returnData );
        }else if(data.status == false){
            let returnData = {
                error_code: 2002,
                reason: '登录失败，' + data.msg,
                result:{
                    data:null
                }
            }
            res.json( returnData );
        }else if(data.status == true){
            let signData = {
                id: data.userInfo._id,
                username:data.userInfo.username
            }
            const token = jwt.sign(signData,siteSalt.ApiSalt,{expiresIn: 2 * 60 * 60});
            let returnData = {
                error_code: 0,
                reason: '登录成功',
                result:{
                    data:{ token,username:data.userInfo.username }
                }
            }
            res.json( returnData );
        }
    })
}
module.exports = {
    register,
    login
}