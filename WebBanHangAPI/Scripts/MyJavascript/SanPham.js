


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

    static NameAPI() {
        return "SanPhams";
    }


  
    initEvents() {
        var temp = this;
        $(".required").addClass("css-input");
        $('#btnAdd').click(this.btnAddOnclick.bind(this));
        $('#btnCancle').click(this.btnCancleOnclick.bind(this));
        $('#btnSave').click(this.btnSaveOnclick.bind(this));
        $('.tittle-button-close').click(this.btnCancleOnclick.bind(this));
        $('#deleteImg').click(this.btnDeleteImgOnclick.bind(this));
        
        $(".required").blur(this.checkRequired);
        $(".tbData tbody").on("click", "tr", function () {

            // $(this).siblings().removeClass('highlight');

            // $(this).addClass('highlight');
            var table = $('#tbSanPham').DataTable();

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

        });


        $('#upload').on('change', function () {
            MyObject.btnChooseImgOnclick();
        });

        $("#btnEdit").click(this.btnEditOnclick.bind(this));

        $("#btnDelete").click(this.btnDeleteOnclick.bind(this));
        $('.dialog-body #listIDHH').on('change', function () {

            MyObject.getDataInputOptions(this.value);
        });

        $(function () {
            temp.getAutocompleteIDMH();
            temp.getAutocompleteIDHSX();
        })
       

        $("#logout").click(this.btnLogoutOnclick.bind(this))
    }


    getAutocompleteIDMH() {
        var temp = this;
        var id = null;
        $("#listMNH").autocomplete({
         
            source: function (request, response) {
                debugger
                $.ajax({
                    url: "https://localhost:44399/MatHangs/getMatHangID/" + request.term,
                    method: "GET",
                    headers: {
                        "Authorization": 'Bearer ' + temp.tooken
                    }


                }).done(function (data) {
                    debugger;
                  /*  var object = [];
                    for (var i = 0; i < data.length; i++) {
                        var value = data[i].TenMH + " - " + data[i].IDMH;
                        id = data[i].IDMH;
                        object.push(value);

                    }
                    debugger;
                  */
                    response($.map(data, function (objet) {
                        return {
                            label: objet.TenMH + " - " + objet.IDMH,
                            value: objet.IDMH,
                        };
                    }));
                    
                })
            },
            select: function (event, ui) {

                $("#listMNH").val(ui.item.value);
                debugger
                return false;
            },
            messages: {
                noResults: '',
                results: function () { }
            }

        });
    }

    getAutocompleteIDHSX() {
        var temp = this;
        var id = null;
        $("#listHSX").autocomplete({

            source: function (request, response) {
                debugger
                $.ajax({
                    url: "https://localhost:44399/HangSXs/GetAutoCompleteID/" + request.term,
                    method: "GET",
                    headers: {
                        "Authorization": 'Bearer ' + temp.tooken
                    }


                }).done(function (data) {
                    debugger;
                    /*  var object = [];
                      for (var i = 0; i < data.length; i++) {
                          var value = data[i].TenMH + " - " + data[i].IDMH;
                          id = data[i].IDMH;
                          object.push(value);
  
                      }
                      debugger;
                    */
                    response($.map(data, function (objet) {
                        return {
                            label: objet.TenHSX + " - " + objet.IDHSX,
                            value: objet.IDHSX,
                        };
                    }));

                })
            },
            select: function (event, ui) {

                $("#listHSX").val(ui.item.value);
                debugger
                return false;
            },
            messages: {
                noResults: '',
                results: function () { }
            }

        });
    }

    resetSession() {
        localStorage.removeItem("NameUser");
    }

    btnLogoutOnclick() {
        var temp = this;
        $.ajax({
            url: "https://localhost:44399/Home/ResetTooken",
            method: "GET",
            

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

    // delaete IMG
    btnDeleteImgOnclick() {
        $("#upload").val(null);
        document.getElementById('displayimg').innerHTML = "";
    }

    static btnChooseImgOnclick() {
       
        var fileSelected = document.getElementById('upload').files;
        if (fileSelected.length > 0) {
            var fileToload = fileSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadEvent) {
                var srcData = fileLoadEvent.target.result;
                var newImg = document.createElement('img');
                newImg.src = srcData;
                document.getElementById('displayimg').innerHTML = newImg.outerHTML
                debugger
            }
            fileReader.readAsDataURL(fileToload);
        }
        debugger
    }

    loadData() {
        
       
       
        var temp = this;
       
        debugger
            //Lay Du lieu tren server thong qua loi goi api
            $.ajax({

                url: "https://localhost:44399/SanPhams/getJoinSanPhamsMatHangs",
                method: "GET",//put , pop , get,
                contenType: "application/json",
                headers: {
                    "Authorization": 'Bearer ' + temp.tooken
                }
            }).done(function (response) {

                    $('#tbSanPham').DataTable().destroy();
                    debugger;
                    var table = $('#tbSanPham').DataTable({
                        data: response,
                        columnDefs: [
                        
                            { orderable: false, targets: 4 },
                            { orderable: false, targets: 1 }
                        ],

                        columns: [

                            { data: 'IDSP' },
                            { data: 'TenSP' },
                            {

                                data: 'Anh',
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return "";
                                    }
                                 
                                    return '<img class="img-responsive" src="' + data + '" alt="Product_Image"'
                                        + 'height = "50px" width = "50px" /> ';
                                    
                                }
                            },

                            {

                                data: 'DonGia',
                                render: $.fn.dataTable.render.number('.', ',',0, '₫ ')
                            },
                            {
     
                                data: 'GiaBan',
                                render: $.fn.dataTable.render.number('.', ',', 2, '₫ ')
                            },
                            { data: 'NgayCapNhat' },
                            { data: 'TenMH' },
                            {
                                data: 'IDHSX',
                                
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return "";
                                    }
                                    debugger;
                                    return data;
                                    
                                }
                            },

                        ],
                        "order": [
                          
                            [0, "asc"],
                        ],
                        "pageLength": 5,
                        scrollResize: true,
                        scrollY: 100,
                        scrollCollapse: true,
                        paging: true,
                        dom: 'Bfrtip',
                        buttons: [
                            'copy',
                            {
                                extend: 'excel',
                                text: 'Excel',
                                title: 'Danh Sách Sản Phẩm',
                                exportOptions: {
                                    modifier: {
                                        page: 'current'
                                    },
                                    columns: ':visible'
                                },
                            },

                            {
                                extend: 'pdf',
                                text: 'PDF',
                                orientation: 'landscape',
                                title: "Danh Sách Sản Phẩm",
                                exportOptions: {
                                    modifier: {
                                        page: 'current'
                                    },
                                    columns: ':visible'
                                },
                                customize: function (doc) {

                                    var colCount = new Array();
                                    $('#tbSanPham').find('tbody tr:first-child td').each(function () {
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
                                title: 'Danh Sách Sản Phẩm',

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
                        ]

                    });
                    $('.grid').css('display', 'block');
                    table.columns.adjust().draw();
            
            }).fail(function (response) {
                debugger
                alert("Lỗi Sever API Hang Hoa");
            });
        
    }

  

    btnAddOnclick() {
        
        this.formMode = "add";
        $('#txtCode').attr('readonly', false);
        this.showDialogDetail();
        //this.addList();
        debugger
    }



    btnCancleOnclick() {
        this.hideDialogDetail();
    }

    // xáo dữ liệu table
    btnDeleteOnclick() {
        var temp = this;
        if (temp.getObjectCode() != null) {

            debugger;
            $.ajax({
                url: "https://localhost:44399/SanPhams/Delete/" + temp.getObjectCode(),
                method: "Delete",
                data: "",
                contenType: "application/json",
                dataType: "",
                headers: {
                    "Authorization": 'Bearer ' + temp.tooken
                }
                
            }).done(function (res) {
               
                
                temp.loadData();
                temp.hideDialogDetail();
                debugger
            }).fail(function (res) {
                alert("Lỗi Sever API");
                debugger
            })


        } else {
            alert("Bạn chưa chọn dữ liệu");
        }
    }
    // hiển thị dữ liệu trước khi sữa
    btnEditOnclick() {
        var img = null;
        $('#txtCode').attr('readonly', true);
       
        //this.addList();
        this.formMode = "edit";
        var temp = this;

        if (temp.getObjectCode() != null) {
            temp.showDialogDetail();
            $.ajax({
                url: "https://localhost:44399/SanPhams/GetSanPham/" + temp.getObjectCode(),
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + temp.tooken
                }
             

            }).done(function (res) {
               
                if (!res) {

                    alert("Lỗi");
                } else {
                    var img = null;
                    if (res.Anh != null) {
                        var newImg = document.createElement('img');
                        newImg.src = res.Anh;
                        document.getElementById('displayimg').innerHTML = newImg.outerHTML
                        img = res.Anh.toString();
                    }
                    var object = {};
                    

                    $("#txtCode").val(res.IDSP);
                    $("#txtName").val(res.TenSP);
                    $("#txtDonGia").val(res.DonGia);

                    $("#txtNgayNhap").val(temp.date(res.NgayCapNhat));
                    $("#listMNH").val(res.IDMH);
                    $("#listHSX").val(res.IDHSX);
                    $("#listHSX").val(res.IDHSX);

                    return img;
                    debugger
                }

            }).fail(function (res) {
                alert("Lỗi API");
            })
        } else {
            alert("Bạn Chưa Chọn Dữ Liệu");
        }

      

    }


    getObjectCode() {
        var trSelected = $(".tbData .selected");
        var objectCode = null;
        if (trSelected.length > 0) {
            var objectCode = $(trSelected).children()[0].textContent;
            debugger
        }
        return objectCode;
    }

    getGiaBan(responese) {
        var giaNhap = new Number($("#txtDonGia").val());
        return giaNhap + (giaNhap * 10 / 100) + (giaNhap * 30 / 100) + giaNhap * (responese * 1.2 / 100);
    }

    addSanPham(responese, fr) {
        var temp = this;
       
        var giaBan = temp.getGiaBan(responese);
        var object = {};
        
        object.IDSP = $("#txtCode").val();
        object.TenSP = $("#txtName").val();
        object.DonGia = $("#txtDonGia").val();
        object.GiaBan = String(giaBan);
        object.NgayCapNhat = $("#txtNgayNhap").val() + temp.newTime();
        object.IDMH = $("#listMNH").val();
        object.IDHSX = $("#listHSX").val();
        object.Anh = fr.result.toString();
        debugger
        $.ajax({
            url: "https://localhost:44399/api/" + MyObject.NameAPI(),
            method: "POST",
            data: JSON.stringify(object),
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": 'Bearer ' + temp.tooken
            }

        }).done(function (res) {
            debugger;
            temp.loadData();
            temp.hideDialogDetail();
            debugger;

        }).fail(function (res) {
            alert("loi API");
            debugger
        })

    }


    editSanPham(responese, fr) {
        var temp = this;
        var giaBan = temp.getGiaBan(responese);
        var object = {};
        object.IDSP = $("#txtCode").val();
        object.TenSP = $("#txtName").val();
        object.DonGia = $("#txtDonGia").val();
        object.GiaBan = String(giaBan);
        object.NgayCapNhat = $("#txtNgayNhap").val() + temp.newTime();
        object.IDMH = $("#listMNH").val();
        object.IDHSX = $("#listHSX").val();
        object.Anh = fr.result.toString();
        debugger

        $.ajax({
            url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" + temp.getObjectCode(),
            method: "PUT",
            data: JSON.stringify(object),
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": 'Bearer ' + temp.tooken
            }
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


    btnSaveOnclick() {

        var inputRequireds = $(".required");
        var isValid = true;
        var temp = this;
        $.each(inputRequireds, function (index, input) {

            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass('required-error')) {
                isValid = false;
            }
        });

        if (isValid) {

            debugger

            if (temp.formMode == "add") {

                var $i = $('#upload'), input = $i[0];
                if (input.files && input.files[0]) {
                    var file = input.files[0]; // The file
                    var fr = new FileReader(); // FileReader instance
                    fr.readAsDataURL(file);
                    fr.onload = function () {

                        var object = {};

                        object.IDSP = $("#txtCode").val();
                        object.TenSP = $("#txtName").val();
                        object.DonGia = $("#txtDonGia").val();                        
                        object.NgayCapNhat = $("#txtNgayNhap").val() + temp.newTime();
                        object.IDMH = $("#listMNH").val();
                        object.IDHSX = $("#listHSX").val();
                        object.Anh = fr.result.toString();
                        
                        debugger
                        $.ajax({
                            url: "https://localhost:44399/api/" + MyObject.NameAPI(),
                            method: "POST",
                            data: JSON.stringify(object),
                            contentType: "application/json",
                            dataType: "json",
                            headers: {
                                "Authorization": 'Bearer ' + temp.tooken
                            }

                        }).done(function (res) {
                            debugger;
                            temp.loadData();
                            temp.hideDialogDetail();
                            debugger;

                        }).fail(function (res) {
                            alert("loi API");
                            debugger
                        })
                        


                        
                        debugger
                    }
                }
                else {
                    
                        var object = {};
                        // Do stuff on onload, use fr.result for contents of file
                        object.IDSP = $("#txtCode").val();
                        object.TenSP = $("#txtName").val();
                        object.DonGia = $("#txtDonGia").val();                        
                        object.NgayCapNhat = $("#txtNgayNhap").val() + temp.newTime();
                        object.IDHSX = $("#listHSX").val();
                        object.IDMH = $("#listMNH").val();

                        debugger
                        $.ajax({
                            url: "https://localhost:44399/api/" + MyObject.NameAPI(),
                            method: "POST",
                            data: JSON.stringify(object),
                            contentType: "application/json",
                            dataType: "json",
                            headers: {
                                "Authorization": 'Bearer ' + temp.tooken
                            }

                        }).done(function (res) {
                            temp.loadData();
                            temp.hideDialogDetail();
                            debugger;

                        }).fail(function (res) {
                            alert("loi API");
                            debugger
                        })
                    
                }


                debugger

            }

            if (temp.formMode == "edit") {

                var $i = $('#upload'), input = $i[0];
                if (input.files && input.files[0]) {
                    var file = input.files[0]; // The file
                    var fr = new FileReader(); // FileReader instance
                    fr.readAsDataURL(file);
                    fr.onload = function () {
                        var object = {};
                        object.IDSP = $("#txtCode").val();
                        object.TenSP = $("#txtName").val();
                        object.DonGia = $("#txtDonGia").val();                       
                        object.NgayCapNhat = $("#txtNgayNhap").val() + temp.newTime();
                        object.IDMH = $("#listMNH").val();
                        object.IDHSX = $("#listHSX").val();
                        object.Anh = fr.result.toString();
                        debugger

                        $.ajax({
                            url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" + temp.getObjectCode(),

                            method: "PUT",
                            data: JSON.stringify(object),
                            contentType: "application/json",
                            dataType: "json",
                            headers: {
                                "Authorization": 'Bearer ' + temp.tooken
                            }


                        }).done(function (res) {
                            debugger;
                            temp.loadData();
                            temp.hideDialogDetail();
                            debugger;

                        }).fail(function (res) {
                            debugger
                            alert("loi API");
                        });
                        // Do stuff on onload, use fr.result for contents of file
                       

                    };
                    //fr.readAsText( file );
                    
                    debugger
                } else {

                        var object = {};
                        object.IDSP = $("#txtCode").val();
                        object.TenSP = $("#txtName").val();
                        object.DonGia = $("#txtDonGia").val();                       
                        object.NgayCapNhat = $("#txtNgayNhap").val() + temp.newTime();
                        object.IDMH = $("#listMNH").val();
                        object.IDHSX = $("#listHSX").val();
                        object.Anh = $("#displayimg img").attr('src');
                        debugger
                       
                        $.ajax({
                            url: "https://localhost:44399/api/" + MyObject.NameAPI() + "/" + temp.getObjectCode(),

                            method: "PUT",
                            data: JSON.stringify(object),
                            contentType: "application/json",
                            dataType: "json",
                            headers: {
                                "Authorization": 'Bearer ' + temp.tooken
                            }

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

    }

   /* addList() {
        var temp = this;
        $.ajax({

            url: "https://localhost:44399/api/MatHangs",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
           
        }).done(function (response) {
            debugger

            $(".dialog-body #listMNH").empty();

            $.each(response, function (index, item) {

                var htmlObject = $(
                    `<option value="` + item.IDMH + `">` + item.TenMH + `</option>`

                );
                $('.dialog-body #listMNH').append(htmlObject);
                debugger
                // Cất dữ liệu vô thanh text;
                
            });

        }).fail(function () {

            alert("Lỗi API")
        });
    }
    */

    showDialogDetail() {
       
        $(".dialog input").val(null);
        
        $('.dialog-modal').show();
        $('.dialog').show();
       
    }
    // reset lại bảng phụ 
    hideDialogDetail() {
        $('.dialog-modal').hide();
        $('.dialog').hide();
        document.getElementById('displayimg').innerHTML = "";

        
        
    }

    rowOnSelect() {

        $(this).siblings().removeClass('row-selected');
        $(this).addClass('row-selected');



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

        if ($(this).hasClass('valid-DonGia')) {
            if (MyObject.checkNumber(value) && !value == false) {
                $(this).removeClass('required-error');
                $(this).removeAttr("title");

            }
            else {

                $(this).addClass('required-error');
                $(this).attr("title", "Đơn Giá Phải Lớn Hơn Không");

            }
        }

        if ($(this).hasClass('valid-NgayNhap')) {
            if (!value) {
                $(this).addClass('required-error');
                $(this).attr("title", "Ngày Nhập Không Được Bỏ Trống");
                debugger;

            } else {
                $(this).removeClass('required-error');
                $(this).removeAttr("title");
            }
        }

        if ($(this).hasClass('valid-listMNH')) {
            if (!value) {
                $(this).addClass('required-error');
                $(this).attr("title", "Tên Mặt Hàng Không Được Bỏ Trống");
                debugger;

            } else {
                $(this).removeClass('required-error');
                $(this).removeAttr("title");
            }


        }
    }



    static newDate() {
        var a, b;
        var dateTime = new Date();
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

   
   newTime() {
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

    

    static checkNumber(value) {
        var fl = /^[0-9]*[.][0-9]*$/;
        var int = /^[0-9]*$/
        if (fl.test(value) || int.test(value)) {
            return true
        }
        return false;
    }
}