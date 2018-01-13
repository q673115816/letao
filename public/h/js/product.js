$(function(){
    var page = 1;
    var pageSize = 2;
    render()
    function render(){
        $.ajax({
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(i){
                console.log(i);
                $('tbody').html(template('tpl',i))
                $(".pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(i.total / i.size),
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    $(".product_add").on("click",function(){
        $("#add_product").modal("show");
    })
})