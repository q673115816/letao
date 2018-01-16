$(function(){
    var key = GET("key")

    var item;
    var sort;
    console.log(key);
    $(".lt_search input").val(key)
    $(".lt_search button").on("click",function(){
        var tmp = $(".lt_search input").val().trim();
        if(!tmp){
            mui.toast("请输入搜索关键词");
            return ;
        }
        location.href = "./searchlist.html?key="+tmp;
    })
    render();
    function render(){
        $(".lt_product").html("<div class='loading'></div>")
        idea = {
            proName:key,
            page:1,
            pageSize:100,
        };
        item?idea[item] = sort:null;
        $.ajax({
            url:'/product/queryProduct',
            data:idea,
            success:function(i){
                console.log(i);
                setTimeout(function(){
                    $('.lt_product').html(template('tpl',i))
                },1000)
            }
        })
    }

    $(".lt_sort [data-item]").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active").find("i").addClass("fa-angle-down").removeClass("fa-angle-up");
        $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        item = $(this).data("item");
        sort = $(this).find("i").hasClass("fa-angle-down")?2:1;
        render()
    })
});