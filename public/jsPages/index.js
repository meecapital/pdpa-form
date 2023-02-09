
        function list_view_trt(guid) {

        /* หมุนๆๆๆๆ */
        $("#loader").html(`
            <div class="spinner-wrapper">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        `);
        /* หมุนๆๆๆๆ */

        $.ajax({
            cache: false,
            url: ApiUrl + "pdpa/list_view_trt",
            type: "POST",
            data: {guid:guid},
            headers: ApiHeaderNoJson,
            //cache: false,
            beforeSend: function(){
                var item_table = $('#item_table_view').DataTable();
                    item_table
                        .clear()
                        .draw(); //reset ข้อมูลในตาราง
                $("#myModal").modal("show");
                $(".dataTables_filter").css("float", "right");
                $(".dataTables_paginate").css("float", "right");
            },
            success: function (data) {

                /* ยกเลิกหมุนๆๆๆๆ */
                $("#loader").html(``);
                /* ยกเลิกหมุนๆๆๆๆ */

                Meedata = JSON.parse(data);
                Meedata = Meedata.recordset;

                $('#item_table_view').dataTable({
                    "destroy": true,
                    data: Meedata,
                    "responsive": true,
                    columns: [

                        {
                            render: function (data, type, row, meta) {
                                return row.createBy;
                            },
                            className: "text-center"
                        },
                        {
                            render: function (data, type, row, meta) {
                                return row.Emp_Name + " " + row.Emp_SurName;
                            },
                            className: "text-center"
                        },
                        {
                            render: function (data, type, row, meta) {
                                return row.createDateFormat;
                            },
                            className: "text-center"
                        },

                    ],
                    lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
                    pageLength: "20"
                });

            },
            error: function (data) {

                /* ยกเลิกหมุนๆๆๆๆ */
                $("#loader").html(``);
                /* ยกเลิกหมุนๆๆๆๆ */

                alert("พบข้อผิดพลาดในการโหลดข้อมูล");
                //location.reload();
            }, 
        });

        }

        function list() {

            /* หมุนๆๆๆๆ */
            $("#loader").html(`
                <div class="spinner-wrapper">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>
            `);
            /* หมุนๆๆๆๆ */

            $.ajax({
                cache: false,
                url: ApiUrl + "pdpa/list_pdpa_accept",
                type: "GET",
                data: "",
                headers: ApiHeaderNoJson,
                //cache: false,
                success: function (data) {

                    /* ยกเลิกหมุนๆๆๆๆ */
                    $("#loader").html(``);
                    /* ยกเลิกหมุนๆๆๆๆ */

                    Meedata = JSON.parse(data);
                    Meedata = Meedata.recordset;

                    var table = $('#item_table').dataTable({
                        "destroy": true,
                        data: Meedata,
                        "responsive": true,
                        columns: [

                            {
                                render: function (data, type, row, meta) {
                                    let status = "";
                                    let btn = "";
                                    if (row.status == "N") {
                                        status = "<center><span class='badge badge-success'>ปกติ</span></center>";
                                        btn = `<td>
                                                    <center>
                                                        <button title="ยกเลิกการยอมรับ" type="button" id="del` + meta.row + `" 
                                                                data-value="` + row.rowId + `"
                                                                class="btn btn-danger btn-sm removerowOk">
                                                                <i class="fas fa-trash"></i>
                                                        </button>

                                                        <button title="ประวัติการกดดู" type="button" id="viewTrt` + meta.row + `" 
                                                                data-value="` + row.pdpaTableGUID + `"
                                                                class="btn btn-warning btn-sm viewTrtOk">
                                                                <i class="fas fa-eye"></i>
                                                        </button>
                                                    </center>
                                                </td>

                                                `;


                                    } else {

                                        status = "<center><span class='badge badge-danger'>ยกเลิก</span></center>";
                                        btn = `<td>
                                                    <center>                                  
                                                        <button type="button" id="del` + meta.row + `" 
                                                                class="btn btn-danger btn-sm " disabled >
                                                                <i class="fas fa-trash"></i>
                                                        </button>
                                                    </center>
                                                </td>`;

                                    }
                                    return btn;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.fullname;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    var see = ``;
                                    if(row.tel){
                                        see = `<div style='display: inline-flex;' >
                                                    <a id='btnSee`+ row.rowId +`'
                                                        data-value='` + row.rowId + `'
                                                        data-tel='` + row.tel + `'
                                                        data-guid='` + row.pdpaTableGUID + `'
                                                            class='SeeTel' href='javascript:void(0);'>
                                                                <i title='ดูเบอร์โทร' class='fas fa-eye'>
                                                                </i>
                                                    </a>&nbsp;&nbsp; 
                                                                <div id='ShowTel` + row.rowId + `' >`
                                                                    +row.tel.substring(0, 2)+`X-XXX-XXX
                                                                </div>
                                                </div>`;
                                    }
                                    
                                    // return row.tel;
                                    return see;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.email;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.idCard;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.project;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.createDateFormat;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.updateDateFormat;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.updateBy;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    let status = "";
                                    let btn = "";
                                    if (row.status == "N") {
                                        status = "<center><span class='badge badge-success'>ปกติ</span></center>";
                                        btn = `<td>
                                                    <center>
                                                        <button type="button" id="del` + meta.row + `" 
                                                                data-value="` + row.rowId + `"
                                                                class="btn btn-danger btn-sm removerowOk">
                                                                <i class="fas fa-trash"></i>
                                                        </button>
                                                    </center>
                                                </td>`;


                                    } else {

                                        status = "<center><span class='badge badge-danger'>ยกเลิก</span></center>";
                                        btn = `<td>
                                                    <center>                                  
                                                        <button type="button" id="del` + meta.row + `" 
                                                                class="btn btn-danger btn-sm " disabled >
                                                                <i class="fas fa-trash"></i>
                                                        </button>
                                                    </center>
                                                </td>`;

                                    }
                                    return status;
                                },
                                className: "text-center"
                            },

                        ],
                        lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
                        "pageLength": 20
                    });

                    $(".dataTables_filter").css("float", "right");
                    $(".dataTables_paginate").css("float", "right");

                    listcancel();

                },
                error: function (data) {

                    /* ยกเลิกหมุนๆๆๆๆ */
                    $("#loader").html(``);
                    /* ยกเลิกหมุนๆๆๆๆ */

                    alert("พบข้อผิดพลาดในการโหลดข้อมูล");
                    //location.reload();
                },
            });

            //new $.fn.dataTable.FixedHeader( table );

        }

        function listcancel() {

            /* หมุนๆๆๆๆ */
            $("#loader").html(`
                <div class="spinner-wrapper">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>
            `);
            /* หมุนๆๆๆๆ */

            $.ajax({
                cache: false,
                url: ApiUrl + "pdpa/list_pdpa_not_accept",
                type: "GET",
                data: "",
                headers: ApiHeaderNoJson,
                //cache: false,
                success: function (data) {

                    /* ยกเลิกหมุนๆๆๆๆ */
                    $("#loader").html(``);
                    /* ยกเลิกหมุนๆๆๆๆ */

                    Meedata = JSON.parse(data);
                    Meedata = Meedata.recordset;

                    //show notification
                    var c = 0;
                    for(i = 0;i<Meedata.length;i++){
                        if(Meedata[i]["status"]=="N") {
                            c++; 
                            $("#notification1").html(c);
                        }
                    }

                    $('#item_table_cancel').dataTable({
                        "destroy": true,
                        data: Meedata,
                        "responsive": true,
                        columns: [

                            {
                                render: function (data, type, row, meta) {
                                    let status = "";
                                    let btn = "";
                                    if (row.status == "N") {
                                        status = "<center><span class='badge badge-warning'>รอการยกเลิก</span></center>";
                                        btn = `<td>
                                                    <center>
                                                        <button type="button" id="del` + meta.row + `" 
                                                                data-value="` + row.rowId + `"
                                                                class="btn btn-success btn-sm removerowNotOk">
                                                                <i class="fas fa-check"></i>
                                                        </button>
                                                    </center>
                                                </td>`;


                                                        } else {

                                                            status = "<center><span class='badge badge-success'>ยกเลิกแล้ว</span></center>";
                                                            btn = `<td>
                                                    <center>                                  
                                                        <button type="button" id="del` + meta.row + `" 
                                                                class="btn btn-success btn-sm " disabled >
                                                                <i class="fas fa-check"></i>
                                                        </button>
                                                    </center>
                                                </td>`;

                                                        }
                                    return btn;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.fullname;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.tel;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.email;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.createDateFormat;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.updateDateFormat;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.updateBy;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    let status = "";
                                    let btn = "";
                                    if (row.status == "N") {
                                        status = "<center><span class='badge badge-warning'>รอการยกเลิก</span></center>";
                                        btn = `<td>
                                                    <center>
                                                        <button type="button" id="del` + meta.row + `" 
                                                                data-value="` + row.rowId + `"
                                                                class="btn btn-success btn-sm removerowNotOk">
                                                                <i class="fas fa-check"></i>
                                                        </button>
                                                    </center>
                                                </td>`;


                                                        } else {

                                                            status = "<center><span class='badge badge-success'>ยกเลิกแล้ว</span></center>";
                                                            btn = `<td>
                                                    <center>                                  
                                                        <button type="button" id="del` + meta.row + `" 
                                                                class="btn btn-success btn-sm " disabled >
                                                                <i class="fas fa-check"></i>
                                                        </button>
                                                    </center>
                                                </td>`;

                                                        }
                                    return status;
                                },
                                className: "text-center"
                            },

                        ],
                        lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
                        pageLength: "20"
                    });

                    $(".dataTables_filter").css("float", "right");
                    $(".dataTables_paginate").css("float", "right");


                },
                error: function (data) {

                    /* ยกเลิกหมุนๆๆๆๆ */
                    $("#loader").html(``);
                    /* ยกเลิกหมุนๆๆๆๆ */

                    alert("พบข้อผิดพลาดในการโหลดข้อมูล");
                    //location.reload();
                },
            });
        }

        function listproblem() {

            /* หมุนๆๆๆๆ */
            $("#loader").html(`
                <div class="spinner-wrapper">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>
            `);
            /* หมุนๆๆๆๆ */

            $.ajax({
                cache: false,
                url: ApiUrl + "pdpa/list_pdpa_problem",
                type: "GET",
                data: "",
                headers: ApiHeaderNoJson,
                //cache: false,
                success: function (data) {

                    /* ยกเลิกหมุนๆๆๆๆ */
                    $("#loader").html(``);
                    /* ยกเลิกหมุนๆๆๆๆ */

                    Meedata = JSON.parse(data);
                    Meedata = Meedata.recordset;

                    //console.log(Meedata);

                    //show notification
                    var c = 0;
                    for(i = 0;i<Meedata.length;i++){
                        if(Meedata[i]["status"]=="N") {
                            c++;
                            $("#notification2").html(c);
                        }
                    }

                    $('#item_table_list_problem').dataTable({
                        "destroy": true,
                        data: Meedata,
                        "responsive": true,
                        columns: [

                            {
                                render: function (data, type, row, meta) {
                                    let status = "";
                                    let btn = "";
                                    if (row.status == "N") {
                                        status = "<center><span class='badge badge-warning'>รอการตรวจสอบ</span></center>";
                                        btn = `<td>
                                                    <center>
                                                        <button type="button" id="del` + meta.row + `" 
                                                                data-value="` + row.rowId + `"
                                                                class="btn btn-success btn-sm removerowProblemOk">
                                                                <i class="fas fa-check"></i>
                                                        </button>
                                                    </center>
                                                </td>`;


                                                        } else {

                                                            status = "<center><span class='badge badge-success'>ตรวจสอบแล้ว</span></center>";
                                                            btn = `<td>
                                                    <center>                                  
                                                        <button type="button" id="del` + meta.row + `" 
                                                                class="btn btn-success btn-sm " disabled >
                                                                <i class="fas fa-check"></i>
                                                        </button>
                                                    </center>
                                                </td>`;

                                                        }
                                    return btn;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.fullname;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.tel;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.remark;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.createDateFormat;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.updateDateFormat;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    return row.updateBy;
                                },
                                className: "text-center"
                            },
                            {
                                render: function (data, type, row, meta) {
                                    let status = "";
                                    if (row.status == "N") {
                                        status = "<center><span class='badge badge-warning'>รอการตรวจสอบ</span></center>";
                                    } else {
                                        status = "<center><span class='badge badge-success'>ตรวจสอบแล้ว</span></center>";
                                    }
                                    return status;
                                },
                                className: "text-center"
                            },

                        ],
                        lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
                        pageLength: "20"
                    });

                    $(".dataTables_filter").css("float", "right");
                    $(".dataTables_paginate").css("float", "right");


                },
                error: function (data) {

                    /* ยกเลิกหมุนๆๆๆๆ */
                    $("#loader").html(``);
                    /* ยกเลิกหมุนๆๆๆๆ */

                    alert("พบข้อผิดพลาดในการโหลดข้อมูล");
                    //location.reload();
                },
            });
        }

        function list_report() {

    $.ajax({
    cache: false,
    url: ApiUrl + "pdpa/list_pdpa_report",
    type: "GET",
    data: "",
    headers: ApiHeaderNoJson,
    //cache: false,
    success: function (data) {

        Meedata = JSON.parse(data);
        Meedata = Meedata.recordset;

        //console.log(Meedata);

        $('#item_table_report').dataTable({
            "destroy": true,
            data: Meedata,
            "responsive": true,
            columns: [

                {
                    render: function (data, type, row, meta) {
                        return row.project;
                    },
                    className: "text-center"
                },
                {
                    render: function (data, type, row, meta) {
                        return row.cus_count;
                    },
                    className: "text-center"
                },
                {
                    render: function (data, type, row, meta) {
                        return row.cus_count_yes;
                    },
                    className: "text-center"
                },
                {
                    render: function (data, type, row, meta) {
                        return row.cus_count_no;
                    },
                    className: "text-center"
                },
            ],
            lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
            pageLength: "20"
        });

        $(".dataTables_filter").css("float", "right");
        $(".dataTables_paginate").css("float", "right");


    },
    error: function (data) {

        /* ยกเลิกหมุนๆๆๆๆ */
        $("#loader").html(``);
        /* ยกเลิกหมุนๆๆๆๆ */

        alert("พบข้อผิดพลาดในการโหลดข้อมูล");
        //location.reload();
    },
});

        }

        $(document).ready(function () {

            $("#show_emp_username").html(localStorage["username"]);
            $("#show_emp_name").html(localStorage["firstname"] + " " + localStorage["lastname"]);

            $('#item_table').DataTable({
                "lengthMenu": [15, 50, 100],    
                "pageLength": 15,
                "columnDefs": [
                    { "type": "num", "targets": 1 }
                ],
            }).order([[1, 'desc']]);

            list();
            listcancel();
            list_report();
            listproblem();

            //กดปุ่มลบ
            $(document).on("click", ".removerowOk", function () {

                let rowId = $(this).data("value"); //ดึงรหัสรถมา
                if (confirm("ยืนยัน ??")) {

                    $(this).prop('disabled', true);

                    $.ajax({
                        url: ApiUrl + "pdpa/cancel",
                        type: "POST",
                        data:
                        {
                            "rowId": rowId,
                            "username": localStorage["username"]
                        },
                        headers: ApiHeaderNoJson,
                        cache: false,
                        success: function (data) {

                            alert("ยกเลิกข้อมูลเรียบร้อย");
                            // var table = $('#item_table').DataTable();
                            // table
                            //     .clear()
                            //     .draw();
                            // list();

                        },
                        error: function (data) {

                            alert("พบข้อผิดพลาดในการโหลดข้อมูล");
                            //location.reload();
                        },
                    });

                }

            });


            //กดปุ่มลบ
            $(document).on("click", ".removerowNotOk", function () {

                let rowId = $(this).data("value"); //ดึงรหัสรถมา
                if (confirm("ยืนยัน ??")) {

                    $.ajax({
                        url: ApiUrl + "pdpa/cancel_cancel",
                        type: "POST",
                        data: {
                            "rowId": rowId,
                            "username": localStorage["username"]
                        },
                        headers: ApiHeaderNoJson,
                        cache: false,
                        success: function (data) {

                            alert("บันทึกข้อมูลเรียบร้อย");
                            var table = $('#item_table_cancel').DataTable();
                            table
                                .clear()
                                .draw();
                            listcancel();

                        },
                        error: function (data) {

                            alert("พบข้อผิดพลาดในการโหลดข้อมูล");
                            //location.reload();
                        },
                    });

                }

            });

            //กดปุ่มลบ
            $(document).on("click", ".removerowProblemOk", function () {

                let rowId = $(this).data("value"); //ดึงรหัสรถมา
                if (confirm("ยืนยัน ??")) {

                    $.ajax({
                        url: ApiUrl + "pdpa/cancel_cancel",
                        type: "POST",
                        data: {
                            "rowId": rowId,
                            "username": localStorage["username"]
                        },
                        headers: ApiHeaderNoJson,
                        cache: false,
                        success: function (data) {

                            alert("บันทึกข้อมูลเรียบร้อย");
                            var table = $('#item_table_list_problem').DataTable();
                            table
                                .clear()
                                .draw();
                            listproblem();

                        },
                        error: function (data) {

                            alert("พบข้อผิดพลาดในการโหลดข้อมูล");
                            //location.reload();
                        },
                    });

                }

            });

            $(document).on("click", ".nav-link", function () {

                $(".dataTables_filter").css("float", "right");
                $(".dataTables_paginate").css("float", "right");

            });

            $(document).on("click", ".viewTrtOk", function () {

                var value = $(this).data("value");
                list_view_trt(value);

            });

            

            $(document).on("click", ".SeeTel", function () {

                var value = $(this).data("value");
                var tel = $(this).data("tel");
                var guid = $(this).data("guid");

                $.ajax({
                    url: ApiUrl + "pdpa/pdpa_view_trt",
                    type: "POST",
                    data: {
                        "guid": guid,
                        "username": localStorage["username"]
                    },
                    headers: ApiHeaderNoJson,
                    cache: false,
                    success: function (data) {

                        $("#ShowTel"+value).html(tel);
                        $("#btnSee"+value).addClass("d-none");
                    },
                    error: function (data) {
                    },
                });

            });

        });