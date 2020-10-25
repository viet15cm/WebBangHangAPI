

$(document).ready(function () {

    var object = new MyObject()

})

class MyObject {
    constructor() {
        this.formMode = null;
        this.tooken = null;
        this.getTooken();
        this.loadUserName();
        this.initEvents();

    }
   // Ten API
    static NameAPI() {
        return "NhanViens";
    }

    initEvents() {
        $(".required").addClass("css-input");
        $('#btnAdd').click(this.btnAddOnclick.bind(this));
        $('#btnCancle').click(this.btnCancleOnclick.bind(this));
        $('#btnSave').click(this.btnSaveOnclick.bind(this));
        $('.tittle-button-close').click(this.btnCancleOnclick.bind(this));
        $(".required").blur(this.checkRequired);
        $(".tbData tbody").on("click", "tr", function () {

            $(this).siblings().removeClass('row-selected');

            $(this).addClass('row-selected');

        });
        
        $("#btnEdit").click(this.btnEditOnclick.bind(this));
        $("#btnDelete").click(this.btnDeleteOnclick.bind(this));

        $(".tbData tbody").on("click", "tr", function () {

            // $(this).siblings().removeClass('highlight');

            // $(this).addClass('highlight');
            var table = $('#tbNhanVien').DataTable();

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

        });
        
       /* $("#myInputSearch").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        */
        //$("#btnPrint").click(this.btnPrintKhoHang.bind(this));

        $("#logout").click(this.btnLogoutOnclick.bind(this));

    }

   /* btnPrintKhoHang() {
       
        $('.grid').printThis(
           
        );
    }
    */
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

    resetSession() {
        localStorage.removeItem("NameUser");
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

    /*loadData() {
        var temp = this;
        //Lay Du lieu tren server thong qua loi goi api
        $.ajax({
            
            url: "https://localhost:44399/api/" + MyObject.NameAPI(),
            method: "GET",//put , pop , get,
            contenType: "application/json",
            
        }).done(function (response) {

            debugger
            $(".grid tbody").empty();
            $.each(response, function (index, item) {

                var htmlObject = $(`<tr>
                        <td>`+ item.IDNV + `</td >
                        <td>`+ item.TenNV + `</td>
                        <td>`+ item.NgaySinh.slice(0, 10)+ `</td>
                        <td>`+ item.DiaChi + `</td>
                        <td>`+ item.Email + `</td>
                        <td>`+ item.SoDienThoai + `</td>
                        </tr>`);
                $('.grid tbody').append(htmlObject);

            });
        }).fail(function () {

            alert("Lỗi API")
        });


    }
    */

    loadData() {

        $.ajax({

            url: "https://localhost:44399/api/" + MyObject.NameAPI(),
            method: "GET",//put , pop , get,
            contenType: "application/json",

        }).done(function (response) {

            $('#tbNhanVien').DataTable().destroy();
            var table = $('#tbNhanVien').DataTable({
                
                data: response,

                columns: [

                    { data: 'IDNV' },
                    { data: 'TenNV' },
                    {

                        data: 'NgaySinh',
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return "";
                            }
                           
                            return data.slice(0, 10);
                            
                        }
                    },
                    { data: 'DiaChi' },
                    { data: 'Email' },
                    { data: 'SoDienThoai' }

                ],
                
                "order": [[1, 'asc']],
                "pageLength": 10,
                scrollResize: true,
                scrollY: 1,
                scrollCollapse: true,
                paging: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy',                   
                    {
                        extend: 'excel',
                        text: 'Excel',
                        title: 'Danh Sách Nhân Viên',
                        exportOptions: {
                            modifier: {
                                page: 'current'
                            },
                            columns: ':visible'
                        },
                        exportOptions: {
                            modifier: {
                                page: 'current'
                            },
                            columns: ':visible'
                        }
                    },
                                      
                    {
                        extend: 'pdf',
                        text: 'PDF',
                        orientation: 'landscape',
                        title: "Danh Sách Nhân Viên",
                        exportOptions: {
                            modifier: {
                                page: 'current'
                            },
                            columns: ':visible'
                        },
                        customize: function (doc) {

                            

                            var colCount = new Array();
                            $('#tbNhanVien').find('tbody tr:first-child td').each(function () {
                                if ($(this).attr('colspan')) {
                                    for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                        colCount.push('*');
                                    }
                                } else { colCount.push('*'); }
                            });
                            doc.content[1].table.widths = colCount;
                        }
                    },

                    {
                        extend: 'print',
                        text: 'Print ',
                        title: 'Danh Sách Nhân Viên',
                        
                        exportOptions: {
                            modifier: {
                                page: 'current'
                            },
                            columns: ':visible'
                        },
                        /* customize: function (win) {
                             $(win.document.body).addClass('white-bg');
                             $(win.document.body).css('font-size', '10px');
                             $(win.document.body).find('table')
                                 .addClass('compact')
                                 .css('font-size', 'inherit');
                         },
                         */
                    },
                   
                    'colvis'
                        
                    
                ],


            });
           
            $('.grid').css('display', 'block');
            table.columns.adjust().draw();

        }).fail(function () {

            alert("Lỗi API")
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
                    url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" +  temp.getObjectCode(),

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