$(function(){
    var page = 1;
    var pageSize = 2;
    var imgArr = [];
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
        var page = 1;
        var pageSize = 100;
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(i){
                console.log(i);
                $(".dropdown-menu").html(template('menutpl',i))
            }
        })
    })
    $(".dropdown-menu").on("click","a",function(){
        $(".dropdown-text").text($(this).text());
        $("[name=brandId]").val($(this).data('id'))
        $("form").data("bootstrapValidator").updateStatus("brandId","VALID")
    })
    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            if(imgArr.length>=3){
                return false;
            }
            console.log(data);
            imgArr.push(data.result);
            $(".img_box").append("<img src='"+data.result.picAddr+"'>");
            if(imgArr.length==3){
                $("form").data("bootstrapValidator").updateStatus("pic","VALID")
            }
            console.log(imgArr);
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
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的库存'
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入合法的库存'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的尺码'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'请输入合法的尺码(32-46)'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的原价'
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入正确的价格'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的价格'
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入正确的价格'
                    }
                }
            },
            pic:{
                validators:{
                    notEmpty:{
                        message:'请上传3张图片'
                    }
                }
            }
        }
    });
    $("form").on("success.form.bv",function(e){
        e.preventDefault();
        var data = $("form").serialize();
        data +="&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr;
        data +="&picName2="+imgArr[1].picName+"&picAddr2="+imgArr[1].picAddr;
        data +="&picName3="+imgArr[2].picName+"&picAddr3="+imgArr[2].picAddr;
        console.log(data);
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:data,
            success:function(i){
                location.reload();
            }
        })
    })
})