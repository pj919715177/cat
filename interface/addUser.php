<?php
include_once('../class/database.php');

$database = database::getDatabase();

$nickname = $_POST['nickname'];
$email = $_POST['email'];
$password = md5($_POST['password']);
$imgUrl = $_POST['imgUrl'];
$signature = $_POST['signature'];
$createTime = time();
if($database->addUser($nickname, $email, $password, $imgUrl, $signature, $createTime)) {
	$json = ['code' => 1000, 'message' => '添加用户成功！'];
} else {
	$json = ['code' => 1001, 'message' => '添加用户失败！'];
}
echo json_encode($json);die;