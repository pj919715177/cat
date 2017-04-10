<?php
include_once('../class/database.php');

$database = database::getDatabase();

$id = $_POST['id'];
//$id = 1;
if($data = $database->getUser($id)) {
	$json = ['code' => 1000, 'data' => [
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