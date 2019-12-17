var dbutill = require("./DBUtill");

function insertTag(tag,ctime,utime,success){
    let insertSql = "INSERT INTO tags(`tag`, `ctime`,`utime`) VALUES(?,?,?)";
    let params = [tag,ctime,utime]

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

function queryTag(tag,success){
    let insertSql = "select * from tags where tag = ?;";
    let params = tag

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


function queryAllTag(success){
    let querySql = "select * from tags;";
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




module.exports.queryAllTag =queryAllTag;
module.exports.insertTag =insertTag;
module.exports.queryTag =queryTag;