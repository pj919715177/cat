<?php
include_once('../class/database.php');

$database = database::getDatabase();
//上传头像
$path = '../file/';
if(isset($_FILES['file'])) {
	$uploadFile = $_FILES['file']['tmp_name'];
	$name = $_FILES['file']['name'];
	if(move_uploaded_file($uploadFile, $path.$name)) {
		$json = ['code' => 1000, 'message' => '上传成功，路径为：'.$path.$name];
	} else {
		$json = ['code' => 1000, 'message' => '上传失败！'.$name];
	}
}

$id = $_POST['id'];
$nickname = $_POST['nickname'];
$email = $_POST['email'];
$password = md5($_POST['password']);
$signature = $_POST['signature'];
if($database->editUser($id, $nickname, $email, $password, $path.$name, $signature)) {
	$json = ['code' => 1000, 'message' => '修改用户成功！'];
} else {
	$json = ['code' => 1001, 'message' => '修改用户失败！'];
}
echo json_encode($json);die;