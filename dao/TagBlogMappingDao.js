var dbutill = require("./DBUtill");

function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    let insertSql = "insert into tag_blog_mapping(`tag_id`, `blog_id`, `ctime`, `utime`) VALUES(?,?,?,?)";
    let params = [tagId,blogId,ctime,utime]

    var connection = dbutill.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    });
    connection.end();
}


function queryByTag(tagId,page,pageSize,success){
    let querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";
    let params = [tagId,page*pageSize,pageSize]

    var connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    });
    connection.end();
}

function queryByTagCount(tagId,success){
    let querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?";
    let params = [tagId]

    var connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    });
    connection.end();
}

module.exports.queryByTagCount =queryByTagCount;
module.exports.queryByTag =queryByTag;
module.exports.insertTagBlogMapping =insertTagBlogMapping;