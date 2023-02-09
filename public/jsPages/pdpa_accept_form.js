
        //Get the button
        var mybutton = document.getElementById("myBtn");

        // When the user clicks on the button, scroll to the top of the document
        function topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        $(document).ready(function () {

            var typeProject = getUrlParameter('xxx');

            $("input,textarea").jqBootstrapValidation({
                preventSubmit: true,
                submitError: function ($form, event, errors) {
                    // additional error messages or events

                    //select_validation();

                },
                submitSuccess: function ($form, event) {

                    //alert("k");

                    $('#success').html("");

                    event.preventDefault(); // prevent default submit behaviour
                    // get values from FORM 
                    var	txt_name = $('#txt_name').val();
                    var	txt_tel	= $('#txt_tel').val();
                    var	txt_email = $('#txt_email').val();

                    var data = {
                        project : typeProject,
                        fullname : txt_name,
                        idCard : "",
                        tel : txt_tel,
                        email : txt_email,
                        acceptance : "N",
                        status : "N"
                    };

                    //console.log(data);

                    $.ajax({
                        url: ApiUrl+"pdpa/add",
                        type: "POST",
                        data: data,
                        headers: ApiHeaderNoJson,
                        cache: false,
                        success: function (data) {

                            // Success message
                            $('#success').html("<div class='alert alert-success'>");
                            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-success')
                                .append("<strong>บันทึกข้อมูลเรียบร้อย</strong>");
                            $('#success > .alert-success')
                                .append('</div>');

                            //clear all fields
                            //$('#contactForm').trigger("reset");

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

        //$(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );
        
        $("#chkOk").change(function(){ 

            var chk = $(this).is(':checked');
            if(chk){
                $("#btnOK").prop("disabled",false);
            }else{
                $("#btnOK").prop("disabled",true);
            }

        });

        $("#readCondition").click(function(){ 

            window.open("pdpa_read_condition.html");

        });

        var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        };
