

$(document).ready(function () {

    var object = new MyObject()

})

class MyObject {
    constructor() {
        this.tooken = null;
        this.getTooken();
        this.loadUserName();
        this.formMode = null;
        this.initEvents();

    }


    // Ten API
    static NameAPI() {
        return "KhoHangs";
    }

   

    initEvents() {
      
        $("#btnPrint").click(this.btnPrintKhoHang.bind(this));
    }

    btnPrintKhoHang() {
        $('.in-phieuNhap').printThis({
            debug: false,               // show the iframe for debugging
            importCSS: true,            // import parent page css
            importStyle: false,         // import style tags
            printContainer: true,       // print outer container/$.selector
            loadCSS: "",                // path to additional css file - use an array [] for multiple
            pageTitle: "",              // add title to print page
            removeInline: false,        // remove inline styles from print elements
            removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
            printDelay: 333,            // variable print delay
            header: null,               // prefix to html
            footer: null,               // postfix to html
            base: false,                // preserve the BASE tag or accept a string for the URL
            formValues: true,           // preserve input/form values
            canvas: false,              // copy canvas content
            doctypeString: '...',       // enter a different doctype for older markup
            removeScripts: false,       // remove script tags from print content
            copyTagClasses: false,      // copy classes from the html & body tag
            beforePrintEvent: null,     // function for printEvent in iframe
            beforePrint: null,          // function called before iframe is filled
            afterPrint: null            // function called before iframe is removed

        });
    }

    resetSession() {
        localStorage.removeItem("NameUser");
    }

    btnLogoutOnclick() {
        var temp = this;
        $.ajax({
            url: "https://localhost:44399/Home/ResetTooken",
            method: "GET"

        }).done(function (reponse) {

            temp.resetSession();
            window.location.href = $("#logout").data('url');

        }).fail(function (reponse) {

            alert("Loi");
        })
    }

    loadUserName() {


        var name = localStorage.getItem("NameUser");

        $("#username").html(name);

    }




    getTooken() {
        var temp = this;
        $.ajax({
            url: "https://localhost:44399/Home/GetTooken",
            method: "GET",


        }).done(function (response) {
            debugger;
            temp.tooken = response;
            temp.loadData();

        }).fail(function () {
            alert("Loi");
        });

    }

    loadData() {
        var temp = this;
        //Lay Du lieu tren server thong qua loi goi api
        $.ajax({

            url: "https://localhost:44399/SanPhams/getJoinSanPhamsNhapKhos",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
           

        }).done(function (response) {

            debugger


            debugger
            var table = $('#tbKhoHang').DataTable({
                data: response,

                columns: [

                    { data: 'IDSP' },
                    {

                        data: 'Anh',
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return "";
                            }
                            return '<img class="img-responsive" src="' + data + '" alt="Product_Image"'
                                + 'height = "50px" width = "50px" /> ';
                            debugger
                        }
                    },
                    { data: 'TenSP' },           
                    {
                        data: 'DonGia',
                        render: $.fn.dataTable.render.number(',', '.', 2, '₫')
                    },
                    { data: 'TongSoLuong' },
                        
                    {
                                            
                        "render": function (data, type, row) {
                            const formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'VND',
                                minimumFractionDigits: 2
                            })
                            var sl = parseFloat(row.TongSoLuong, 10);
                            var dg = parseFloat(row.DonGia, 10);
                            data = sl * dg;
                            debugger
                            return formatter.format(data);
                        },
                        "targets": 0
                        
                    },
                   
                    { data: 'TenMH' },
                    
                    
                ],
                "order": [[1, 'asc']],
                "pageLength": 10,
                scrollResize: true,
                scrollY: 100,
                scrollCollapse: true,
                paging: true,
            });
            $('.grid').css('display', 'block');
            table.columns.adjust().draw();

        }).fail(function (response) {
            debugger
            alert("Lỗi Sever API Hang Hoa");
        });


    }
    btnDeleteOnclick() {
        var temp = this;
        if (temp.getObjectCode() != null) {
            $.ajax({
                url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" + temp.getObjectCode(),
                method: "Delete",
                data: "",
                contenType: "application/json",
                dataType: "",
              
            }).done(function (res) {
                temp.loadData();
                temp.hideDialogDetail();
            }).fail(function (res) {
                alert("Lỗi API");
            })


        } else {
            alert("Bạn chưa chọn dữ liệu");
        }
    }


    getObjectCode() {
        var trSelected = $(".tbData .row-selected");
        var objectCode = null;
        if (trSelected.length > 0) {




            var objectCode = $(trSelected).children()[0].textContent;

        }
        return objectCode;
    }

    btnEditOnclick() {
        $('#txtCode').attr('readonly', true);

        this.formMode = "edit";
        var temp = this;

        if (temp.getObjectCode() != null) {
            temp.showDialogDetail();
            $.ajax({
                url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" + temp.getObjectCode(),
                method: "GET",
                

            }).done(function (res) {
                if (!res) {

                    alert("Lỗi");
                } else {

                    $("#txtCode").val(res.IDNV);
                    $("#txtName").val(res.TenNV);
                    $("#txtNgaySinh").val(temp.date(res.NgaySinh));
                    $("#txtDiaChi").val(res.DiaChi);
                    $("#txtEmail").val(res.Email);
                    $("#txtSDT").val(res.SoDienThoai);
                    debugger

                }

            }).fail(function (res) {
                alert("Lỗi API");
            })
        } else {
            alert("Bạn Chưa Chọn Dữ Liệu");
        }

    }

    btnAddOnclick() {
        $('#txtCode').attr('readonly', false);
        this.formMode = "add";
        this.showDialogDetail();
    }



    btnCancleOnclick() {
        this.hideDialogDetail();
    }

    btnSaveOnclick() {

        var inputRequireds = $(".required");
        var isValid = true;

        $.each(inputRequireds, function (index, input) {

            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass('required-error')) {
                isValid = false;
            }
        });

        if (isValid) {
            var temp = this;

            if (temp.formMode == "add") {
                var object = {};
                object.IDNV = $("#txtCode").val();
                object.TenNV = $("#txtName").val();
                object.NgaySinh = $("#txtNgaySinh").val();
                object.DiaChi = $("#txtDiaChi").val();
                object.Email = $("#txtEmail").val();
                object.SoDienThoai = $("#txtSDT").val();

                // thuc hien cat du lieu vao database
                debugger
                $.ajax({
                    url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/",
                    method: "POST",
                    data: JSON.stringify(object),
                    contentType: "application/json",
                    dataType: "json",
                   
                }).done(function (res) {
                    temp.loadData();
                    temp.hideDialogDetail();
                    debugger;

                }).fail(function (res) {
                    alert("loi API");
                    debugger
                })
            }

            if (temp.formMode == "edit") {

                var object = {};


                object.IDNV = $("#txtCode").val();
                object.TenNV = $("#txtName").val();
                object.NgaySinh = $("#txtNgaySinh").val();
                object.DiaChi = $("#txtDiaChi").val();
                object.Email = $("#txtEmail").val();
                object.SoDienThoai = $("#txtSDT").val();

                debugger;
                $.ajax({
                    url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" + temp.getObjectCode(),

                    method: "PUT",
                    data: JSON.stringify(object),
                    contentType: "application/json",
                    dataType: "json",
                  

                }).done(function (res) {
                    debugger;
                    temp.loadData();
                    temp.hideDialogDetail();
                    debugger;

                }).fail(function (res) {
                    debugger
                    alert("loi API");
                });
            }

        }


    }



    checkRequired() {

        var value = this.value;
        if ($(this).hasClass('valid-ID')) {
            if (MyObject.checkID(value)) {
                $(this).removeClass('required-error');
                $(this).removeAttr("title");



            } else {
                $(this).addClass('required-error');
                $(this).attr("title", "Thông Tin Bạn Nhập Phải Là 5 Kí Tự Thường Không Dấu");
            }
        }

        if ($(this).hasClass('valid-Name')) {
            if (!value) {
                $(this).addClass('required-error');
                $(this).attr("title", "Tên Không Được Bỏ Trống");
                debugger;

            } else {
                $(this).removeClass('required-error');
                $(this).removeAttr("title");
            }


        }

        if ($(this).hasClass('valid-NgayNhap')) {
            if (!value) {
                $(this).addClass('required-error');
                $(this).attr("title", "Ngày Tháng Không Được Bỏ Trống");
                debugger;

            } else {
                $(this).removeClass('required-error');
                $(this).removeAttr("title");
            }


        }

        if ($(this).hasClass('valid-SDT')) {
            if (MyObject.checkSDT(value)) {

                $(this).removeClass('required-error');
                $(this).removeAttr("title");

            } else {

                $(this).addClass('required-error');
                $(this).attr("title", "Số Điện Thoại Không Đúng Định Dạng");
            }
        }

        /*if ($(this).hasClass('valid-DiaChi')) {
            if (!value) {
                $(this).addClass('reqiured-error');
                $(this).attr("title", "Địa Chỉ Không Được Bỏ Trống");
                debugger;

            } else {
                $(this).removeClass('reqiured-error');
                $(this).removeAttr("title");
            }
        }
        */
        if ($(this).hasClass('valid-Email')) {
            if (MyObject.checkEmail(value) || !value) {

                $(this).removeClass('required-error');
                $(this).removeAttr("title");

            } else {

                $(this).addClass('required-error');
                $(this).attr("title", "Email Không Đúng Định Dạng");
            }
        }
    }

    showDialogDetail() {
        $(".dialog input").val(null);
        $('.dialog-modal').show();
        $('.dialog').show();
        $("#txtCode").focus();
    }
    hideDialogDetail() {
        $('.dialog-modal').hide();
        $('.dialog').hide();
    }

    rowOnSelect() {

        $(this).siblings().removeClass('row-selected');
        $(this).addClass('row-selected');



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

    static checkSDT(value) {
        var t = /((09|03|07|08|05)+([0-9]{8})\b)/;
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