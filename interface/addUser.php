<?php
include_once('../class/database.php');

$database = database::getDatabase();
//上传头像
$path = '../file/';

// if(isset($_POST['file'])) {
// 	$uploadFile = $_POST['file']['name'].time();
// 	$name = $_POST['file']['name'];
// 	if(move_uploaded_file($uploadFile, $path.$name)) {
// 		$json = ['code' => 1000, 'message' => '上传成功，路径为：'.$path.$name];
// 	} else {
// 		$json = ['code' => 1000, 'message' => '上传失败！'.$name];
// 	}
// }

$nickname = $_POST['nickname'];
$email = $_POST['email'];
$password = md5($_POST['password']);
$signature = $_POST['signature'];
$registHeadImgUrl = $_POST['registHeadImgUrl'];
$createTime = time();
if($database->addUser($nickname, $email, $password, $registHeadImgUrl, $signature, $createTime)) {
	$json = ['code' => 1000, 'message' => '添加用户成功！'];
} else {
	$json = ['code' => 1001, 'message' => '添加用户失败！'];
}
echo json_encode($json);die;



