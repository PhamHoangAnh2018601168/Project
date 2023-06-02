/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gCoursesDB = {
    description: "This DB includes all courses in system",
    courses: [
        {
            id: 1,
            courseCode: "FE_WEB_ANGULAR_101",
            courseName: "How to easily create a website with Angular",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-angular.jpg",
            teacherName: "Morris Mccoy",
            teacherPhoto: "images/teacher/morris_mccoy.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 2,
            courseCode: "BE_WEB_PYTHON_301",
            courseName: "The Python Course: build web application",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-python.jpg",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 5,
            courseCode: "FE_WEB_GRAPHQL_104",
            courseName: "GraphQL: introduction to graphQL for beginners",
            price: 850,
            discountPrice: 650,
            duration: "2h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-graphql.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 6,
            courseCode: "FE_WEB_JS_210",
            courseName: "Getting Started with JavaScript",
            price: 550,
            discountPrice: 300,
            duration: "3h 34m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 8,
            courseCode: "FE_WEB_CSS_111",
            courseName: "CSS: ultimate CSS course from beginner to advanced",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-css.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 14,
            courseCode: "FE_WEB_WORDPRESS_111",
            courseName: "Complete Wordpress themes & plugins",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-wordpress.jpg",
            teacherName: "Clevaio Simon",
            teacherPhoto: "images/teacher/clevaio_simon.jpg",
            isPopular: true,
            isTrending: false
        }
    ]
}
// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOURSE_ID_COL = 0;
const gCOURSE_CODE = 1
const gCOURSE_NAME = 2;
const gCOURSE_IMAGE = 3;
const gCOURSE_PRICE = 4;
const gCOURSE_DISCOUNT_PRICE = 5;
const gDURATION = 6;
const gLEVEL = 7;
const gTEACHER_NAME = 8;
const gTEACHER_IMAGE = 9;
const gPOPULAR = 10;
const gTRENDING = 11;
const gACTION_COL = 12;
//biến mảng lưu trữ dữ liệu Most Popular
var gMostPopular = [];
//biến mảng lưu trữ dữ liệu Trending
var gTrending = [];
//biến lưu trữ id của user
var gStt = 1;
//biến lưu trữ course Id
var gCoursesId = "";
// Biến mảng toàn cục chứa danh sách tên các thuộc tính
const gCOURSE_COLS = ["id", "courseCode", "courseName", "coverImage", "price", "discountPrice", "duration", "level", "teacherName", "teacherPhoto", "isPopular", "isTrending", "action"];
// Khai báo DataTable & mapping collumns
var gCourseTable = $("#course-table").DataTable({
      columns: [
        { data: gCOURSE_COLS[gCOURSE_ID_COL] },
        { data: gCOURSE_COLS[gCOURSE_CODE] },
        { data: gCOURSE_COLS[gCOURSE_NAME] },
        { data: gCOURSE_COLS[gCOURSE_IMAGE] },
        { data: gCOURSE_COLS[gCOURSE_PRICE] },
        { data: gCOURSE_COLS[gCOURSE_DISCOUNT_PRICE] },
        { data: gCOURSE_COLS[gDURATION] },
        { data: gCOURSE_COLS[gLEVEL] },
        { data: gCOURSE_COLS[gTEACHER_NAME] },
        { data: gCOURSE_COLS[gTEACHER_IMAGE] },
        { data: gCOURSE_COLS[gPOPULAR] },
        { data: gCOURSE_COLS[gTRENDING] },
        { data: gCOURSE_COLS[gACTION_COL] }
      ],
      columnDefs: [
        {
            targets: gCOURSE_ID_COL,
            render: function(){
                return gStt++;
            }
        },
        {
            targets: gPOPULAR,
            class: "text-center text-primary"
        },
        {
            targets: gTRENDING,
            class: "text-center text-primary"
        },
        {
            targets: gACTION_COL,
            defaultContent: `
                    <button class="btn btn-link btn-edit" data-toggle="tooltip" data-placement="bottom" title="Sửa"><i class="fas fa-edit text-primary"></i></button>
                    <button class="btn btn-link btn-delete" data-toggle="tooltip" data-placement="bottom" title="Xóa"><i class="fa fa-trash text-danger"></i></button>
                    `,
            class: "text-center"
        }
      ],
      autoWidth: false
    });

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
//gán sự kiện khi tải trang
$(document).ready(function(){
    onPageLoading();
})
//gán sự kiện cho nút Thêm khóa học
$(document).on("click","#btn-add-course",function(){
    onBtnAddNewCourseClick();
})
//gán sự kiện cho nút Sửa
$(document).on("click",".btn-edit",function(){
    onBtnEditClick(this);
})
//gán sự kiện cho nút Xóa
$(document).on("click",".btn-delete",function(){
    onBtnDeleteClick(this);
})
//gán sự cho nút Create new course(modal)
$(document).on("click",".btn-create",function(){
    onBtnCreateNewCourseClick();
})
//gán sự kiện cho nút Update course(modal)
$(document).on("click",".btn-update", function(){
    onBtnUpdateCourseClick();
})
//gán sự kiện cho nút Confirm(modal)
$(document).on("click","#btn-confirm-delete-course", function(){
    onBtnConfirmDeleteClick();
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
//hàm xử lý sự kiện khi tải trang
function onPageLoading(){
    //lấy dữ liệu Most Popular
    getDataMostPopular();
    //xử lý hiển thị Most Popular
    loadDataToMostPopular(gMostPopular);
    //lấy dữ liệu Trending
    getDataMostTrending();
    //xử lý hiển thị Trending
    loadDataToTrending(gTrending);
    //Hiển thị dữ liệu vào DataTable trang Quản Trị
    loadDataToDataTable(gCoursesDB.courses);
}
//hàm xử lý sự kiện cho nút Thêm khóa học
function onBtnAddNewCourseClick(){
    //hiển thi modal lên
    $("#create-course-modal").modal("show");
}
//hàm xử lý sự kiện cho nút Sửa
function onBtnEditClick(paramButton){
    //lấy ra giá trị id của course được chọn
    gCoursesId = getCourseIdFromButton(paramButton);
    //hiển thị thông tin Course được chọn lên form modal
    showCourseToFormUpdateModal(gCoursesId);
    //hiển thi modal lên
    $("#edit-course-modal").modal("show");
}
//hàm xử lý sự kiện cho nút Xóa
function onBtnDeleteClick(paramButton){
    //lấy ra id của Course được chọn
    gCoursesId = getCourseIdFromButton(paramButton)
    //hiển thị form delete modal lên
    $("#delete-confirm-modal").modal("show");
}
//hàm xử lý sự kiện cho nút Create new course(modal)
function onBtnCreateNewCourseClick(){
    // khai báo đối tượng chứa voucher data
    var vObjectData = {
        id: getNextId(),
        courseCode: "",
        courseName: "",
        price: "",
        discountPrice: "",
        duration: "",
        level: "",
        coverImage: "",
        teacherName: "",
        teacherPhoto: "",
        isPopular: "",
        isTrending: ""
    };
    // B1: Thu thập dữ liệu
    getCreateCourseData(vObjectData);
    // B2: Validate insert
    if(validateCourseData(vObjectData)) {
        // B3: insert voucher 
        insertNewCourse(vObjectData);
        //B4: xử lý front-end 
        loadDataToDataTable(gCoursesDB.courses);
        //gọi hàm xóa trắng modal thêm mới
        resertCourseFormAdNewModal();
        $("#create-course-modal").modal("hide");
    }
}
//hàm xử lý sự kiện cho nút Update course (modal)
function onBtnUpdateCourseClick(){
    // khai báo đối tượng chứa voucher data
    var vObjectData = {
        id: getNextId(),
        courseCode: "",
        courseName: "",
        price: "",
        discountPrice: "",
        duration: "",
        level: "",
        coverImage: "",
        teacherName: "",
        teacherPhoto: "",
        isPopular: "",
        isTrending: ""
    };
    // B1: Thu thập dữ liệu
    getUpdateCourseData(vObjectData);
    // B2: Validate insert
    if(validateCourseData(vObjectData)) {
        // B3: update voucher 
        UpdateNewCourse(vObjectData);
        //B4: xử lý front-end 
        loadDataToDataTable(gCoursesDB.courses);
        //thông báo update thành công
        alert("Update thông tin thành công!");
        //gọi hàm xóa trắng modal thêm mới
        resertCourseFormEidtModal();
        $("#edit-course-modal").modal("hide");
    }
}
//hàm xử lý sự kiện cho nút Confirm (modal)
function onBtnConfirmDeleteClick(){
    // khai báo đối tượng chứa voucher data (bỏ qua)
    // B1: Thu thập dữ liệu (bỏ qua)
    // B2: Validate update (bỏ qua)
    // B3: delete voucher
    deleteCourse(gCoursesId);
    // B4: xử lý front-end
    alert("Xóa Course thành công!");
    loadDataToDataTable(gCoursesDB.courses);
    $("#delete-confirm-modal").modal("hide");
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
//hàm lấy ra dữ liệu của popurlar và lưu vào biến vMostPopular
function getDataMostPopular(){
    for(var i = 0; i < gCoursesDB.courses.length; i++){
        if(gCoursesDB.courses[i].isPopular == true){
            gMostPopular.push(gCoursesDB.courses[i]);
        }
    }
    return gMostPopular;
}
//hàm lấy ra dữ liệu của popurlar và lưu vào biến vMostPopular
function getDataMostTrending(){
    for(var i = 0; i < gCoursesDB.courses.length; i++){
        if(gCoursesDB.courses[i].isTrending == true){
            gTrending.push(gCoursesDB.courses[i]);
        }
    }
    return gTrending;
}

//hàm load dữ liệu vào cho Most Popular
function loadDataToMostPopular(paramObject){
    var vContentPopular = $(".content-popular");
    vContentPopular.empty();

    for(var i = 0; i < paramObject.length; i++){
        //tạo thẻ div chứa card
        var vDivCol_3 = $("<div>",{ class: "col-sm-3" });
        //tạo thẻ div là card
        var vDivCard = $("<div>",{ class: "card" });

        $("<img>",{
            src: paramObject[i].coverImage,
            class: "card-img-top",
            alt: "..."
        }).appendTo(vDivCard);

        //Tạo thẻ div card body
        var vDivCardBody = $("<div>",{ class: "card-body" });
        $("<a>",{
            href: "#",
            html: paramObject[i].courseName
        }).appendTo(vDivCardBody);
        $("<p>",{
            class: "card-text",
            html: '<i class="fa-regular fa-clock"></i> ' + paramObject[i].duration + " " + paramObject[i].level 
        }).appendTo(vDivCardBody);
        $("<p>").html("$" + paramObject[i].discountPrice + " ").append('<del class="text-secondary">' + '$' + paramObject[i].price + '</del>').appendTo(vDivCardBody);
        vDivCardBody.appendTo(vDivCard);

        //tạo thẻ div card footer
        var vDivCardFooter = $("<div>",{ class: "card-footer" });
        var vDivRowFooter = $("<div>",{ class: "row mx-auto" })
        $("<img>",{
            src: paramObject[i].teacherPhoto,
            class: "rounded-circle",
            alt: "...",
            width: "20%"
        }).appendTo(vDivRowFooter);
        $("<p>",{
            class: "m-auto",
            html: paramObject[i].teacherName
        }).appendTo(vDivRowFooter);
        $("<i>",{
            class: "fa-regular fa-bookmark m-auto"
        }).appendTo(vDivRowFooter);
        vDivRowFooter.appendTo(vDivCardFooter);
        vDivCardFooter.appendTo(vDivCard);
        
        vDivCard.appendTo(vDivCol_3);
        vDivCol_3.appendTo(vContentPopular);
    }
}

//hàm load dữ liệu vào cho Trending
function loadDataToTrending(paramObject){
    var vContentPopular = $(".content-trending");
    vContentPopular.empty();

    for(var i = 0; i < paramObject.length; i++){
        //tạo thẻ div chứa card
        var vDivCol_3 = $("<div>",{ class: "col-sm-3" });
        //tạo thẻ div là card
        var vDivCard = $("<div>",{ class: "card" });

        $("<img>",{
            src: paramObject[i].coverImage,
            class: "card-img-top",
            alt: "..."
        }).appendTo(vDivCard);

        //Tạo thẻ div card body
        var vDivCardBody = $("<div>",{ class: "card-body" });
        $("<a>",{
            href: "#",
            html: paramObject[i].courseName
        }).appendTo(vDivCardBody);
        $("<p>",{
            class: "card-text",
            html: '<i class="fa-regular fa-clock"></i> ' + paramObject[i].duration + " " + paramObject[i].level 
        }).appendTo(vDivCardBody);
        $("<p>").html("$" + paramObject[i].discountPrice + " ").append('<del class="text-secondary">' + '$' + paramObject[i].price + '</del>').appendTo(vDivCardBody);
        vDivCardBody.appendTo(vDivCard);

        //tạo thẻ div card footer
        var vDivCardFooter = $("<div>",{ class: "card-footer" });
        var vDivRowFooter = $("<div>",{ class: "row mx-auto" })
        $("<img>",{
            src: paramObject[i].teacherPhoto,
            class: "rounded-circle",
            alt: "...",
            width: "20%"
        }).appendTo(vDivRowFooter);
        $("<p>",{
            class: "m-auto",
            html: paramObject[i].teacherName
        }).appendTo(vDivRowFooter);
        $("<i>",{
            class: "fa-regular fa-bookmark m-auto"
        }).appendTo(vDivRowFooter);
        vDivRowFooter.appendTo(vDivCardFooter);
        vDivCardFooter.appendTo(vDivCard);
        
        vDivCard.appendTo(vDivCol_3);
        vDivCol_3.appendTo(vContentPopular);
    }
}
//hàm load dữ liệu vào DataTable
function loadDataToDataTable(paramUser){
    gStt = 1;
    gCourseTable.clear();
    gCourseTable.rows.add(paramUser);
    gCourseTable.draw();
}
// hàm sinh ra đc id tự tăng tiếp theo, dùng khi Thêm mới phần tử
function getNextId() {
    var vNextId = 0;
    // Nếu mảng chưa có đối tượng nào thì Id = 1
    if(gCoursesDB.courses.length == 0) {
      vNextId = 1;
    }
    // Id tiếp theo bằng Id của phần tử cuối cùng + thêm 1    
    else {
        vNextId = gCoursesDB.courses[gCoursesDB.courses.length - 1].id + 1;
        }
    return vNextId;
}
//hàm đọc dữ liệu từ form Ad new course modal
function getCreateCourseData(paramObjectCourse){
    paramObjectCourse.courseCode = $("#inp-course-code").val().trim();
    paramObjectCourse.courseName = $("#inp-course-name").val().trim();
    paramObjectCourse.coverImage = $("#inp-course-image").val().trim();
    paramObjectCourse.price = $("#inp-price").val().trim();
    paramObjectCourse.discountPrice = $("#inp-discount-price").val().trim();
    paramObjectCourse.duration = $("#inp-duration").val().trim();
    paramObjectCourse.level = $("#inp-level").val().trim();
    paramObjectCourse.teacherName = $("#inp-teacher-name").val().trim();
    paramObjectCourse.teacherPhoto = $("#inp-teacher-image").val().trim();
    paramObjectCourse.isPopular = $("#inp-is-popular").val().trim();
    paramObjectCourse.isTrending = $("#inp-is-trending").val().trim();
}
//hàm đọc dữ liệu từ form Update course modal
function getUpdateCourseData(paramObjectCourse){
    paramObjectCourse.courseCode = $("#edit-course-code").val().trim();
    paramObjectCourse.courseName = $("#edit-course-name").val().trim();
    paramObjectCourse.coverImage = $("#edit-course-image").val().trim();
    paramObjectCourse.price = $("#edit-price").val().trim();
    paramObjectCourse.discountPrice = $("#edit-discount-price").val().trim();
    paramObjectCourse.duration = $("#edit-duration").val().trim();
    paramObjectCourse.level = $("#edit-level").val().trim();
    paramObjectCourse.teacherName = $("#edit-teacher-name").val().trim();
    paramObjectCourse.teacherPhoto = $("#edit-teacher-image").val().trim();
    paramObjectCourse.isPopular = $("#edit-is-popular").val().trim();
    paramObjectCourse.isTrending = $("#edit-is-trending").val().trim();
}
//hàm kiểm tra dữ liệu form thêm mới course modal
function validateCourseData(paramObjectCourse){
    var vInfoArray = [
        paramObjectCourse.courseCode,
        paramObjectCourse.courseName,
        paramObjectCourse.coverImage,
        paramObjectCourse.pricej,
        paramObjectCourse.discountPrice,
        paramObjectCourse.duration,
        paramObjectCourse.level,
        paramObjectCourse.teacherName,
        paramObjectCourse.teacherPhoto,
        paramObjectCourse.isPopular,
        paramObjectCourse.isTrending
    ];
    //kiểm tra có nhập đủ thông tin hay không
    for(var bI = 0; bI < vInfoArray.length; bI++){
        if(vInfoArray[bI] === ""){
            alert("Hãy nhập đầy đủ thông tin khóa học!");
            return false;
        }
    }
    //kiểm tra xem mã khóa học và tên khóa học được nhập so với dữ liệu trong gCoursesDB 
    for(var i = 0; i< gCoursesDB.courses.length; i++){
        if((paramObjectCourse.courseCode == gCoursesDB.courses[i].courseCode && paramObjectCourse.courseName != gCoursesDB.courses[i].courseName) || (paramObjectCourse.courseCode != gCoursesDB.courses[i].courseCode && paramObjectCourse.courseName == gCoursesDB.courses[i].courseName)){
            alert("Mã khóa học hoặc tên khóa học không hợp lệ!");
            return false;
        }
    }
    //kiểm tra giá nhập vào có phải là số > 0 
    if(isNaN(paramObjectCourse.price) || isNaN(paramObjectCourse.discountPrice) || paramObjectCourse.price < 0 || paramObjectCourse.discountPrice < 0){
        alert("Price và Discount Price phải là số lớn hơn 0!");
        return false;
    }
    //kiểm tra isPopular và isTrending có phải là kiểu bolean hay không
    if(!Boolean(paramObjectCourse.isPopular) || !Boolean(paramObjectCourse.isTrending)){
        alert("Is popular và is trending phải là true hoặc false!");
        return false;
    }
    return true;
}
// hàm thực hiện insert new course vào mảng
function insertNewCourse(paramObjectCourse) {
    gCoursesDB.courses.push(paramObjectCourse);
}
//hàm thực hiện update thông tin course được chọn
function UpdateNewCourse(paramObjectCourse){
    var vCourseIndex = getIndexFormCourseId(gCoursesId);
    gCoursesDB.courses.splice(vCourseIndex, 1, paramObjectCourse);
}
//hàm thực hiện Delete Course được chọn
function deleteCourse(paramCourseId){
    var vCourseIndex = getIndexFormCourseId(paramCourseId);
    gCoursesDB.courses.splice(vCourseIndex, 1);
}
//hàm xóa trắng form create modal
function resertCourseFormAdNewModal(){
    $("#inp-course-code").val("");
    $("#inp-course-name").val("");
    $("#inp-course-image").val("");
    $("#inp-price").val("");
    $("#inp-discount-price").val("");
    $("#inp-duration").val("");
    $("#inp-level").val("");
    $("#inp-teacher-name").val("");
    $("#inp-teacher-image").val("");
    $("#inp-is-popular").val("");
    $("#inp-is-trending").val("");
}
//hàm xóa trắng form update modal
function resertCourseFormEidtModal(){
    $("#edit-course-code").val("");
    $("#edit-course-name").val("");
    $("#edit-course-image").val("");
    $("#edit-price").val("");
    $("#edit-discount-price").val("");
    $("#edit-duration").val("");
    $("#edit-level").val("");
    $("#edit-teacher-name").val("");
    $("#edit-teacher-image").val("");
    $("#edit-is-popular").val("");
    $("#edit-is-trending").val("");
}
// hàm dựa vào button detail (edit or delete) xác định đc id course
function getCourseIdFromButton(paramButton) {
    var vTableRow = $(paramButton).parents("tr");
    var vCourseRowData = gCourseTable.row(vTableRow).data();
    return vCourseRowData.id;
}
//hàm hiển thị dữ liệu của Course được chọn lên form modal
function showCourseToFormUpdateModal(paramCourseId){
    var vCourseIndex = getIndexFormCourseId(paramCourseId);
    $("#edit-course-code").val(gCoursesDB.courses[vCourseIndex].courseCode);
    $("#edit-course-name").val(gCoursesDB.courses[vCourseIndex].courseName);
    $("#edit-course-image").val(gCoursesDB.courses[vCourseIndex].coverImage);
    $("#edit-price").val(gCoursesDB.courses[vCourseIndex].price);
    $("#edit-discount-price").val(gCoursesDB.courses[vCourseIndex].discountPrice);
    $("#edit-duration").val(gCoursesDB.courses[vCourseIndex].duration);
    $("#edit-level").val(gCoursesDB.courses[vCourseIndex].level);
    $("#edit-teacher-name").val(gCoursesDB.courses[vCourseIndex].teacherName);
    $("#edit-teacher-image").val(gCoursesDB.courses[vCourseIndex].teacherPhoto);
    $("#edit-is-popular").val(gCoursesDB.courses[vCourseIndex].isPopular);
    $("#edit-is-trending").val(gCoursesDB.courses[vCourseIndex].isTrending);
}
/* get course index from course id
// input: paramCourseId là courseId cần tìm index
/ output: trả về chỉ số (index) trong mảng course */
function getIndexFormCourseId(paramCourseId) {
    var vCourseIndex = -1;
    var vCourseFound = false;
    var vLoopIndex = 0;
    while(!vCourseFound && vLoopIndex < gCoursesDB.courses.length) {
        if(gCoursesDB.courses[vLoopIndex].id === paramCourseId) {
            vCourseIndex = vLoopIndex;
            vCourseFound = true;
        }
        else {
        vLoopIndex ++;
        }
    }
    return vCourseIndex;
}
