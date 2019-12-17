var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/RespUtil")
var commentDao = require("../dao/CommentDao")
var url = require("url")
var captcha = require("svg-captcha");
var path = new Map();


function queryNewComment (request,response){
    commentDao.queryNewCommentBySize(5,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","验证成功",result));
        response.end();
    })
}

path.set("/queryNewComment",queryNewComment);



function queryCommentByBlogId (request,response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","验证成功",result));
        response.end();
    })
}

path.set("/queryCommentByBlogId",queryCommentByBlogId);

function addComment(request,response){
    var params = url.parse(request.url, true).query;
    console.log(params)
    commentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.parentName,params.userName,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论成功",null));
        response.end();
    })
}
path.set("/addComment",addComment);

function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success","验证成功",img));
    response.end();
}
path.set("/queryRandomCode",queryRandomCode)

function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid),function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end()
    })
}
path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId)




module.exports.path = path;