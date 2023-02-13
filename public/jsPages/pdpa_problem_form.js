 
        //Get the button
        var mybutton = document.getElementById("myBtn");
        //ประกาศ array global
        var arr_files = [];
        // When the user clicks on the button, scroll to the top of the document
        function topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        //เมื่อเลือก radio คำนำหน้า
        $('input[type=radio][name=prefix]').change(function() {

            //เปิด input อื่นๆ
            if (this.value == 'อื่นๆ') {
                $("#txt_other_prefix").get(0).type = 'text';
            }
            //ปิด input อื่นๆ
            else {
                $("#txt_other_prefix").get(0).type = 'hidden';
            }

        });

        $("#drdw_type").change(function(){
            let val = $(this).val();
            //console.warn(val);
            if(val == 0){
                $("#hide_input3").addClass("d-none");
                $("#hide_input1").addClass("d-none");
                $("#hide_input2").removeClass("d-none");
                $("#drdw_type_remark").prop("required" , false);
                $("#drdw_type_loan").prop("required" , false);
                $("#txt_type_remark").prop("required" , true);
            }else{
                $("#hide_input1").removeClass("d-none");
                $("#hide_input3").removeClass("d-none");
                $("#hide_input2").addClass("d-none");
                $("#drdw_type_remark").prop("required" , true);
                $("#drdw_type_loan").prop("required" , true);
                $("#txt_type_remark").prop("required" , false);
            }
            
        });

        $(document).ready(function () {

            $("input,textarea").jqBootstrapValidation({
                preventSubmit: true,
                submitError: function ($form, event, errors) {
                    // additional error messages or events

                    //select_validation();

                },
                submitSuccess: function ($form, event) {

                    $('#success').html("");

                    event.preventDefault(); // prevent default submit behaviour

                    //load btn
                    loadingBtn();

                    //ส่งข้อมูล
                    request_problem();
                },
                filter: function () {
                    return $(this).is(":visible");
                },
            });

        });

        //กดอ่านข้อตกลง
        $("#readCondition").click(function(){ 

            // window.open("pdpa_read_condition.html");
            window.open("https://www.meecapital.co.th/wp-content/uploads/2021/10/%E0%B8%99%E0%B9%82%E0%B8%A2%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%B8%E0%B9%89%E0%B8%A1%E0%B8%84%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5_.pdf");

        });

        //เมื่อ upload file
        $("#txt_upload").change(function(e){
            //เมื่อ upload file
            upload_files(e);
        });

        //ล้างข้อมูล upload
        function clear_upload(){

            //clear ข้อมูล upload
            $("#txt_upload").val("");
            //ซ่อนพื้นที่ upload
            //$("#div_showfiles").addClass("d-none");
            $("#div_showfiles").css("display", "none");
            //ล้าง html showfile
            $("#showfiles").html("");
            //ล้างข้อมูล arr_files
            arr_files = [];

        }

        //เมื่อ upload file
        function upload_files(e) {

            checkFileLenght(e, (res)=>{

                //ถ้ามีขนาดเกิน
                if(res){

                    alert("ขนาดไฟล์รวมต้องมีขนาดไม่เกิน 24 mb");
                    clear_upload();

                }else{

                    //ล้างข้อมูล arr_files
                    arr_files = [];

                    //ล้าง html showfile
                    $("#showfiles").html("");

                    //โชว์ไฟล์
                    //$("#div_showfiles").removeClass("d-none");
                    $("#div_showfiles").css("display", "");

                    let files = e.target.files;

                    if (files) {

                        //อ่านไฟล์ upload
                        readFiles(files);

                    }
                }
            });

          }
         
          function readFiles(files){
            for (let file of files) {
                let reader = new FileReader();
                //console.log(file);
                reader.onload = (ev) => {
                let base64String = ev.target.result.replace('data:', '').replace(/^.+,/, '');
                var data =  {   // encoded string as an attachment
                    filename: file.name,
                    content: base64String,
                    encoding: 'base64'
                }

                arr_files.push(data);

                }
                reader.readAsDataURL(file);

                $("#showfiles").append(`
                    <div style="text-align: center;" class="col-md-3 clear_upload">
                        <img  width="60" 
                        src="https://meeconnect.meecapital.co.th/page/img/Filetype-Docs-icon.png" />
                        <p>${file.name}</p>
                    </div>
                `);
              }
          }

          //ตรวจสอบขนาดไฟล์ upload
          function checkFileLenght(e, res){

            let countSize = 0;

            let files = e.target.files;
            var keys = Object.keys(files);

            keys.forEach( function(key) {
                var values = files[key]
                let size = values.size;
                countSize = countSize + size;
            });

            //ขนาดมากสุด
            let maxBytes = 25165824;

            //ประกาศ false
            let isMax = false;

            //ถ้าเกิน
            if(countSize > maxBytes){
                isMax = true;
            }

            return res(isMax);

          }

        //ส่งข้อมูล
        function request_problem(){
            // get values from FORM 
            var	txt_name = $('#txt_name').val();
            var rd_prefix = $('input[name=prefix]:checked', '#contactForm').val();
            var	txt_tel	= $('#txt_tel').val();
            var	txt_remark = $('#txt_remark').val();
            var	txt_email = $('#txt_email').val();
            var	txt_idcard = $('#txt_idcard').val();
            var txt_line_id = $('#txt_line_id').val();

            var drdw_type = $('#drdw_type').val();
            var txt_section = "";
            if(drdw_type == 0){ 
                txt_section = $('#txt_type_remark').val();
            }else{
                txt_section = $('#drdw_type_loan').val() + "( " + $('#drdw_type_remark').val() + " )";
            }
            
            if(rd_prefix == "อื่นๆ"){
                rd_prefix = $("#txt_other_prefix").val()
            }

            //คำนำหน้า + ชื่อจริง - นามสกุล
            var fullname = rd_prefix + txt_name;

            var MeeData = {
                project : "",
                fullname : fullname,
                idCard : txt_idcard,
                tel : txt_tel,
                email : txt_email,
                lineId : txt_line_id,
                remark : txt_remark,
                acceptance : "R",
                status : "N",
                arr_files: arr_files,
                txt_section: txt_section,
            };

            console.log(MeeData);

            //return;

            $.ajax({
                url: ApiUrl+"pdpa/request_problem",
                //url: "http://localhost:45072/pdpa/request_problem",
                type: "POST",
                data: MeeData,
                headers: ApiHeaderNoJson,
                cache: false,
                success: function (data) {

                    send_mail(MeeData,(res)=>{

                        //ปิด loading
                        nomalBtn();

                        if(res.status == "success"){

                            // Success message
                            $('#success').html("<div class='alert alert-success'>");
                            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-success')
                                .append("<strong>บันทึกข้อมูลสำเร็จ, ทางบริษัทจะดำเนินการตรวจสอบโดยเร็วที่สุด</strong>");
                            $('#success > .alert-success')
                                .append('</div>');

                            //clear all fields
                            $('#contactForm').trigger("reset");
                            $("#txt_other_prefix").get(0).type = 'hidden';
                            clear_upload();

                        }else{

                            // Fail message
                            $('#success').html("<div class='alert alert-danger'>");
                            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-danger').append("<strong>เกิดข้อผิดพลาด, โปรดลองดำเนินการใหม่");
                            $('#success > .alert-danger').append('</div>');
                            //clear all fields
                            //$('#contactForm').trigger("reset");

                        }

                    });

                },
                error: function (data) {
                    
                    //ปิด loading
                    nomalBtn();

                    //console.log(data);

                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>เกิดข้อผิดพลาด, โปรดลองดำเนินการใหม่");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    //$('#contactForm').trigger("reset");
                },
            });
        }

        function send_mail(MeeData, res){
            //console.warn(MeeData);

            $.ajax({
                url: ApiUrl02 + "email/send_pdpa_problem_form",
                //url: "http://localhost:45072/email/send_pdpa_problem_form",
                type: "POST",
                data: JSON.stringify(MeeData),
                headers: ApiHeaderWithJson02,
                cache: false,
                success: function (data) {
                    res(data);
                },
                error: function (data) {

                    //ปิด loading
                    nomalBtn();

                    //console.log(data);

                    res(data);

                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>เกิดข้อผิดพลาด, โปรดลองดำเนินการใหม่");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    //$('#contactForm').trigger("reset");
                },
            });
        }

        function nomalBtn(){
            //custom loaing btn 
            $("#btnOK").prop('disabled', false);
            $("#i-loaing").addClass("d-none");
            $("#btn_txt1").removeClass("d-none");
            $("#btn_txt2").addClass("d-none");
        }

        function loadingBtn(){
            //custom loaing btn 
            $("#btnOK").prop('disabled', true);
            $("#i-loaing").removeClass("d-none");
            $("#btn_txt1").addClass("d-none");
            $("#btn_txt2").removeClass("d-none");
        }

