$(function(){
    var id = GET("productId");
    render()
    function render(){
        $.ajax({
            url:'/product/queryProductDetail',
            data:{
                id:id
            },
            success:function(i){
                console.log(i);

                $(".mui-scroll").html(template('tpl',i))
                mui('.mui-scroll-wrapper').scroll({
                    scrollY: true, //是否竖向滚动
                    scrollX: false, //是否横向滚动
                    startX: 0, //初始化时滚动至x
                    startY: 0, //初始化时滚动至y
                    indicators: false, //是否显示滚动条
                });

                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
                });
                mui(".mui-numbox").numbox()
            }
        })
    }
    $(".mui-icon-reload").on('click',function(){
        location.reload()
    })
})