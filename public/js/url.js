/* URL ไว้ยิง API */
var ApiUrl = "https://api03.meecapital.co.th/"; //ยิง api ทั้งหมด
var ApiUrl02 = "https://api02.meecapital.co.th/"; //ยิง api ทั้งหมด
//var testUrl = "http://localhost:45072/"; //ยิง api ทั้งหมด
var ApiUrlLogin = "https://meeconnect.meecapital.co.th/page/home/Auth.aspx"; //ใช้ตอน log-in

var ApiHeaderNoJson = { //header แบบมีส่ง json
    //"Content-Type": "application/json",
    "keys": "MEECAPSKDLFSSDFL@SLSLSO@!S@LSDFIWEOR023895SD6"
};

var ApiHeaderWithJson = { //header แบบมีส่ง json
    "keys": "MEECAPSKDLFSSDFL@SLSLSO@!S@LSDFIWEOR023895SD6",
    "Content-Type": "application/json"
};

var ApiHeaderWithJson02 = { //header แบบมีส่ง json
    "token": "MEECAPSKDLFSSDFL@SLSLSO@!SLSADDDWWEEWREWDS252ASSEREWDSFSFSDFDSFS",
    "username": "SA",
    "Content-Type": "application/json"
};
