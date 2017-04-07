<?php
include_once('../class/database.php');

$database = database::getDatabase();

$email = $_POST['email'];
$password = md5($_POST['password']);

if($database->checkUser($email, $password)) {
	session_start();
	$_SESSION['email'] = $email;
	$_SESSION['password'] = $password;
	$_SESSION['checkStr'] = md5($email.$password);
	$json = ['code' => 1000, 'message' => '登录成功！'];
} else {
	$json = ['code' => 1001, 'message' => '用户名或密码错误！'];
}