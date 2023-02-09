    $.getJSON("https://api.ipify.org?format=json", function (data) {    

        var ip = data.ip;
        //var pagename = "index";
        var arr_count = {
            "ip":ip,
            "pages":pagename,
            "project": "car-back"
        }

        $.ajax({
            url: "https://api.meecapital.co.th/visitlog/count",
            type: "POST",
            data: JSON.stringify(arr_count),
            headers: { 
                "token":"MEE@##CAPSKDLFSSDFL@SLSLSO@!SLSADDDWWEEWREWDS252ASSEREWDSFSFSDFDSFS",      //token ไว้ป้องกันถ้า token ผิด จะเรียก api ไม่ได้
                "Content-Type": "application/json",        //ประเภท Content
                "username": "sa"
            },
            //cache: false,
            success: function (data) {
                //console(data);
            },
            error: function (data) {
                //console.log(data);
            },
        });

    });

    
