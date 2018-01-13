$(function(){

    var page = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(i){
                $("tbody").html(template("tpl",i))
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


    $(".btn_add").on("click",function(){
        $("#add_second").modal("show");
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function(i){
                console.log(i);
                $(".dropdown-menu").html(template("menutpl",i))
            }
        })
    })






    $(".dropdown-menu").on("click","a",function(){
        $(".form_firstAdd").val($(this).data("id"));
        $(".dropdown-text").text($(this).text());
        $("form").data("bootstrapValidator").updateStatus("categoryId","VALID")
    })
    $("#fileupload").fileupload({
        dataType:"json",
        done:function (e, data) {
            console.log(data);
            $(".img_box img").attr("src", data.result.picAddr);
            $("[name='brandLogo']").val(data.result.picAddr);
            $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID")

        }
    })
    $("form").bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'一级分类不能为空'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'二级分类不能为空'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传品牌图片'
                    }
                }
            }
        }
    })
    $("form").on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$("form").serialize(),
            success:function(i){
                console.log(i);
                //重置
                // location.reload();
                $("#add_second").modal("hide");
                page = 1;
                render();
                $("form").data('bootstrapValidator').resetForm(true);
                $(".dropdown-text").text("请选择一级分类");
                $(".form_firstAdd").val(null);
                $(".img_box img").attr("src", "./images/none.png");
                $("[name='brandLogo']").val("");

            }

        })
    })
})