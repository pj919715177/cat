<?php
// unset($_SESSION['id']);
// unset($_SESSION['email']);
// unset($_SESSION['password']);
// unset($_SESSION['checkStr']);
	session_start();

session_unset('id');
session_unset('email');
session_unset('password');
session_unset('checkStr');
$json = ['code' => 1000, 'message' => '退出成功！'];
echo json_encode($json);die;