$(function(){
    var page = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url:"/user/queryUser",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(i){
                console.log(i);
                $("tbody").html(template("tpl",i))
                $(".pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(i.total/i.size),
                    size:'small',
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                        console.log(page);
                    }
                })
            }
        })
    }

})