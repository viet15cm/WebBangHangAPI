
$(document).ready(function () {

    var object = new MyObject();

})

class MyObject {
    
    constructor() {
        this.tooken = null;
        this.getTooken();
        this.loadUserName();
        this.formMode = null;
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
        $(".tbData tbody").on("click", "tr", function () {

            // $(this).siblings().removeClass('highlight');

            // $(this).addClass('highlight');
            var table = $('#tbNhaCungCap').DataTable();

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

        });
        /*$("#myInputSearch").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        */
        $("#logout").click(this.btnLogoutOnclick.bind(this));
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

   
    /*loadData() {
        var temp = this;
        
        $.ajax({

            url: "https://localhost:44399/api/NhaCungCaps",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
            

        }).done(function (response) {


            $(".grid tbody").empty();
            $.each(response, function (index, item) {

                var htmlObject = $(`<tr>
                        <td>`+ item.IDNCC + `</td >
                        <td>`+ item.TenNCC + `</td>
                        <td>`+ item.DiaChi + `</td>
                        <td>`+ item.Email + `</td>
                        <td>`+ item.SoDienThoai + `</td>
                        
                        </tr>`);
                $('.grid tbody').append(htmlObject);

            });
        }).fail(function () {

            alert("Lỗi API NCC");
        });


    }
    */

    loadData() {
        var temp = this;

        $.ajax({

            url: "https://localhost:44399/api/NhaCungCaps",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",


        }).done(function (response) {

            $('#tbNhaCungCap').DataTable().destroy();
            var table = $('#tbNhaCungCap').DataTable({
                data: response,

                columns: [

                    { data: 'IDNCC' },
                    { data: 'TenNCC' },
                    { data: 'DiaChi' },
                    { data: 'Email' },
                    { data: 'SoDienThoai' }


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

            alert("Lỗi API NCC");
        });


    }
    btnDeleteOnclick() {
        var temp = this;
        if (temp.getObjectCode() != null) {
            $.ajax({
                url: "https://localhost:44399/api/NhaCungCaps/" + temp.getObjectCode(),
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
                url: "https://localhost:44399/api/NhaCungCaps/" + temp.getObjectCode(),
                method: "GET",
             
            }).done(function (res) {
                if (!res) {

                    alert("Lỗi");
                } else {

                    $("#txtCode").val(res.IDNCC);
                    $("#txtName").val(res.TenNCC);
                    $("#txtDiaChi").val(res.DiaChi);
                    $("#txtEmail").val(res.Email);
                    $("#txtSDT").val(res.SoDienThoai);

                }

            }).fail(function (res) {
                alert("Lỗi API NCC");
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
            debugger;
        });

        if (isValid) {
            var temp = this;

            if (temp.formMode == "add") {
                var object = {};
                object.IDNCC = $("#txtCode").val();
                object.TenNCC = $("#txtName").val();
                object.DiaChi = $("#txtDiaChi").val();
                object.Email = $("#txtEmail").val();
                object.SoDienThoai = $("#txtSDT").val();

                // thuc hien cat du lieu vao database
                debugger
                $.ajax({
                    url: "https://localhost:44399/api/NhaCungCaps",
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

                epEdit.IDNCC = $("#txtCode").val();
                epEdit.TenNCC = $("#txtName").val();
                epEdit.DiaChi = $("#txtDiaChi").val();
                epEdit.Email = $("#txtEmail").val();

                epEdit.SoDienThoai = $("#txtSDT").val();


                $.ajax({
                    url: "https://localhost:44399/api/NhaCungCaps/" + temp.getObjectCode(),

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
                $(this).removeClass('reqiured-error');
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

        

        if ($(this).hasClass('valid-SDT')) {
            if (MyObject.checkSDT(value) || !value) {
                
                $(this).removeClass('required-error');
                $(this).removeAttr("title");

            } else {
                
                $(this).addClass('required-error');
                $(this).attr("title", "Số Điện Thoại Không Đúng Định Dạng");
            }


        }

        if ($(this).hasClass('valid-Email')) {
            if (MyObject.checkEmail(value) || !value ) {

                $(this).removeClass('required-error');
                $(this).removeAttr("title");

            } else {

                $(this).addClass('required-error');
                $(this).attr("title", "Email Không Đúng Định Dạng");
            }
        }
    }

    showDialogDetail() {
        $('.dialog input').val(null);
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