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
        $('#btEdit-HoaDon').click(this.btnEditHoaDonOnclick.bind(this));
        $('#btnComeBack-hide-HoaDon').click(this.btnComeBackHoaDonOnclick.bind(this));

       
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

    btnEditHoaDonOnclick() {
        $('.content-hide').show();

        $('.content-show').hide();
        //MyObject.addList();
    }

    btnComeBackHoaDonOnclick() {

        $('.content-hide').hide();
        $('.content-detail').hide();

        $('.content-show').show();
        $('.content-hide .grid tbody').empty();
        window.location.href = $("#btnComeBack-hide-HoaDon").data('url');

    }




}


