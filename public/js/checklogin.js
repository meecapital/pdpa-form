var username = localStorage["username"];
//console.log(username);
if(!username){
    alert("โปรดเข้าสู่ระบบใหม่อีกครั้ง");
    location.replace("sign-in.html");
}