var everyDayDao = require("../dao/EevryDayDao")
var path = new Map();
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/RespUtil")

function editEveryDay(request,response){
    request.on('data',function(data){
        // console.log(data.toString().trim());
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(),function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        })
    })
}

path.set("/editEveryDay",editEveryDay);

function queryEveryDay(request,response){
    everyDayDao.queryEveryDay(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","请求成功",result));
        response.end();
    })
}

path.set("/queryEveryDay",queryEveryDay);

module.exports.path = path;