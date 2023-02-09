function money_format(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function money_unformat(nStr) {
    if (!nStr) {
        nStr = "";
    }
    //var noCommas = nStr.replace(/,/g, '')
    //var noCommas = nStr.replace(/[^\d.-]/g, ''); //เอาเฉพาะ 50.00-
    var noCommas = nStr.toString().replace(/[^\d.]/g, ''); //เอาเฉพาะ 50.00
    return noCommas;
}

function getfueltype(res) {

    $.ajax({
        cache: false,
        url: ApiUrl + "parameter/fuel",
        type: "POST",
        data: "",
        headers: ApiHeaderNoJson,
        cache: false,
        success: function (data) {
            //console.log(data)

            Meedata = data;
            for (var i = 0; i < Meedata.length; i++) {

                $('#fuel').append("<option value='" + Meedata[i].fNameEN + "'>" + Meedata[i].fNameTH + "</option>");

                if(i == Meedata.length - 1){
                    res();
                }

            }


        },
        error: function (data) {

            alert("พบข้อผิดพลาดในการโหลดข้อมูล");
            //location.reload();
        },
    });
}

function getbrand(res) {

    $.ajax({
        cache: false,
        url: ApiUrl + "parameter/brand",
        type: "POST",
        data: "",
        headers: ApiHeaderNoJson,
        cache: false,
        success: function (data) {
            //console.log(data)

            Meedata = data;
            for (var i = 0; i < Meedata.length; i++) {
                $('#carBrand').append("<option value='" + Meedata[i].brandEN + "'>" + Meedata[i].brandEN + "</option>");

                if(i == Meedata.length - 1){
                    res();
                }

            }


        },
        error: function (data) {

            alert("พบข้อผิดพลาดในการโหลดข้อมูล");
            //location.reload();
        },
    });
}

function getbranch(res) {

    $.ajax({
        cache: false,
        url: ApiUrl + "parameter/branch",
        type: "POST",
        data: "",
        headers: ApiHeaderNoJson,
        cache: false,
        success: function (data) {
            //console.log(data)

            Meedata = data;
            for (var i = 0; i < Meedata.length; i++) {
                $('#branch').append("<option value='" + Meedata[i].branchId + "'>" + Meedata[i].branchName + "</option>");

                if(i == Meedata.length - 1){
                    res();
                }

            }


        },
        error: function (data) {

            alert("พบข้อผิดพลาดในการโหลดข้อมูล");
            //location.reload();
        },
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

$(document).on('change', 'input[type=date]', function () {
    let value = $(this).val();
    let yearValue = parseInt(value.substring(0, 4));
    if (yearValue > 2450) {
        let newYear = yearValue - 543;
        let newDate = "" + newYear + "" + value.substring(4, 20);
        $(this).val(newDate);
    }
    //alert(value);
});

