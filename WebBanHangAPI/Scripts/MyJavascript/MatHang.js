$(document).ready(function () {

    var object = new MyObject();

})

class MyObject {
    constructor() {
        this.formMode = null;
        this.tooken = null;
        this.getTooken();
        this.loadUserName();
        this.initEvents();

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
        /*$("#myInputSearch").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        */
        $(".tbData tbody").on("click", "tr", function () {

            // $(this).siblings().removeClass('highlight');

            // $(this).addClass('highlight');
            var table = $('#tbMatHang').DataTable();

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

        });

        $("#logout").click(this.btnLogoutOnclick.bind(this))

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

    


   /* loadData() {
        var temp = this;
        //Lay Du lieu tren server thong qua loi goi api
        $.ajax({

            url: "https://localhost:44399/api/MatHangs",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
         
        }).done(function (response) {


            $(".grid tbody").empty();
            $.each(response, function (index, item) {

                var htmlObject = $(`<tr>
                        <td>`+ item.IDMH + `</td >
                        <td>`+ item.TenMH + `</td>
                        
                        
                        </tr>`);
                $('.grid tbody').append(htmlObject);

            });
        }).fail(function () {

            alert("Lỗi API")
        });


    }
    */

    loadData() {
        var temp = this;
        //Lay Du lieu tren server thong qua loi goi api
        $.ajax({

            url: "https://localhost:44399/MatHangs",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",

        }).done(function (response) {

            
            $('#tbMatHang').DataTable().destroy();
            var table = $('#tbMatHang').DataTable({
                data: response,

                columns: [

                    { data: 'IDMH' },
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
        }).fail(function () {

            alert("Lỗi API")
        });


    }

    btnDeleteOnclick() {
        var temp = this;
        if (temp.getObjectCode() != null) {
            $.ajax({
                url: "https://localhost:44399/api/MatHangs/" + temp.getObjectCode(),
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
                url: "https://localhost:44399/api/MatHangs/" + temp.getObjectCode(),
                method: "GET",

            }).done(function (res) {
                if (!res) {
                    
                    alert("Lỗi");
                } else {

                    $("#txtCode").val(res.IDMH);
                    $("#txtName").val(res.TenMH);
                   
                    
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
                object.IDMH = $("#txtCode").val();
                object.TenMH = $("#txtName").val();
                
               
                // thuc hien cat du lieu vao database
                debugger
                $.ajax({
                    url: "https://localhost:44399/api/MatHangs",
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

                var epEdit = {};

                epEdit.IDMH = $("#txtCode").val();
                epEdit.TenMH = $("#txtName").val();
                
                

                $.ajax({
                    url: "https://localhost:44399/api/MatHangs/" + temp.getObjectCode(),

                    method: "PUT",
                    data: JSON.stringify(epEdit),
                    contentType: "application/json",
                    dataType: "json",

                }).done(function (res) {
                    temp.loadData();
                    temp.hideDialogDetail();

                }).fail(function (res) {
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

}