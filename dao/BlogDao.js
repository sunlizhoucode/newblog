var dbutill = require("./DBUtill");

function queryBlogCount(success){
    let querySql = "select count(1) as count from blog;";
    let params = [];

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



function queryAllBlog(success){
    let querySql = "select * from blog order by id desc";
    let params = []

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





function queryBlogById(id,success){
    let querySql = "select * from blog where id = ?";
    let params = [id]

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




function queryBlogByPage(page,pageSize,success){
    let insertSql = "select * from blog order by id desc limit ?, ?";
    let params = [page*pageSize, pageSize]

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


function insertBlog(title,content,views,tags,ctime,utime,success){
    let insertSql = "insert into blog(`title`,`content`,`views`,`tags`, `ctime`,`utime`) values(?,?,?,?,?,?)";
    let params = [title,content,views,tags,ctime,utime]

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


function addViews(id,success){
    let querySql = "update blog set views = views + 1 where id = ?";
    let params = [id]

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



function queryHotBlogBySize(size,success){
    let querySql = "select * from blog order by views desc limit ?";
    let params = [size]

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


module.exports.queryHotBlogBySize =queryHotBlogBySize;
module.exports.addViews =addViews;
module.exports.insertBlog =insertBlog;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryBlogCount =queryBlogCount;
module.exports.queryBlogById =queryBlogById;
module.exports.queryBlogByPage =queryBlogByPage;