var randomTags = new Vue({
    el:'#random_tags',
    data:{
        tags:[]
    },
    computed:{
        randomColor(){
            return function(){
                var red = Math.random()*255+50;
                var green = Math.random()*255+50;
                var blue = Math.random()*255+50;
                return `rgb(`+red+','+green+','+blue+')'
            }
        },
        randomSize(){
            return function(){
                var size = (Math.random()*20+12) +'px';
                return size
            }
        }
    },
    created(){
        axios.get("/queryRandomTags"
        ).then(function(resp){
            var result = [];
            for(var i = 0 ;i < resp.data.data.length;i++){
                if(Math.random() > 0.5){
                    result.push({text:resp.data.data[i].tag,link:"/?tag=" + resp.data.data[i].tag})
                }
            }
            randomTags.tags = result;
        })
    }
});

var newHot = new Vue({
    el:'#new_hot',
    data:{
        hotList:[]
    },
    computed: {},
    created() {
        axios.get("/queryHotBlog"
        ).then(function(resp){

            var result = [];
            for(var i =0;i<resp.data.data.length;i++){
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                result.push(temp)
            }
            newHot.hotList = result;
        })
    }
})

var newComments = new Vue({
    el:'#new_comments',
    data:{
        commentList:[]
    },
    computed:{},
    created(){
        axios.get("/queryNewComment"
        ).then(function(resp){
            var result = [];
            for(var i = 0 ;i<resp.data.data.length;i++){
                var temp = {};
                temp.name=resp.data.data[i].user_name;
                temp.comment = resp.data.data[i].comments;
                temp.date = resp.data.data[i].ctime;
                result.push(temp);
            }
            newComments.commentList = result;
        })
    }
})