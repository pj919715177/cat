<?php
session_start();
if(isset($_SESSION['id']) && isset($_SESSION['email']) && isset($_SESSION['password']) && isset($_SESSION['checkStr']) && $_SESSION['checkStr'] == md5($_SESSION['id'].$_SESSION['password'])) {
	$json = ['code' => 1000, 'email' => $_SESSION['email']];
} else {
	$json = ['code' => 1001, 'message' => '对不起，您尚未登录！'];
}
echo json_encode($json);die;