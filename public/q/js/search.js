$(function(){

    $('.lt_search button').on("click",function(){
        var tmp = $(this).prev().val().trim();
        if(!tmp){
            mui.toast("请输入搜索关键词");
            return ;
        }
        $(this).prev().val("");
        var arr = history();
        var index = arr.indexOf(tmp);
        if(index!=-1){
            arr.splice(index,1)
        }
        if(arr.length>=10){
            arr.pop();
        }
        arr.unshift(tmp);
        localStorage.setItem("lt_search_history",JSON.stringify(arr));
        // render()
        location.href = "./searchlist.html?key="+tmp;
    });




    $(".lt_history").on("click",'span',function(){
        var index = $(this).data("id");
        mui.confirm("您确定要删除吗","温馨提示",['是','否'],function(e){
            if(e.index==0){
                var arr = history();
                arr.splice(index,1)
                localStorage.setItem("lt_search_history",JSON.stringify(arr))
                render()
            }
        })
    });



    $('.lt_history').on("click",".fa-trash",function(){
        mui.confirm("您确定要删除吗","温馨提示",['是','否'],function(e){
            if(e.index==0){
                localStorage.setItem("lt_search_history","[]");
                render()
            }
        })
    });




    function history(){
        var history = localStorage.getItem("lt_search_history") || [];
        var arr = JSON.parse(history);
        return arr;
    }
    render();
    function render(){
        $(".lt_history").html(template('tpl',{arr:history()}))
    }
});