 <?php // require($_SERVER['DOCUMENT_ROOT'] . "../phpmailer/PHPMailerAutoload.php"); ?> 

<?php require($_SERVER['DOCUMENT_ROOT'] . "/meecredit-theme/meecredit-theme/phpmailer/PHPMailerAutoload.php"); ?>
<?php

$name = $_POST['name'];
$company = $_POST['company'];
$phoneline = $_POST['phoneline'];
$product = $_POST['product'];

header('Content-Type: text/html; charset=utf-8');

$mail = new PHPMailer;
$mail->CharSet = "utf-8";
$mail->isSMTP();

//$mail->Host = 'smtp.gmail.com';

//$mail->SMTPAuth = TRUE;
//$mail->SMTPSecure =  'tls';
//$mail->Port = 465;

 
//$mail-> SMTPAutoTLS = false;


$mail->Host = 'mail.meecapital.co.th';
$mail->Port = 25;
$mail->SMTPSecure = false;
$mail->SMTPAuth = true;

$mail_username = "info@meecapital.co.th"; // mail ที่ใช้ส่ง
$mail_password = "Mee@1234"; // รหัสผ่าน mail

//$mail_username = "smtpforwpmt@gmail.com"; // mail ที่ใช้ส่ง
//$mail_password = "Mena@1234"; // รหัสผ่าน mail
// ตั้งค่าอนุญาตการใช้งานได้ที่นี่ https://myaccount.google.com/lesssecureapps?pli=1


$sender = "Mee Credit"; // ชื่อผู้ส่ง
$email_sender = "info@meecapital.co.th"; // เมล์ผู้ส่ง 
//$email_sender = "smtpforwpmt@gmail.com"; 

//$email_receiver = "sabaipon.p@menatransport.co.th"; // เมล์ผู้รับ ***
//$email_receiver = "smtpforwpmt@gmail.com"; // เมล์ผู้รับ ***
$email_receiver = "carsanovar@hotmail.com";

$subject = "Mee Credit แจ้งมีผู้สนใจสินเชื่อ "; // หัวข้อเมล์

$mail->Username = $mail_username;
$mail->Password = $mail_password;
$mail->setFrom($email_sender, $sender);
$mail->addAddress($email_receiver);
$mail->Subject = $subject;

$email_content = "
เรียน ฝ่ายขาย <br><br>

ขอแจ้งมีผู้สนใจสินเชื่อของทาง Mee Credit โดยมีข้อมูลดังต่อไปนี้<br><br>

ชื่อ: ".$name."<br>
             บริษัท: ".$company."<br>
             เบอร์โทรศัพท์/ไลน์ไอดี: ".$phoneline."<br>
			 สินค้าที่สนใจ: ".$product."<br><br>
			 
 จึงเรียนมาเพื่อทราบ

";

//  ถ้ามี email ผู้รับ
if ($email_receiver) {
	$mail->msgHTML($email_content);


	if (!$mail->send()) {  // สั่งให้ส่ง email

		// กรณีส่ง email ไม่สำเร็จ
		//echo "<h3 class='text-center'>ระบบมีปัญหา กรุณาลองใหม่อีกครั้ง</h3>";
		echo $mail->ErrorInfo; // ข้อความ รายละเอียดการ error
	} else {
		// กรณีส่ง email สำเร็จ
		echo "ok";
	}
}
//$id = $_REQUEST['id'];
//echo '<script>  location.replace("https://menatransport.co.th/jobs/print.php?id='.$id.'");</script>';

	

?>