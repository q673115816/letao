$(function(){
    var page = 1;
    var pageSize = 3;
    render();
    function render(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
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
    $(".first_add").on("click",function(){
        $("#add_cate").modal("show");
    })

    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'名称不能为空'
                    }
                }
            }
        }
    })
    $("#form").on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$("#form").serialize(),
            success:function(i){
                //直接重新加载页面，一切恢复都是浮云
                // location.reload();
                if(i.success){
                    $("#add_cate").modal("hide");
                    render();
                    $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })
})