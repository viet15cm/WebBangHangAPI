$(document).ready(function () {

    var object = new MyObject();

})

class MyObject {
    constructor() {
      
        this.initEvents();

    }

    static NameAPI() {
        return "Users";
    }

    initEvents() {
        $(".required").addClass("css-input");
        $(".required").blur(this.checkRequired);
        $("#btnLogin").click(this.btnLoginClick.bind(this));
        $("#btnDialogClose").click(this.btnCloseDialogDetailClick.bind(this))
        $('#cbxPassWord').click(function () {
            if ($(this).prop("checked") == true) {
                $('#txtPassword').attr('type', 'text');
            }
            else if ($(this).prop("checked") == false) {
                $('#txtPassword').attr('type', 'password');
            }
        });


        
    }



    getMemory(response) {
        var temp = this;
        var b = $('#cbxRemember').prop('checked');
        debugger;
        if (b) {
            temp.setMemory(response, "cookie");
            debugger
        } else {
            temp.setMemory(response, "session");
        }
    }

   
    btnLoginClick() {
        var temp = this;
        var inputRequireds = $(".required");
        var isValid = true;

        $.each(inputRequireds, function (index, input) {

            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass('required-error')) {
                isValid = false;
            }
        });
        if (isValid) {
            debugger;
            $('.icon-login').show();
           
           
            var user = {
                username: $("#txtUserName").val(),
                password: $("#txtPassword").val(),
                grant_type: "password"
            }

            $.ajax({
                type: "POST",
                url: "https://localhost:44399/token",
                data: user,
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (response) {
                    
                   // temp.setNameUser(response);
                    temp.getMemory(response);
                    
                },
                failure: function (response) {
                    alert(response.responseText);
                    debugger
                },
                error: function (response) {
                    temp.showDialogDetail();
                    debugger
                }

            });

            



        }
   
    }


    setMemory(response, memory) {
        debugger;
        var temp = this;
        var  object = {};
        object.AccoutToken = response.access_token;
        object.Flag = memory;
        
            $.ajax({
                type: "POST",
                url: "https://localhost:44399/Home/SetMemory",
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                  debugger
                    //temp.setNameUser(response);
                   
                    temp.setNameUser(response);
                 debugger
                }, failure: function (response) {
                    alert("loi");
                    debugger
                },
                error: function (response) {
                    alert("loi")
                    debugger
                }
            });

    }

    setNameUser(response) {
        debugger;
      
        $.ajax({
            url: "https://localhost:44399/Users/GetUserName",
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + response.AccoutToken
            }
        }).done(function (reponse) {
            debugger
            localStorage.setItem("NameUser", reponse);
            window.location.href = $("#btnLogin").data('url');
            
           
        }).fail(function () {
            alert("Loi");
        });

    }

    btnCloseDialogDetailClick() {
        this.hideDialogDetail();
    }

    showDialogDetail() {
        $('.modal').show();
        $('.dialog-error').show();
        $('.icon-login').hide();
    }

    hideDialogDetail() {
        $('.modal').hide();
        $('.dialog-error').hide();
    }

    checkRequired() {

        var value = this.value;

        if ($(this).hasClass('validate-username')) {
            if (MyObject.checkUserName(value)) {
                $(this).removeClass('required-error');
                $(this).addClass('css-input');
                $(this).removeAttr("title");



            } else {
                $(this).removeClass('css-input');
                $(this).addClass('required-error');
                $(this).attr("title", "Thông Tin Bạn Nhập Phải Là 5-32 Kí Tự Thường Không Dấu");
            }

        }

        if ($(this).hasClass('validate-password')) {
            if (MyObject.checkPassWord(value)) {
                $(this).removeClass('required-error');
                $(this).addClass('css-input');
                $(this).removeAttr("title");



            } else {
                $(this).removeClass('css-input');
                $(this).addClass('required-error');
                $(this).attr("title", "Thông Tin Bạn Nhập Phải Là 8-32 Kí Tự Thường Không Dấu");
            }

        }
        
    }

    date(xau) {
        var a, b;
        var dateTime = new Date(xau);
        var dd, mm, yy;
        dd = dateTime.getDate();
        mm = dateTime.getMonth() + 1;
        yy = dateTime.getFullYear();
        if (dd < 10)
            a = "0" + dd;
        else a = dd;
        if (mm < 10)
            b = "0" + mm;
        else b = mm;

        return yy + "-" + b + "-" + a;
    }

    time() {
        var h, p, s;
        var time = new Date();
        var hh, pp, ss;
        hh = time.getHours();
        pp = time.getMinutes();
        ss = time.getSeconds();
        if (hh < 10)
            h = "0" + hh;
        else h = hh;
        if (pp < 10)
            p = "0" + pp;
        else p = pp;
        if (ss < 10)
            s = "0" + ss;
        else s = ss;

        return "T" + h + ":" + p + ":" + s;

    }

    static checkID(value) {
        var t = /^[A-Za-z0-9_\.]{5}$/;
        if (t.test(value)) {
            return true
        }
        return false;
    }

    static checkUserName(value) {
        var t = /^[A-Za-z0-9_\.]{7,32}$/;
        if (t.test(value)) {
            return true
        }
        return false;
    }

    static checkPassWord(value) {
        var t = /^[A-Za-z0-9_\.]{9,32}$/;
        if (t.test(value)) {
            return true
        }
        return false;
    }

    static checkSDT(value) {
        var t = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (t.test(value)) {
            return true;
        }
        return false;
    }

    static checkEmail(value) {
        var t = /^[A-Za-z0-9_.]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/
        if (t.test(value))
            return true;
        return false;
    }

}