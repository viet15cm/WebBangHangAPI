$(document).ready(function () {

    var object = new MyObject()

})

class MyObject {
    constructor() {

        this.initEvents();

    }


    initEvents() {
        $(".required").addClass("css-input");
        $(".required").blur(this.checkRequired);
        $("#btnCreate").click(this.btnCreateClick.bind(this));
        $('#cbxPassWord').click(function () {
            if ($(this).prop("checked") == true) {
                $('#txtPassWord').attr('type', 'text');
                $('#txtRepeatPassWord').attr('type', 'text');
            }
            else if ($(this).prop("checked") == false) {
                $('#txtPassWord').attr('type', 'password');
                $('#txtRepeatPassWord').attr('type', 'password');
            }
        });

    }

    btnCreateClick() {
        var inputRequireds = $(".required");
        var isValid = true;

        $.each(inputRequireds, function (index, input) {

            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass('required-error')) {
                isValid = false;
            }
            if (valid) {
                $('.icon-login').show();
                var username = $('#txtUserName').val();
                var password = $('#txtPassword').val();
                var repeatPassWord = $('#txtRepeatPassWord').val();
                var Authorization = btoa(username + ':' + password);
                $.ajax({
                    type: 'GET',
                    // Make sure to change the port number to
                    // where you have the employee service
                    // running on your local machine
                    url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" + username,
                    method: "GET",
                    dataType: 'json',
                    // Specify the authentication header
                    // btoa() method encodes a string to Base64
                    headers: {
                        'Authorization': 'Basic ' + Authorization
                    },
                    success: function (data) {
                        /*ulEmployees.empty();
                         $.each(data, function (index, val) {
                             var fullName = val.FirstName + ' ' + val.LastName;
                             ulEmployees.append('<li>' + fullName + ' (' + val.Gender + ')</li>')
                         });
                         */
                        if (typeof (Storage) !== 'undefined' && $('#cbxRemember').prop("checked") == true) {
                            debugger
                            sessionStorage.clear();
                            localStorage.setItem('accessToken', Authorization);
                            window.location.href = "NhanVien.html";
                            $('.icon-login').hide();
                            debugger
                        }
                        else if (typeof (Storage) !== "undefined" && $('#cbxRemember').prop("checked") == false) {
                            debugger
                            localStorage.clear();
                            sessionStorage.setItem("accessToken", Authorization);
                            window.location.href = "NhanVien.html";
                            $('.icon-login').hide();
                            debugger
                        }
                        else {
                            alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
                        }

                        debugger;

                    },
                    complete: function (jqXHR) {
                        if (jqXHR.status == '401') {
                            /*ulEmployees.empty();
                            ulEmployees.append('<li style="color:red">'
                                + jqXHR.status + ' : ' + jqXHR.statusText + '</li>')
                            */
                            temp.showDialogDetail();
                            debugger;
                        }
                        debugger
                    }
                });
            }
        });
        
    }

    static checkRepeatPassWord() {
        var a = $('#txtPassWord').val();
        var b = $('#txtRepeatPassWord').val();
        debugger
        if (a === b)
            return true;
        return false;
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
                $(this).attr("title", "Thông Tin Bạn Nhập Phải Là 4-32 Kí Tự Thường Không Dấu Trùng với passWord");
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

        if ($(this).hasClass('validate-RepeatPassWord')) {
            if (MyObject.checkPassWord(value) && MyObject.checkRepeatPassWord()) {
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
        var t = /^[A-Za-z0-9_\.]{4,32}$/;
        if (t.test(value)) {
            return true
        }
        return false;
    }

    static checkPassWord(value) {
        var t = /^[A-Za-z0-9_\.]{8,32}$/;
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