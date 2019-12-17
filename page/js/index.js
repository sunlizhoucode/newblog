var everyDay = new Vue({
   el:'#every_day',
   data:{
       content:'哈'
   },
    computed:{
        getContent(){
            return this.content
        }
    },
    created:function(){
        axios.get('/queryEveryDay', {
            params: {}
        }).then(function (result) {

                everyDay.content = result.data.data[0].content;
        }).catch(function (error) {
                console.log(error);
        });

    }
});


var articleList = new Vue({
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        count:30,
        pageNumList:[],
        article_list:[
            {
                title:'这个是标题',
                content:"这个是内容哦",
                date:"2018-12-12",
                tags:"test1",
                id:"1",
                link:"",
                views:23
            }
        ]
    },
    computed:{
        jumpTo(){
          return function(page){
              this.getPage(page,this.pageSize)
          }
        },
        getPage(){
            return function (page,pageSize){
                var searchUrlParams = location.search.indexOf("?") > -1?location.search.split("?")[1].split("&"):"";
                var tag = "";
                for(var i = 0;i<searchUrlParams.length;i++){
                    if(searchUrlParams[i].split("=")[0] == "tag"){
                        try{
                            tag = searchUrlParams[i].split("=")[1]
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                if(tag == ""){
                    axios.get('/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize,{
                        params: {}
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0 ; i<result.length;i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid="+ result[i].id;
                            list.push(temp);
                        }
                        articleList.article_list = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios.get('/queryBlogCount',{
                        params: {}
                    }).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool();
                    })
                }else{
                    axios.get('/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + "&tag=" + tag
                    ).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0 ; i<result.length;i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid="+ result[i].id;
                            list.push(temp);
                        }
                        articleList.article_list = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios.get('/queryBlogCount?tag=' + tag
                    ).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool();
                    })
                }

            }
        },
        // generatePageTool:function(){
        //     var nowPage = this.page;
        //     var pageSize = this.pageSize;
        //     var totalCount = this.count;
        //     var result = [];
        //     result.push({text:"<<",page:1});
        //     if(nowPage>2){
        //         result.push({text:nowPage -2,paeg:nowPage -2});
        //     }
        //     if(nowPage>1){
        //         result.push({text:nowPage -1,paeg:nowPage -1});
        //     }
        //     result.push({text:nowPage,page:nowPage})
        //     if(nowPage + 1 <= (totalCount + pageSize -1) /pageSize){
        //         result.push({text:nowPage + 1,page:nowPage + 1})
        //     }
        //     if(nowPage + 2 <= (totalCount + pageSize -1) /pageSize){
        //         result.push({text:nowPage + 2,page:nowPage + 2})
        //     }
        //     result.push({text:">>",page: parseInt((totalCount + pageSize -1) /pageSize)});
        //     this.pageNumList = result;
        //     return result;
        // }
    },
    methods:{
        generatePageTool:function(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page:1});
            if(nowPage>2){
                result.push({text:nowPage -2,paeg:nowPage -2});
            }
            if(nowPage>1){
                result.push({text:nowPage -1,paeg:nowPage -1});
            }
            result.push({text:nowPage,page:nowPage})
            if(nowPage + 1 <= (totalCount + pageSize -1) /pageSize){
                result.push({text:nowPage + 1,page:nowPage + 1})
            }
            if(nowPage + 2 <= (totalCount + pageSize -1) /pageSize){
                result.push({text:nowPage + 2,page:nowPage + 2})
            }
            result.push({text:">>",page: parseInt((totalCount + pageSize -1) /pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    created(){
        this.getPage(this.page,this.pageSize)
    }

});