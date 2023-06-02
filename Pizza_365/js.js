$(document).ready(function(){
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    // bạn có thê dùng để lưu trữ combo được chọn, mỗi khi khách chọn bạn lại đổi giá trị properties của nó
    var gSelectedMenuStructure = {
            menuName: "",    // S, M, L
            duongKinhCM: 0,
            suongNuong: 0,
            saladGr: 0,
            drink: 0,
            priceVND: 0
    }
    // bạn có thể dùng để lưu loại pizza đươc chọn, mỗi khi khách chọn, bạn lại đổi giá trị cho nó
    var gSelectedPizzaType = "";
    //biến mảng lưu trữ danh sách đồ uống lấy ra từ sever
    var gDrinkList = [];
    //biến lưu giá trị phần trăm giảm giá của voucher
    var gDiscount = 0;
    //bạn có thể dùng để lưu trữ thông tin người đặt hàng mỗi khi khách điền thông tin vào form
    var gUserOrder = {
            menuDuocChon: "",     
            loaiPizza: "",
            loaiNuocUong: "",
            hoVaTen: "", 
            email: "",
            dienThoai: "",
            diaChi: "",
            loiNhan: "",
            voucher: "",
            priceAnnualVND(){
                return gSelectedMenuStructure.priceVND * (1-gDiscount * 0.01);
            }
    }

    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
    //gán sự kiện khi tải trang
    onPageLoading();
    //gán sự kiện cho nút Chọn small
    $(document).on("click","#btn-small",function(){
        onBtnSmallClick();
    });
    //gán sự kiện cho nút Chọn medium
    $(document).on("click","#btn-medium",function(){
        onBtnMediumClick();
    });
    //gán sự kiện cho nút Chọn large
    $(document).on("click","#btn-large",function(){
        onBtnLargeClick();
    });
    //gán sự kiện cho nút Chọn loại Pizza OCEAN MAMINA
    $(document).on("click","#btn-ocean",function(){
        onBtnPizzaOceanClick();
    });
    //gán sự kiện cho nút Chọn loại Pizza HAWAIIAN
    $(document).on("click","#btn-hawai",function(){
        onBtnPizzaHawaiClick();
    });
    //gán sự kiện cho nút Chọn loại Pizza CHESY CHICKEN BACON
    $(document).on("click","#btn-bacon",function(){
        onBtnPizzaBaconClick();
    });
    // gán sự kiện cho nút Gửi
    $(document).on("click","#btn-send-data",function(){
        onBtnSendDataClick();
    })
    //gán sự kiện cho nút Tạo đơn (modal)
    $(document).on("click","#btn-tao-don",function(){
        onBtnCreateOrderClick();
    })

    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
    //hàm xử lý sự kiện khi tải trang
    function onPageLoading(){
        //gọi hàm callApi để lấy ra danh sách đồ uống
        callApiToGetDrinkList();
        //gọi hàm đổ dữ liệu drink vào select
        loadDataDrinkToSelect(gDrinkList);
    };
    //hàm xử lý sự kiện cho nút Chọn Small
    function onBtnSmallClick(){
        gSelectedMenuStructure = getSelectedMenuStructure("S", 20, 2, 200, 2, 150000);
        gSelectedMenuStructure.displayMenuInConsole();
        changeColorButtonMenuCombo("S");
    }
    //hàm xử lý sự kiện cho nút Chọn Small
    function onBtnMediumClick(){
        gSelectedMenuStructure = getSelectedMenuStructure("M", 25, 4, 300, 3, 200000);
        gSelectedMenuStructure.displayMenuInConsole();
        changeColorButtonMenuCombo("M");
    }
    //hàm xử lý sự kiện cho nút Chọn Small
    function onBtnLargeClick(){
        gSelectedMenuStructure = getSelectedMenuStructure("L", 30, 8, 500, 4, 250000);
        gSelectedMenuStructure.displayMenuInConsole();
        changeColorButtonMenuCombo("L");
    }
    //hàm xử lý sự kiện cho nút chọn loại Pizza OCEAN MAMINA
    function onBtnPizzaOceanClick(){
        gSelectedPizzaType = "OCEAN MAMINA";
        console.log("%cLoại pizza được chọn là: " + gSelectedPizzaType, "color:blue");
        changePizzaTpyeButtonColor(gSelectedPizzaType);
    }
    //hàm xử lý sự kiện cho nút chọn loại Pizza HAWAIIAN
    function onBtnPizzaHawaiClick(){
        gSelectedPizzaType = "HAWAIIAN";
        console.log("%cLoại pizza được chọn là: " + gSelectedPizzaType, "color:blue");
        changePizzaTpyeButtonColor(gSelectedPizzaType);
    }
    //hàm xử lý sự kiện cho nút chọn loại Pizza CHESY CHICKEN BACON
    function onBtnPizzaBaconClick(){
        gSelectedPizzaType = "CHESY CHICKEN BACON";
        console.log("%cLoại pizza được chọn là: " + gSelectedPizzaType, "color:blue");
        changePizzaTpyeButtonColor(gSelectedPizzaType);
    }
    //hàm xử lý sự kiện cho nút Gửi
    function onBtnSendDataClick(){
        //B1: thu thập dữ liệu
        getDataUserOrder(gUserOrder);
        //B2: kiểm tra
        if(validateUserOrder(gUserOrder)){
            //B3: Xử lý hiển thị
            //hiển thị thông tin user order lên form modal Thông tin đơn hàng
            showDataOrderToFormModal(gUserOrder);
            //hiển thị form modal lên
            $("#modal-thong-tin-order").modal("show");
        }
    }
    //hàm xử lý sự kiện cho nút Tạo đơn
    function onBtnCreateOrderClick(){
        //khai báo biến lưu trữ thông tin của Order
        var vObjectOrder = {
            kichCo: gUserOrder.menuDuocChon.menuName,
            duongKinh: gUserOrder.menuDuocChon.duongKinhCM,
            suon: gUserOrder.menuDuocChon.suongNuong,
            salad: gUserOrder.menuDuocChon.saladGr,
            loaiPizza: gUserOrder.loaiPizza,
            idVourcher: gUserOrder.voucher,
            idLoaiNuocUong: gUserOrder.loaiNuocUong,
            soLuongNuoc: gUserOrder.menuDuocChon.drink,
            hoTen: gUserOrder.hoVaTen,
            thanhTien: gUserOrder.priceAnnualVND(),
            email: gUserOrder.email,
            soDienThoai: gUserOrder.dienThoai,
            diaChi: gUserOrder.diaChi,
            loiNhan: gUserOrder.loiNhan
        }
        //gọi Api để tạo order mới và hiển thị vào input Mã đơn hàng (modal)
        callApiToCreateNewOrder(vObjectOrder);
        //Ẩn form modal lên
        $("#modal-thong-tin-order").modal("hide");
        //hiển thị form modal lên
        $("#modal-ket-qua").modal("show");
    }

    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
    //Hàm lấy thông tin Menu Combo
    function getSelectedMenuStructure(paramMenu, paramDuongKinh, paramSuonNuong, paramSalad, paramDrink, paramPrice){
        var vSelectedMenuStructure = {
                menuName: paramMenu,
                duongKinhCM: paramDuongKinh,
                suongNuong: paramSuonNuong,
                saladGr: paramSalad,
                drink: paramDrink,
                priceVND: paramPrice,
                displayMenuInConsole(){
                    console.log("%cMenu được chọn: " + this.menuName, "color:blue");
                    console.log("Đường kính: " + this.duongKinhCM +"cm");
                    console.log("Sườn nướng: " + this.suongNuong);
                    console.log("Salad: " + this.saladGr + "g");
                    console.log("Drink: " + this.drink);
                    console.log("Price: " + this.priceVND + " VND");
                }
        }
        return vSelectedMenuStructure;
    }
    //hàm đổi màu các nút Chọn phần chọn menu combo
    function changeColorButtonMenuCombo(paramMenuCombo){
        var vBtnSmall = $("#btn-small");
        var vBtnMeudim = $("#btn-medium");
        var vBtnLarge = $("#btn-large");

        if(paramMenuCombo == "S"){
            vBtnSmall.removeClass("btn-danger").addClass("btn-success");
            vBtnMeudim.removeClass("btn-success").addClass("btn-danger");
            vBtnLarge.removeClass("btn-success").addClass("btn-danger");

        }else if(paramMenuCombo == "M"){
            vBtnSmall.removeClass("btn-success").addClass("btn-danger");
            vBtnMeudim.removeClass("btn-danger").addClass("btn-success");
            vBtnLarge.removeClass("btn-success").addClass("btn-danger");

        }else if(paramMenuCombo == "L"){
            vBtnSmall.removeClass("btn-success").addClass("btn-danger");
            vBtnMeudim.removeClass("btn-success").addClass("btn-danger");
            vBtnLarge.removeClass("btn-danger").addClass("btn-success");
        }
    }
    //hàm đổi màu nút Chọn phần chọn loại Pizza
    function changePizzaTpyeButtonColor(paramPizzaType){
        if(paramPizzaType == "OCEAN MAMINA"){
            $("#btn-ocean").removeClass("btn-danger").addClass("btn-success");
            $("#btn-hawai").removeClass("btn-success").addClass("btn-danger");
            $("#btn-bacon").removeClass("btn-success").addClass("btn-danger");

        }else if(paramPizzaType == "HAWAIIAN"){
            $("#btn-ocean").removeClass("btn-success").addClass("btn-danger");
            $("#btn-hawai").removeClass("btn-danger").addClass("btn-success");
            $("#btn-bacon").removeClass("btn-success").addClass("btn-danger");

        }else if(paramPizzaType == "CHESY CHICKEN BACON"){
            $("#btn-ocean").removeClass("btn-success").addClass("btn-danger");
            $("#btn-hawai").removeClass("btn-success").addClass("btn-danger");
            $("#btn-bacon").removeClass("btn-danger").addClass("btn-success");
        }
    }
    //hàm gọi Api để lấy danh sách nước uống
    function callApiToGetDrinkList(){
        $.ajax({
            url: "http://203.171.20.210:8080/devcamp-pizza365/drinks",
            type: "GET",
            dataType: 'json',
            async: false,
            success: function(responseObject){
                //lưu danh sách nước uống vào biến global
                gDrinkList = responseObject;
                //console.log(responseObject);
            },
            error: function(error){
                console.assert(error.responseText);
            }
        });
    }
    //hàm load dữ liệu danh sách đồ uống vào select
    function loadDataDrinkToSelect(paramDrinkList){
        for(var i = 0; i < paramDrinkList.length; i++){
            var vSelectDrink = $("#select-drink");
            $("<option>",{
                text: paramDrinkList[i].tenNuocUong,
                value: paramDrinkList[i].maNuocUong
            }).appendTo(vSelectDrink);
        }
    }
    //hàm thu thập dữ liệu từ form Gửi đơn hàng
    function getDataUserOrder(paramUserOrder){
        paramUserOrder.menuDuocChon = gSelectedMenuStructure;
        paramUserOrder.loaiPizza = gSelectedPizzaType;
        paramUserOrder.loaiNuocUong = $("#select-drink").val();
        paramUserOrder.hoVaTen = $("#inp-fullname").val().trim();
        paramUserOrder.email = $("#inp-email").val().trim();
        paramUserOrder.dienThoai = $("#inp-dien-thoai").val().trim();
        paramUserOrder.diaChi = $("#inp-dia-chi").val().trim();
        paramUserOrder.voucher = $("#inp-voucher").val().trim();
        paramUserOrder.loiNhan = $("#inp-message").val().trim();
    }
    //hàm kiểm tra thông tin user order lấy từ form Gửi đơn hàng
    function validateUserOrder(paramUserOrder){
        if(paramUserOrder.menuDuocChon.menuName == ""){
            alert("Hãy chọn menu combo mà bạn muốn!");
            return false;

        }else if(paramUserOrder.loaiPizza == ""){
            alert("Hãy chọn loại pizza yêu thích!")
            return false;

        }else if(paramUserOrder.loaiNuocUong == "all"){
            alert("Hãy chọn loại nước uống yêu thích!")
            return false;

        }else if(paramUserOrder.hoVaTen == ""){
            alert("Hãy nhập họ và tên của bạn!")
            return false;

        }else if(kiemTraEmail(paramUserOrder.email) == false){
            alert("Email không hợp lệ!");
            return false;
        
        }else if(paramUserOrder.dienThoai == "" || isNaN(paramUserOrder.dienThoai)){
            alert("Số điện thoại phải là số!")
            return false;
        
        }else if(paramUserOrder.diaChi == ""){
            alert("Hãy nhập địa chỉ của bạn!")
            return false;
        
        }else if(checkVoucher(paramUserOrder.voucher) == false){
            return false;
        }
        return true;
    }
    //Hàm kiểm tra email
    function kiemTraEmail(paramEmail){
        var vEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(paramEmail.match(vEmail)){
            return true;
        }else{
            return false;
        }
    }
    //Hàm kiểm tra voucher
    function checkVoucher(paramMaVoucher) {
        var vSuccess = null;
        var vError = null;
        
        if(paramMaVoucher == ""){
          return true;
        }else{
            $.ajax({
                url: "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail/" + "/" + paramMaVoucher,
                type: "GET",
                dataType: 'json',
                async: false,
                success: function(responseObject){
                    gDiscount =  responseObject.phanTramGiamGia;
                    console.log(responseObject);
                    vSuccess = true;
                },
                error: function(error){
                    console.assert(error.responseText);
                    vError = false;
                }
            });

            if(vSuccess == true){
                return true;
            }else if(vError == false){
                alert("Mã giảm giá không đúng!");
                return false;
            }
        }
    }
    //hàm hiển thị thông tin order lên form modal Thông tin đơn hàng
    function showDataOrderToFormModal(paramUserOrder){

        $("#inp-modal-fullname").val(paramUserOrder.hoVaTen);
        $("#inp-modal-dien-thoai").val(paramUserOrder.dienThoai);
        $("#inp-modal-dia-chi").val(paramUserOrder.diaChi);
        $("#inp-modal-message").val(paramUserOrder.loiNhan);
        $("#inp-modal-voucher").val(paramUserOrder.voucher);

        $("#txt-modal-chi-tiet").html(
            "Xác nhận: " + paramUserOrder.hoVaTen + ", " + paramUserOrder.dienThoai + ", " + paramUserOrder.diaChi + ", " +
            "\nMenu: " + paramUserOrder.menuDuocChon.menuName + ", sườn nướng " + paramUserOrder.menuDuocChon.suongNuong + ", nước " + paramUserOrder.menuDuocChon.drink +
            "\nLoại pizza: " + paramUserOrder.loaiPizza + ", Giá: " + paramUserOrder.menuDuocChon.priceVND + " vnd, Mã giảm giá: " + paramUserOrder.voucher +
            "\nPhải thanh toán: " + paramUserOrder.priceAnnualVND() + " vnd (giảm giá " + gDiscount + "%)"
        );
    }
    //hàm gọi Api để tạo 1 order mới
    function callApiToCreateNewOrder(paramObjectOrder){
        var vJsonString = JSON.stringify(paramObjectOrder);
        $.ajax({
            url: "http://203.171.20.210:8080/devcamp-pizza365/orders",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: vJsonString,
            success: function(responseObject){
                //gọi hàm hiển thị mã đơn hàng lên ô input
                showOrderIdOfNewOrder(responseObject);
                console.log(responseObject);
            },
            error: function(error){
                console.assert(error.responseText);
            }
        });
    }
    //hàm hiển thị order Id của order vừa được tạp ra input Mã đơn hàng (modal)
    function showOrderIdOfNewOrder(paramObjectOrder){
        $("#inp-order-id").val(paramObjectOrder.orderCode);
    }
})