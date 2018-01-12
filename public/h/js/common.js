$(function(){
    if(location.href.indexOf("login.html")!==-1){
        $.ajax({
            url:"/employee/checkRootLogin",
            success:function(i){
                // console.log(i);
                if(i.success){
                    location.href = "index.html"
                }
            }
        })
    }
    if(location.href.indexOf("login.html")==-1){
        $.ajax({
            url:"/employee/checkRootLogin",
            success:function(i){
                // console.log(i);
                if(i.error){
                    location.href = "login.html"
                }
            }
        })
    }

    $(".second").prev().on("click",function(){
        $(".second").slideToggle(500);
    })
    $(".glyphicon-align-justify").on("click",function(){
        $(".le_main").toggleClass("new");
        $(".le_aside").toggleClass("new")
    })
    $(".glyphicon-log-out").on("click",function(){
        $("#le_logout").modal("show");
    })
    $(".btn_logout").on("click",function(){
        $.ajax({
            url:"/employee/employeeLogout",
            success:function(i){
                if(i.success){
                    location.href="./login.html"
                }
            }
        })
    })


})