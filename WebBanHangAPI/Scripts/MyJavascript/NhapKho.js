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
        return "NhapKhoes";
    }
 

    initEvents() {
        var temp = this;
        $(".required").addClass("css-input");
        $('#btnAdd').click(this.btnAddOnclick.bind(this));
        $('#btEdit-PhieuNhap').click(this.btnEditPhieuNhapOnclick.bind(this));
        $('#btnSave-PhieuNhap').click(this.btnSavePhieuNhapOnclick.bind(this));
        $('#btnSave-PhieuNhap1').click(this.btnSavePhieuNhapOnclick1.bind(this));
        $('#btnComeBack-hide-PhieuNhap').click(this.btnComeBackPhieuNhapOnclick.bind(this));
        // $('#btnComeBack-hide-PhieuNhap1').click(this.btnComeBackPhieuNhapOnclick.bind(this));
        $('#btnCancle').click(this.btnCancleOnclick.bind(this));
        $('#btnSave').click(this.btnSaveOnclick.bind(this));
        $('.tittle-button-close').click(this.btnCancleOnclick.bind(this));
        $(".required").blur(this.checkRequired);
        $(document).on('blur', '.required', function () {

            var value = this.value;
            if ($(this).hasClass('valid-SoLuong')) {
                if (MyObject.checkInt(value) && !value == false) {
                    $(this).removeClass('required-error');
                    $(this).removeAttr("title");

                } else {
                    $(this).addClass('required-error');
                    $(this).attr("title", "Số Lượng Là Số Nguyên Lớn Hơn Không");
                }
            }

        });

        $(document).on('click', '#print-phieuNhap', function () {

            if (typeof (Storage) !== 'undefined') {
                var IDPN = $(this).closest("tr").find("td").eq(1).html();
                sessionStorage.setItem('IDPN', IDPN);
                var url = "https://localhost:44399/HTML/PhieuNhap.html";
                window.open(url, '_blank');
                window.focus();
            } else {
                alert("Trình Duyệt Đã Củ Bạn Can Nâng Cấp")
            }
            
           
            
           

        });

        /*$(".tbData tbody").on("click", "tr", function () {

            var table = $('#tbNhapKho').DataTable();

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

        });
        */
        $("#btnEdit").click(this.btnEditOnclick.bind(this));
        $("#btnDelete").click(this.btnDeleteOnclick.bind(this));


        $(document).on("click", '.content-hide #btnRowDelete', function () {


            $(this).closest("tr").remove();

        });



       /* $('.content-hide #listSP').on('change', function () {
            MyObject.addItempTableSanPham(this);          
        });
        */
        // table add row
        $('#tbNhapKho tbody').on('click', 'td.details-control', function () {

            MyObject.showRowPhieuNhap(this);

        });
        //tìm kiếm
        /*$("#myInputSearch").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        */
        $(function () {
            temp.getAutocompleteIDSP(temp);
            temp.getAutocompleteIDNV(temp);
            temp.getAutocompleteIDNCC(temp);

        })


        $("#logout").click(this.btnLogoutOnclick.bind(this));

      
    }

     getAutocompleteIDSP(temp) {
       
        $("#listSP").autocomplete({

            source: function (request, response) {
                debugger
                $.ajax({
                    url: "https://localhost:44399/SanPhams/GetSanPhamsID/" + request.term,
                    method: "GET"


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
                            label: objet.TenSP + " - " + objet.IDSP,
                            value: objet.IDSP,
                        };
                    }));

                })
            },
            select: function (event, ui) {

                $("#listSP").val(ui.item.value);
                temp.addItempTableSanPham(ui.item.value);
                debugger
                return false;
            },
            messages: {
                noResults: '',
                results: function () { }
            }

        });
    }

    getAutocompleteIDNV(temp) {
        $("#listNV").autocomplete({

            source: function (request, response) {
                debugger
                $.ajax({
                    url: "https://localhost:44399/NhanViens/GetNhanVienID/" + request.term,
                    method: "GET"


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
                            label: objet.TenNV + " - " + objet.IDNV,
                            value: objet.IDNV,
                        };
                    }));

                })
            },
            select: function (event, ui) {

                $("#listNV").val(ui.item.value);
               
                debugger
                return false;
            },
            messages: {
                noResults: '',
                results: function () { }
            }

        });
    }

    getAutocompleteIDNCC(temp) {
        $("#listNCC").autocomplete({

            source: function (request, response) {
                debugger
                $.ajax({
                    url: "https://localhost:44399/NhaCungCaps/GetNhaCungCapID/" + request.term,
                    method: "GET"


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
                            label: objet.TenNCC + " - " + objet.IDNCC,
                            value: objet.IDNCC,
                        };
                    }));

                })
            },
            select: function (event, ui) {

                $("#listNCC").val(ui.item.value);

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

    static showRowPhieuNhap(temp) {
              
        var tr = $(temp).closest('tr');
        var row = $('#tbNhapKho').DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            $.ajax({
                url: "https://localhost:44399/NhapKhoes/GetPhieuNhapsSanPhams/" + row.data().IDPN,
                method: "GET",


            }).done(function (response) {
                const formatter = new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0
                })
                var c = "";
                for (var i = 0; i < response.length; i++) {

                    c +='<tr>' +
                        '<td>' + response[i].IDNK + '</td>' +
                        '<td>' + '<img src ="' + response[i].Anh + '" style = "width: 30px; height: 30px;" />' + '</td>' +
                        '<td>' + response[i].TenSP + '</td>' +
                        '<td>' + formatter.format(response[i].DonGia) + '</td>' +

                        '<td>' + response[i].SoLuong + '</td>' +
                        '<td>' + formatter.format(response[i].ThanhTien) + '</td>' +
                        '</tr>';

                }

                debugger;

                var table =
                    '< table cellpadding = "5" cellspacing = "0" border = "1" style = "margin-left: 100px;" > '
                    + '<tr><th>IDNK</th><th>Ảnh</th><th>Tên Sản Phẩm</th><th>Đơn Giá</th><th>Số Lượng </th><th>Thành Tiền</th>' +

                    c
                    + '</table>';

                  
                row.child(table).show();

                tr.addClass('shown');
            }).fail(function (response) {
                alert("Lỗi API");
            })
            // Open this row
            //row.child(MyObject.format(row.data()).show();
            //debugger;
            //tr.addClass('shown');
        }
    }
    
    static loadDataNhapKho(k) {
        $.ajax({
            
            url: "https://localhost:44399/api/PhieuNhaps/" + k,
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
        

        }).done(function (response) {

            
            debugger
            $('.content-detail #txtCode').attr('readonly', true);
            $('.content-detail #txtCode').val(response.IDPN);

            $('.content-detail #datePhieuNhap').val(MyObject.date(response.NgayNhap))
            $('.content #listNV').val(response.IDNV)
            $('.content-detail #listNCC').val(response.IDNCC)
            debugger;
            $('.content-detail .grid tbody').empty();
            var listNhapKhos = response.NhapKhos;
            debugger
            $.each(listNhapKhos, function (index, item) {

                var htmlObject = $(`<tr>

                        <td>`+ item.IDNK + `</td >
                        <td>`+ item.IDSP + `</td>
                        
                        <td><input value="`+ item.SoLuong + `" id="txtSoLuong" class="required valid-SoLuong" type="text" autocomplete="off"/></td>
                                                
                        <td><button id="btnRowDetail-Delete"><i class="fas fa-trash-alt"></i></button></td>
                        </tr>`);
               // $('.content-detail .grid tbody').append(htmlObject);
                $('.required').addClass('css-input');
                debugger;
               
            });
 
        }).fail(function () {
            debugger
            alert("Lỗi Sever API Hang Hoa");
        });
        debugger;
    }
   
    loadData() {
        var temp = this;
        //Lay Du lieu tren server thong qua loi goi api
        $.ajax({

            url: "https://localhost:44399/SanPhams/getJoinSanPhamsNhapKhosPhieuNhaps",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
           

        }).done(function (response) {
           
            debugger
            $('#tbNhapKho').DataTable().destroy();
           
            debugger
            var table = $('#tbNhapKho').DataTable({
                data: response,
                    columns: [
                        {
                            "className": 'details-control',
                            "orderable": false,
                            "data": null,
                            "defaultContent": ''
                        },
                        { data: 'IDPN' },
                        { data: 'IDNV' },
                        { data: 'IDNCC' },
                        { data: 'NgayNhap' },
                        { data: 'TongSoLuong' },
                        {

                            data: 'TongTien',
                            render: $.fn.dataTable.render.number('.', ',', 0, '₫ ')

                        },

                        {

                            render: function (data, type, row, meta) {
                              
                                return '<i id="print-phieuNhap" class="fas fa-print"></i>';
                               
                            }
                        },
                      
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
        alert("okok");
    }
  

    static DeleteRowButton(){
        alert("okok");
    }


   static getObjectCode() {
        var trSelected = $(".tbData .row-selected");
        var objectCode = null;
        if (trSelected.length > 0) {
            var objectCode = $(trSelected).children()[0].textContent;
        }
        return objectCode;
    }

    btnEditOnclick() {
        

    }

    btnAddOnclick() {
        $('#txtCode').attr('readonly', false);
        this.formMode = "add";
        this.showDialogDetail();
        //this.addList();
    }

    btnEditPhieuNhapOnclick(){
        $('.content-hide').show();
       
        $('.content-show').hide();
         //MyObject.addList();
    }
    btnSavePhieuNhapOnclick1() {

    }
    btnSavePhieuNhapOnclick() {
        var temp = this;
        var inputRequireds = $(".required");
        var listData = temp.dataTableRow();
        var isValid = true;

        $.each(inputRequireds, function (index, input) {

            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass('required-error') || listData.length == 0) {
                isValid = false;
            }
        });

        if (isValid) {
            var object = {};
            object.IDPN = "";
            object.IDNV = $("#listNV").val();
            object.IDNCC = $("#listNCC").val();
            object.NgayNhap = $("#datePhieuNhap").val() + temp.newTime();
            debugger;
            $.ajax({
                url: "https://localhost:44399/PhieuNhaps/PostPhieuNhapGetIdentity",
                method: "POST",
                data: JSON.stringify(object),
                contentType: "application/json",
                dataType: "json",
               
            }).done(function (res) {
                var listObject = [];
                $.each(listData, function (key, value) {
                    var IDNK = "";
                    var IDPN = res.IDPN;
                    var IDSP = value.ID;
                    var SoLuong = value.SL;
                    listObject.push({ IDNK, IDPN, IDSP, SoLuong });
                });
               

                debugger

                $.ajax({
                    url: "https://localhost:44399/NhapKhoes/PostListNhapKho",
                    method: "POST",
                    data: JSON.stringify(listObject),
                    contentType: "application/json",
                    dataType: "json",
                 
                }).done(function (res) {
                    debugger;
                    alert("Thanh Cong")

                }).fail(function (res) {
                    alert("loi API");
                    debugger
            }) 
            

            }).fail(function (res1) {
                alert("loi API");
                debugger
            })
           
        }
    }

    dataTableRow() {
        var x = [];
        var data = $(".content-hide .tbData tr");
        $(".content-hide .tbData tr").each(function () {
           
            var SL = $(this).find("td").eq(2).find("input").val();

            var ID = $(this).find("td").eq(0).html();
            if (ID == undefined || SL == undefined) {
                return;
                debugger;
            }
                    
            else
            x.push({ ID, SL });

        })

        return x;
    }

    btnComeBackPhieuNhapOnclick() {

        $('.content-hide').hide();
        $('.content-detail').hide();

        $('.content-show').show();
        $('.content-hide .grid tbody').empty();
        window.location.href = $("#btnComeBack-hide-PhieuNhap").data('url');
        
    }
    btnCancleOnclick() {
        this.hideDialogDetail();
    }

    btnSaveOnclick() {       
    }
    //addItempTableSanPham okokokokok
   
     addItempTableSanPham(value) {
        
        debugger

        if (value != null) {

            $.ajax({
                url: "https://localhost:44399/SanPhams/getJoinSanPhamsMatHangs/" + value,
                method: "GET",
               

            }).done(function (res) {
                if (!res) {

                    alert("Lỗi");
                } else {

                    debugger

                    $.each(res, function (index, item) {

                        debugger
                        var htmlObject = $(`<tr>
                        <td>`+ item.IDSP + `</td >
                        <td>`+ item.TenSP + `</td>
                        <td><input id="txtSoLuong" class="required valid-SoLuong" type="text" autocomplete="off"/></td>
                        <td>`+ String(item.DonGia) + `</td>
                        <td>`+ item.TenMH + `</td>
                        <td><button id="btnRowDelete"><i class="fas fa-trash-alt"></i></button></td>
                        </tr>`);
                        $('.content-hide .grid tbody').append(htmlObject);
                        $('.required').addClass('css-input');

                    });

                }

            }).fail(function (res) {
                debugger
                alert("Lỗi API");
            })
        } else {
            alert("Bạn Chưa Chọn Dữ Liệu");
        }
    }


   /* static addList() {
        //add list San Pham
        var temp = this;
        $.ajax({

            url: "https://localhost:44399/SanPhams",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
       

        }).done(function (response) {
            debugger

            $(".menu-option #listSP").empty();
            var moiCHon = $(`<option value="null">` + "--Mời Chọn--" + `</option>`)
            $('.menu-option #listSP').append(moiCHon);
            $.each(response, function (index, item) {

                var htmlObject = $(
                    `<option value="` + item.IDSP + `">` + item.IDSP + "-" + item.TenSP + `</option>`

                );
                $('.menu-option #listSP').append(htmlObject);
                debugger
                // Cất dữ liệu vô thanh text;

            });

        }).fail(function () {

            alert("Lỗi API")
        });




        $.ajax({

            url: "https://localhost:44399/api/NhanViens",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
          

        }).done(function (response) {
            debugger

            $(".conten-input #listNV").empty();
            var moiCHon = $(`<option value="null">` + "--Mời Chọn--" + `</option>`)
            $('.conten-input #listNV').append(moiCHon);
            $.each(response, function (index, item) {

                var htmlObject = $(
                    `<option value="` + item.IDNV + `">` + item.IDNV + "-" + item.TenNV + `</option>`

                );
                $('.conten-input #listNV').append(htmlObject);
                debugger
                // Cất dữ liệu vô thanh text;

            });

        }).fail(function () {

            alert("Lỗi API")
        });

        $.ajax({

            url: "https://localhost:44399/api/NhaCungCaps",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",
       

        }).done(function (response) {
            debugger

            $('.conten-input #listNCC').empty();
            var moiCHon = $(`<option value="null">` + "--Mời Chọn--" + `</option>`)
            $('.conten-input #listNCC').append(moiCHon);
            $.each(response, function (index, item) {

                var htmlObject = $(
                    `<option value="` + item.IDNCC + `">` + item.IDNCC + "-" + item.TenNCC + `</option>`

                );
                $('.conten-input #listNCC').append(htmlObject);
                debugger
                // Cất dữ liệu vô thanh text;

            });

        }).fail(function () {

            alert("Lỗi API")
        });

    }  
    */
    checkRequired() {

        var value = this.value;
        if ($(this).hasClass('valid-ID')) {
            if (MyObject.checkID(value)) {
                $(this).removeClass('required-error');
                
                $(this).addClass('css-input');
              
                $(this).removeAttr("title");

            } else {
                $(this).removeClass('css-input');
                $(this).addClass('required-error');
                $(this).attr("title", "Thông Tin Bạn Nhập Phải Là 5 Kí Tự Thường Không Dấu");
                $(".content-right table i").show();
            }
        }

        if ($(this).hasClass('valid-SoLuong')) {
            if (MyObject.checkInt(value) && !value == false) {
                $(this).removeClass('required-error');

                $(this).addClass('css-input');
                $(this).removeAttr("title");

            } else {
                $(this).removeClass('css-input');
                $(this).addClass('required-error');
                $(this).attr("title", "Số Lượng Là Số Nguyên Lớn Hơn Không");
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

        if ($(this).hasClass('valid-List')) {
            if (value == "null") {
                $(this).addClass('required-error');
                $(this).removeClass('css-input');
                $(this).attr("title", "Mời Chọn Không Được Bỏ Trống");
                debugger;

            } else {
                $(this).removeClass('required-error');

                $(this).addClass('css-input');
            }
        }

    }

    DeleteRowButton() {
        alert("ok");
    }

    showDialogDetail() {
        $(".dialog input").val(null);
        $('.content-hide').show();
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

   static date(xau) {
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

    static checkInt(value) {
        var t = /^[0-9]*$/
        if (t.test(value))
            return true;
        return false;
    }

}