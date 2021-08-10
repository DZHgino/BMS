/*
 * @Description: 获取电影列表
 * @Author: zhihong deng
 * @Date: 2021-05-18 22:00:13
 * @LastEditors: zhihong deng
 * @LastEditTime: 2021-05-22 13:13:05
 */
const MovieModel = require('../../models/movieModel')
const siteConfig = require('../../config/site')
function getMovieList(req,res) {
    MovieModel.getMovieData((error,data) => {
        if(error){
            let returnData = {
                error_code: 1,
                reason: '获取数据失败',
                result: {
                    data: null
                }
            }
            res.json(returnData);
        }else{
            let result = [];
            let tmp = {};
            data.forEach((val,index) => {
                // console.log(val);
                tmp = {
                    movieName: val.movieName,
                    imgUrl: siteConfig.PREVIEW + val.imgUrl,
                    markup: val.markup,
                    downUrl: val.downUrl,
                    secret: val.secret,
                }
                console.log(tmp);
                result.push( tmp );
            })
            let returnData = {
                error_code: 0,
                reason: '获取数据成功',
                result: {
                    data: result
                }
            }
            res.json(returnData);
        }
    })
}
module.exports = {
    getMovieList
}