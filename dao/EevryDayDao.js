var dbutill = require("./DBUtill");

function insertEveryDay(content,ctime,success){
   let insertSql = "INSERT INTO every_day(`content`, `ctime`) VALUES(?,?)";
   let params = [content ,ctime]

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

function queryEveryDay(success){
    let querySql = "select * from every_day order by id desc limit 1;";
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


module.exports.insertEveryDay =insertEveryDay;
module.exports.queryEveryDay =queryEveryDay;