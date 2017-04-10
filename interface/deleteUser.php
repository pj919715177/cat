<?php
include_once('../class/database.php');

$database = database::getDatabase();

$id = $_POST['id'];
//$id = 2;
if($database->deleteUser($id)) {
	$json = ['code' => 1000, 'message' => '删除用户成功！'];
} else {
	$json = ['code' => 1001, 'message' => '删除用户失败！'];
}
echo json_encode($json);die;