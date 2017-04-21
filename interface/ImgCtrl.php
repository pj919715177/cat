<?php
/************************

********************************/
include_once('../class/database.php');
include_once('./function.php');
include_once("../class/mysql.php");
$database = database::getDatabase();

switch($_GET['opt']){
	case 'addToSpare':
		$fileName = $_POST['fileName'];
	  	$path = "../file/spare/";
	  	$nowTime = date('Y_m_d_H_i_s_');
		$uploadFile = $_FILES[$fileName]['tmp_name'];
		$name = $_FILES[$fileName]['name'];
		$name = substr($name,strrpos($name,'.'));
		if(move_uploaded_file($uploadFile, $path.$nowTime.$name)) {
			$json = ['re' => 0, 'data' => $nowTime.$name];
		} else {
			$json = ['re' => 1, 'data' => '上传失败！'];
		}
		echo json_encode($json);
		exit;
		break;
	case 'changeToActivity':
		$oldFile = "../file/spare/";
		$newFile = "../file/activity/";
		$fileName = $_POST['fileName'];
  		$urlList = explode(',',$fileName);
  		$ret['data'] = '';
  		foreach ($urlList as $oneurl) {
			if(file_exists($oldFile.$oneurl)&&!file_exists($newFile.$oneurl)){
  				copy($oldFile.$oneurl,$newFile.$oneurl);
				unlink($oldFile.$oneurl);
				$ret['re'] = 0;
				$ret['data'] = $ret['data'].",./file/activity/".$oneurl;
			}else{
				$ret['re'] = 1;
				$ret['data'] = '目标不存在或目的地址已存在';
			}
  		}
  		$ret['data'] = substr($ret['data'],1);
  		echo json_encode($ret);
  		exit;
  		break;
	case 'changeToUser':
		$oldFile = "../file/spare/";
		$newFile = "../file/user/";
		$fileName = $_POST['fileName'];
		if(file_exists($oldFile.$fileName)&&!file_exists($newFile.$fileName)){
  			copy($oldFile.$fileName,$newFile.$fileName);
			unlink($oldFile.$fileName);
			$ret['re'] = 0;
			$ret['data'] = "./file/user/".$fileName;
		}else{
			$ret['re'] = 1;
			$ret['data'] = '目标不存在或目的地址已存在';
		}
  		echo json_encode($ret);
  		exit;
  		break;
	case 'changeToCat':
		$oldFile = "../file/spare/";
		$newFile = "../file/cat/";
		$fileName = $_POST['fileName'];
  		$urlList = explode(',',$fileName);
  		$ret['data'] = '';
  		foreach ($urlList as $oneurl) {
			if(file_exists($oldFile.$oneurl)&&!file_exists($newFile.$oneurl)){
  				copy($oldFile.$oneurl,$newFile.$oneurl);
				unlink($oldFile.$oneurl);
				$ret['re'] = 0;
				$ret['data'] = $ret['data'].",./file/cat/".$oneurl;
			}else{
				$ret['re'] = 1;
				$ret['data'] = '目标不存在或目的地址已存在';
			}
  		}
  		$ret['data'] = substr($ret['data'],1);
  		echo json_encode($ret);
  		exit;
  		break;
  	case 'del':
  		$delFile = $_POST['delFile'];
  		$delFile = '.'.$delFile;
  		if(file_exists($delFile)){
			unlink($delFile);
			$ret['re'] = 0;
			$ret['data'] = "已经删除目标文件";
		}else{
			$ret['re'] = 1;
			$ret['data'] = '目标不存在';
		}
  		echo json_encode($ret);
  		exit;
  		break;
  	case 'takeInDB':
  		$type = $_POST['type'];
  		$url = $_POST['url'];
  		$outId = $_POST['outId'];
  		$urlList = explode(',',$url);
  		if($type === 'activity'){
  			$type = 1;
  		}else if($type === 'cat'){
  			$type = 0;
  		}
  		foreach ($urlList as $oneurl) {
  			$sql = "INSERT INTO cat.img(imgType,outId,imgUrl) VALUES($type,$outId,'".$oneurl."')";
			if($rs = $mysql->query($sql)){
				$ret['ret'] = 0;
				$ret['data'] = '添加成功';
			}else{
				$ret['ret'] = 1;
				$ret['data'] = '添加失败';
			}
  		}

		echo json_encode($ret);
		exit;
		break;

	default:
		error_return('参数错误',print_r($_GET,true));
		break;
}