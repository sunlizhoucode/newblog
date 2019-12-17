var blogDetail = new Vue({
    el:'#blog_detail',
    data:{
        title:'',
        content:"",
        ctime:"",
        tags:"",
        views:""
    },
    computed:{

    },
    created(){
        var searchUrlParams = location.search.indexOf("?") > -1?location.search.split("?")[1].split("&"):"";
        if(searchUrlParams == ""){
            return;
        }
        var bid = -1;
        for(var i = 0;i<searchUrlParams.length;i++){
            if(searchUrlParams[i].split("=")[0] == "bid"){
                try{
                    bid = parseInt(searchUrlParams[i].split("=")[1])
                }catch(e){
                    console.log(e);
                }
            }
        }
        axios.get("/queryBlogById?bid=" + bid
        ).then(function(result){
            // console.log(result)
            var resp = result.data.data[0];
            blogDetail.content = resp.content;
            blogDetail.ctime = resp.ctime;
            blogDetail.tags = resp.tags;
            blogDetail.views = resp.views;
            blogDetail.title = resp.title;
        }).catch(function(resp){
            console.log("请求失败")
        })
    }
});

var sendComment = new Vue({
    el:"#send_comment",
    data:{
        vcode:"",
        rightCode:""
    },
    computed:{
        changeCode(){
            return function(){
                axios.get("/queryRandomCode"
                ).then(function(resp){

                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                })
            }
        },
        sendComment:function(){
            return function(){
                var code = document.getElementById("comment_code").value;
                if(code != sendComment.rightCode){
                    alert("验证有误");
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1?location.search.split("?")[1].split("&"):"";
                var bid = -1;

                for(var i = 0;i<searchUrlParams.length;i++){
                    if(searchUrlParams[i].split("=")[0] == "bid"){
                        try{
                            bid = parseInt(searchUrlParams[i].split("=")[1])
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value
                var replyName = document.getElementById("comment_reply_name").value
                var name = document.getElementById("comment_name").value
                var email = document.getElementById("comment_email").value
                var content = document.getElementById("comment_content").value


                    axios.get("/addComment?bid=" + bid + "&parent=" +reply +"&parentName="+ replyName + "&userName=" +name +"&email=" + email + "&content=" + content
                ).then(function(resp){
                    alert(resp.data.msg)
                }).catch(function(resp){
                    console.log("请求失败")
                })


            }
        }
    },
    created(){
        this.changeCode();
    }
})

var blogComment = new Vue({
    el:'#blog_comments',
    data:{
        comments:[],
        total:null,
    },
    computed:{
        reply(){
            return function(commentId,userName){
               document.getElementById("comment_reply").value = commentId;
               document.getElementById("comment_reply_name").value = userName;
               location.href= "#send_comment";
            }
        }
    },
    created(){
        var searchUrlParams = location.search.indexOf("?") > -1?location.search.split("?")[1].split("&"):"";
        var bid = -1;
        for(var i = 0;i<searchUrlParams.length;i++){
            if(searchUrlParams[i].split("=")[0] == "bid"){
                try{
                    bid = parseInt(searchUrlParams[i].split("=")[1])
                }catch(e){
                    console.log(e);
                }
            }
        }

        axios.get("/queryCommentByBlogId?bid=" + bid
        ).then(function(resp){

            blogComment.comments = resp.data.data;
            for(var i = 0; i < blogComment.comments.length; i ++){
                if(blogComment.comments[i].parent > -1 ){
                    blogComment.comments[i].options = "回复@" + blogComment.comments[i].parent_name;
                }
            }
        });
        axios.get("/queryCommentsCountByBlogId?bid="+ bid
        ).then(function(resp){
            blogComment.total = resp.data.data[0].count
        })
    },
})