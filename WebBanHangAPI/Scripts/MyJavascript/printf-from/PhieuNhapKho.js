$(document).ready(function () {

    var object = new MyObject()

})

class MyObject {
    constructor() {

        this.initEvents();
        this.btnPrintKhoHang();
    }


    // Ten AP


    initEvents() {
        
        $("#print-from").click(this.btnPrintKhoHang.bind(this));
        $("#close-from").click(this.btnCloseTabhoHang.bind(this));
    }

    btnPrintKhoHang() {

        $.ajax({

            url: "https://localhost:44399/NhapKhoes/getJoinSanPhamsNhapKhosNhanViensPhieuNhaps/" + sessionStorage.getItem('IDPN'),
            method: "GET",//put , pop , get,
            contenType: "application/json",

        }).done(function (response) {
           debugger
            
            $("#code-from").html("Mã Số Phiếu : " + response[0].IDPN)
            $("#code-nhanvien").html("Nhân Viên : " + "(" + response[0].IDNV + ") " + response[0].TenNV)
            $("#code-nhacungcap").html("Nhà Cung Cấp : " + "(" + response[0].IDNCC + ") " + response[0].TenNCC)

            var tongTien = response[0].TongTien;
            var tongSoLuong = response[0].TongSoLuong;
            $.ajax({

                url: "https://localhost:44399/NhapKhoes/GetPhieuNhapsSanPhams/" + sessionStorage.getItem('IDPN'),
                method: "GET",//put , pop , get,
                contenType: "application/json",

            }).done(function (response) {
                const formatter = new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0
                })
                debugger
                $(".TableData tbody").empty();
                var i = 1;
                $.each(response, function (index, item) {

                    var htmlObject = $(`<tr>
                        <td>`+ i + `</td >
                        <td>`+ item.IDSP + `</td>
                        <td>`+ item.TenSP + `</td>
                        <td>`+ item.SoLuong + `</td>
                        <td>`+ formatter.format(item.DonGia) + `</td>
                        <td>`+ formatter.format(item.ThanhTien) + `</td>
                        
                        </tr>`);
                    $('.TableData tbody').append(htmlObject);
                    i += 1;
                });
                var htmlTongTien = $(`<tr>
                        <td colspan = "5" >Tổng Số Lượng</td >
                        <td>`+ tongSoLuong + `</td>
                        </tr>
                        <tr>                       
                        <td colspan = "5" >Tổng Tiền</td >
                        <td>`+ formatter.format(tongTien) + `</td>
                        </tr>`);
                $('.TableData tbody').append(htmlTongTien);

               
                $('.page').printThis({
                    debug: false,               // show the iframe for debugging
                    importCSS: true,            // import parent page css
                    importStyle: false,         // import style tags
                    printContainer: true,       // print outer container/$.selector
                    loadCSS: "",                // path to additional css file - use an array [] for multiple
                    pageTitle: ".",              // add title to print page
                    removeInline: true,        // remove inline styles from print elements
                    removeInlineSelector: "",  // custom selectors to filter inline styles. removeInline must be true
                    printDelay: 333,            // variable print delay
                    header: null,               // prefix to html
                    footer: null,               // postfix to html
                    base: false,                // preserve the BASE tag or accept a string for the URL
                    formValues: true,           // preserve input/form values
                    canvas: false,              // copy canvas content
                    doctypeString: '<!DOCTYPE html>',       // enter a different doctype for older markup
                    removeScripts: false,       // remove script tags from print content
                    copyTagClasses: false,      // copy classes from the html & body tag
                    beforePrintEvent: null,     // function for printEvent in iframe
                    beforePrint: null,          // function called before iframe is filled
                    afterPrint: null            // function called before iframe is removed
                });
            }).fail(function () {

                alert("Lỗi API")
            });

        });
        //Lay Du lieu tren server thong qua loi goi api
        
    }

    btnCloseTabhoHang() {
        window.close();
    }
}