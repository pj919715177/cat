<?php
include_once('../class/database.php');

$database = database::getDatabase();

$email = $_POST['email'];
$password = md5($_POST['password']);

if($id = $database->checkUser($email, $password)) {
	session_start();
	$_SESSION['id'] = $id;
	$_SESSION['email'] = $email;
	$_SESSION['password'] = $password;
	$_SESSION['checkStr'] = md5($id.$password);
	$json = ['code' => 1000, 'data' => '登录成功！'];
} else {
	$json = ['code' => 1001, 'message' => '用户名或密码错误！'];
}
echo json_encode($json);die;