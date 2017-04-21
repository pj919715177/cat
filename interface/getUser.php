<?php
include_once('../class/database.php');

$database = database::getDatabase();

$email = $_POST['email'];
//$id = 1;
if($data = $database->getUserByEmail($email)) {
	$json = ['code' => 1000, 'data' => [
		'id' => $data['id'],
		'nickname' => $data['nickname'],
		'email' => $data['email'],
		'password' => $data['password'],
		'imgUrl' => $data['imgUrl'],
		'signature' => $data['signature'],
		'createTime' => $data['createTime'],
	]];
} else {
	$json = ['code' => 1001, 'message' => '用户不存在！'];
}
echo json_encode($json);die;