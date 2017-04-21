<?php
include_once('../class/database.php');

$database = database::getDatabase();

// $id = $_POST['id'];
$email = $_POST['email'];
$oldpassword = md5($_POST['oldpassword']);
$newpassword = md5($_POST['newpassword']);

if($id = $database->checkUser($email, $oldpassword)) {
	if($sql = $database->editPassword($id[0], $newpassword)){
		$json = ['code' => 1000, 'data' => '修改密码成功！'];
	}else{
		$json = ['code' => 1001, 'data' => '修改密码失败！'];
	}
} else {
	$json = ['code' => 1002, 'message' => '旧密码填写错误！'];
}

echo json_encode($json);die;