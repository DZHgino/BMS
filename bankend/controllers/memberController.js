/*
 * @Description: 
 * @Author: zhihong deng
 * @Date: 2021-05-16 23:31:42
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-17 00:19:41
 */
const memberModel = require('../models/memberModel')
function showMemberList(req,res){
    memberModel.memberList((error,data) => {
        if(error){
            console.log('获取会员数据失败');
            return;
        }else{
            res.render('member/lst',{data});
            console.log('会员数据',data);
        }
    });
    
};
function showMemberForm(req,res){
    res.send('member form');
}
module.exports = {
    showMemberList,
    showMemberForm
}