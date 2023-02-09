

        $(document).ready(function () {

            //alert(ApiUrl)
            

            $("input,textarea").jqBootstrapValidation({
                preventSubmit: true,
                submitError: function ($form, event, errors) {
                    // additional error messages or events

                    //select_validation();

                },
                submitSuccess: function ($form, event) {

                    $('#success').html("");

                    event.preventDefault();

                     var fd = new FormData();    
                     fd.append( 'txtUsername', $("#susername").val() );
                     fd.append( 'txtPassword', $("#spassword").val() );

                    $.ajax({
                        url: ApiUrlLogin,
                        type: "POST",
                        processData: false,
                        contentType: false,
                        data: fd,
                        // headers: {
                        //     "types": "getusermeeconnect",
                        //     "Content-Type": "application/json"
                        // },
                        cache: false,
                        success: function (data) {

                            var jsonData = JSON.parse(data);

                            if(jsonData[0].status == "ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง"){
                                $('#success').html("<div class='alert alert-danger'>");
                                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                                $('#success > .alert-danger').append("<strong>ไม่พบ username หรือ password ในระบบ");
                                $('#success > .alert-danger').append('</div>');
                            }else{
                                //var jsonData = JSON.parse(data);
                                //console.log(jsonData);
                                localStorage["username"] = jsonData[0].username;
                                localStorage["branch"] = jsonData[0].ORG;
                                localStorage["token"] = "MEE@##CAPSKDLFSSDFL@SLSLSO@!SLSADDDWWEEWREWDS252ASSEREWDSFSFSDFDSFS";
                                localStorage["firstname"] = jsonData[0].firstname;
                                localStorage["lastname"] = jsonData[0].lastname;
                                //alert(localStorage["username"]);
                                location.replace("index.html");
                            }

                        },
                        error: function (data) {

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
                    })
                },
                filter: function () {
                    return $(this).is(":visible");
                },
            });
        });

 