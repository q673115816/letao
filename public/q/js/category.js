$(function(){



    render()
    $(".lt_category-left").on("click","li",function(){
        $(this).addClass("active").siblings().removeClass("active");
        var id = $(this).data('id');
        console.log(id);
        render(id);
    })
    function render(id) {
        var id = id || 1;
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(i){
                $(".lt_category-right ul").html(template("listtpl",i))
                console.log(i);
                mui('.lt_category-right .mui-scroll-wrapper').scroll().scrollTo(0,0,100);
            }
        })
    }
    $.ajax({
        url:'/category/queryTopCategory',
        success:function(i){
            console.log(i);
            $(".lt_category-left ul").html(template("menutpl",i))
        }
    })
})