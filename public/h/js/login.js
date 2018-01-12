$(function () {
    $form = $("form");
    $form.bootstrapValidator({
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        // submitButtons: 'button[type="submit"]',
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空！'
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空！'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码必须是6-12位'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        },
    })

    $form.on("success.form.bv", function (e) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            success: function (i) {
                console.log(i);
                if (i.success) {
                    location.href = "/h/index.html"
                }
                if (i.error) {
                    var t = {
                        1000: "username",
                        1001: "password"
                    }
                    $form.data("bootstrapValidator").updateStatus(t[i.error], "INVALID", "callback")
                }
            }
        })
        e.preventDefault();
    })
});