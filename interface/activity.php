<?php
/************************

********************************/
include_once('../class/database.php');
include_once('./function.php');
include_once("../class/mysql.php");
$database = database::getDatabase();

switch($_GET['opt']){
	case 'add':
		$activityName = $_POST['activityName']?$_POST['activityName']:'';
		$latitude = $_POST['latitude']?$_POST['latitude']:0;
		$longitude = $_POST['longitude']?$_POST['longitude']:0;
		$host_email = $_POST['host_email']?$_POST['host_email']:'';
		$startTime = $_POST['startTime']?$_POST['startTime']:null;
		$endTime = $_POST['endTime']?$_POST['endTime']:null;
		$applyStartTime = $_POST['applyStartTime']?$_POST['applyStartTime']:null;
		$applyEndTime = $_POST['applyEndTime']?$_POST['applyEndTime']:null;
		$theme = $_POST['theme']?$_POST['theme']:'';
		$introduce = $_POST['introduce']?$_POST['introduce']:'';
		$process = $_POST['process']?$_POST['process']:'';
		$coverImg = $_POST['coverImg']?$_POST['coverImg']:'';
		$location = $_POST['location']?$_POST['location']:'';

		$createTime = time();

		$sql = "INSERT INTO activity(activityName,latitude,longitude,host_email,startTime,endTime,applyStartTime,applyEndTime,theme,introduce,process,coverImg,location) VALUES(\"{$activityName}\",\"{$latitude}\",\"{$longitude}\",\"{$host_email}\",\"{$startTime}\",\"{$endTime}\",\"{$applyStartTime}\",\"{$applyEndTime}\",\"{$theme}\",\"{$introduce}\",\"{$process}\",\"{$coverImg}\",\"{$location}\");";
		$result=$mysql->query($sql);
		$query="SELECT LAST_INSERT_ID()";
		$result=$mysql->query($query);
		$rows=mysqli_fetch_row($result);

		if($result) {
			$json = ['code' => 1000, 'message' => '添加活动成功！','id' => $rows[0]];
		} else {
			$json = ['code' => 1001, 'message' => '添加活动失败！'];
		}
		echo json_encode($json);die;
		// exit;
		break;
	case 'getAll':
		$sql = "SELECT * FROM cat.activity";
		$rs = $mysql->query($sql);
		$data = mysqli_fetch_assoc_all($rs);

		$ret['ret'] = 0;
		$ret['data'] = $data;
		echo json_encode($ret);
		exit;
		break;
	case 'del':
		$id = $_POST['id'];
		$sql = "SELECT * FROM activity WHERE id=".$id;
		if($has = $mysql->query($sql)){
			$data = mysqli_fetch_assoc_all($has);
			if(!empty($data)){
				$sql2 = "DELETE FROM activity WHERE id=".$id;
				if($rs = $mysql->query($sql2)){
					$ret['ret'] = 0;
					$ret['data'] = '成功删除';
				}else{
					$ret['ret'] = 1;
					$ret['data'] = '删除失败';
				};
			}else{
				$ret['ret'] = 1;
				$ret['data'] = '无这用户';
			};
		}else{
			$ret['ret'] = 1;
			$ret['data'] = '删除失败';
		};
		echo json_encode($ret);
		exit;
		break;
	case 'getByhost':
		$host_email = $_POST['host_email'];
		$sql = "SELECT * FROM cat.activity WHERE host_email='".$host_email."'";
		if($rs = $mysql->query($sql)){
			$data = mysqli_fetch_assoc_all($rs);
			$ret['ret'] = 0;
			$ret['data'] = $data;
		}else{
			$ret['ret'] = 1;
			$ret['data'] = '查找失败';
		}
		echo json_encode($ret);
		exit;
		break;
	case 'getById':
		$id = $_POST['id'];
		$sql = "SELECT * FROM cat.activity WHERE id=".$id;
		if($rs = $mysql->query($sql)){
			$data = mysqli_fetch_assoc_all($rs);
			$ret['ret'] = 0;
			$ret['data'] = $data;
		}else{
			$ret['ret'] = 1;
			$ret['data'] = '查找失败';
		}
		echo json_encode($ret);
		exit;
		break;
	case 'edit':
		$id = $_POST['id'];
		$activityName = $_POST['activityName'];
		$latitude = $_POST['latitude'];
		$longitude = $_POST['longitude'];
		$startTime = $_POST['startTime'];
		$endTime = $_POST['endTime'];
		$applyStartTime = $_POST['applyStartTime'];
		$applyEndTime = $_POST['applyEndTime'];
		$theme = $_POST['theme'];
		$introduce = $_POST['introduce'];
		$process = $_POST['process'];
		$coverImg = $_POST['coverImg'];
		$location = $_POST['location'];
		$sql = "UPDATE activity SET activityName=\"{$activityName}\",latitude=\"{$latitude}\",longitude=\"{$longitude}\",startTime=\"{$startTime}\",endTime=\"{$endTime}\",applyStartTime=\"{$applyStartTime}\",applyEndTime=\"{$applyEndTime}\",theme=\"{$theme}\",introduce=\"{$introduce}\",process=\"{$process}\",coverImg=\"{$coverImg}\",location=\"{$location}\" WHERE id=\"{$id}\"";
		if($rs = $mysql->query($sql)){
			$sqlGet = "SELECT * FROM activity WHERE id=".$id;
			$rs = $mysql->query($sqlGet);
			$data = mysqli_fetch_assoc_all($rs);
			$ret['ret'] = 0;
			$ret['data'] = $data;
		}else{
			$ret['ret'] = 1;
			$ret['data'] = '修改失败';
		}
		echo json_encode($ret);
		exit;
		break;

	default:
		error_return('参数错误',print_r($_GET,true));
		break;
}