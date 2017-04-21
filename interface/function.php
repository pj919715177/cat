<?php
/*******************************
接口：function.php
提交方式：无，属于被引用的文件，不提供单独调用的能力
提交参数：无
返回类型：无
返回结果：无

功能：主要提供一些函数库。
********************************/



/*页面访问控制*/
// $accessFile=basename($_SERVER['PHP_SELF']);
// $openFile=array('innerLogin.php','auth.php','reg.php','forgetPW.php','email_confirm.php','imgCode.php','phoneCode.php','beianInfo.php','templateList.php','houseList.php','getVMPrice.php','getTime.php','FWhouseList.php','loginInfo.php','getNotice.php');
// if(!in_array($accessFile,$openFile) && (empty($_SESSION[SOURCE]['auth'])||$_SESSION[SOURCE]['auth'] == 0)){
//     //echo json_encode(array('ret' =>1 ,'err' ););
//     error_return("未授权的访问!");
// }

/*GET POST 参数处理*/
if(!empty($_GET)){
    foreach($_GET as $k => $v){
        if(preg_match('/(select|update|insert|delete|union)/i',$v)){
            error_return('参数中带有非法字符集合',print_r($_GET,true));
        }
        $_GET[$k] = htmlspecialchars($v);
        $_GET[$k] = str_replace(';','',$v);
    }
}
if(!empty($_POST)){
    foreach($_POST as $k => $v){
        if(preg_match('/(select|update|insert|delete|union)/i',$v)){
            error_return('参数中带有非法字符集合',print_r($_POST,true));
        }
        $_POST[$k] = htmlspecialchars($v);
        $_POST[$k] = str_replace(';','',$v);
    }
}

if (!empty($_REQUEST['from'])&&(empty($_SESSION[SOURCE]['from'])||is_null($_SESSION[SOURCE]['from']))) {
    $_SESSION[SOURCE]['from'] = $_REQUEST['from'];
    $_SESSION[SOURCE]['referer'] = $_SERVER['HTTP_REFERER'];
    if (is_null($_COOKIE['from'])||empty($_COOKIE['from'])) {
        setcookie("from", $_SESSION[SOURCE]['from'], time()+86400);
        setcookie("referer", $_SESSION[SOURCE]['referer'], time()+86400);
    }
}

/*****************************
函数：elf_process
输入参数：无
输出：无



功能：将进程转换为精灵进程
******************************/
function elf_process(){
    $pid = pcntl_fork();
    //父进程和子进程都会执行下面代码
    if ($pid == -1) {
    //错误处理：创建子进程失败时返回-1.
        die('could not fork');
    }else if ($pid) {
     //父进程会得到子进程号，所以这里是父进程执行的逻辑
        pcntl_wait($status); //等待子进程中断，防止子进程成为僵尸进程。
    } else {
     //子进程得到的$pid为0, 所以这里是子进程执行的逻辑。
    }
    fclose(STDIN);
    fclose(STDOUT);
    fclose(STDERR);
}

/*****************************
函数：mysql_fetch_assoc_all
输入参数：mysql查询结果集 $rs
输出：包含查询结果集所有行的数组

功能：获取mysql查询结果集中的所有数据
******************************/
function mysql_fetch_assoc_all($rs){
        while($a=mysql_fetch_assoc($rs)){
                $data[]=$a;
        }
	if(empty($data)){
		return array();
	}
	else{
        	return $data;
	}
}

/*****************************
函数：mysqli_fetch_assoc_all_rs
输入参数：mysqli类结果集 $rs
输出：包含查询结果集所有行的数组

功能：获取mysql查询结果集中的所有数据
******************************/
function mysqli_fetch_assoc_all($rs){
    while ($row = $rs->fetch_assoc()) {
    	$data[] = $row;
    }
    if(empty($data)){
		return array();
	}
	else{
        return $data;
	}
}

/*****************************
函数：mysql_fetch_query_str
输入参数：mysql查询结果集 $rs
输出：将结果集中的指定字段转换为可以用于mysql in 查询的字符串

功能：获取mysql查询结果集中的指定字段的in查询字符串
******************************/
function mysql_fetch_query_str($rs,$field,$type='string'){
        while($a=@mysql_fetch_assoc($rs)){
                if($type == 'int'){
                        $str .= $a[$field].',';
                }
                else{
                        $str .= "'".$a[$field]."'".',';
                }
        }
        return '('.trim($str,',').')';
}

/*****************************
函数：mysql_fetch_query_str
输入参数：mysql查询结果集 $rs
输出：将结果集中的指定字段转换为可以用于mysql in 查询的字符串

功能：获取mysql查询结果集中的指定字段的in查询字符串
******************************/
function mysqli_fetch_query_str($rs,$field,$type='string'){
    $str = "";
    while($a=$rs->fetch_assoc()){
        if($type == 'int'){
            $str .= $a[$field].',';
        }
        else{
            $str .= "'".$a[$field]."'".',';
        }
    }
    return '('.trim($str,',').')';
}

/*******************************************
函数：error_return
输入：错误消息（$msg）详细信息（$info）
输出：无，输出 $msg 到前端调用者并退出脚本执行

功能：日志记录错误消息和详细信息，输出json格式的错误消息并退出脚本执行
*******************************************/
function error_return($msg,$info=''){
	$e = new Exception();
    $str = $e->getTraceAsString();
	logResult($str."\n".$msg.':: '.$info.':: '.print_r(@$_SESSION,true));
	$ret['ret']=1;
	$ret['errorMsg']=$msg;
	echo json_encode($ret);
	exit;
}

/*******************************************
函数：logResult
输入：需要记录到日志文件中的内容（$word）
输出：无

功能：写日志，可以在一些错误处理中将一些日后调试需要用到的信息记录下来方便排错
******************************************/
function logResult($word='') {
    // $fp = fopen("/tmp/log.txt","a");
    // flock($fp, LOCK_EX) ;
    // fwrite($fp,"【".$_SERVER['PHP_SELF']."】执行日期：".strftime("%Y%m%d%H%M%S",time()).":: \n".$word."\n");
    // flock($fp, LOCK_UN);
    // fclose($fp);
}
/******************************************
函数：phpPost
输入：$url,$post
输出：file_get_contents执行POST后返回的数据

功能：使用file_get_contents执行POST
********************************************/
function phpPost($url,$post = null){
	if (is_array($post)) {
        	ksort($post);
        	$content = http_build_query($post);
        	$content_length = strlen($content);
        	$options = array(
        	    'http' => array(
        	        'method' => 'POST',
        	        'header' =>
        	        "Content-type: application/x-www-form-urlencoded\r\n" .
        	        "Content-length: $content_length\r\n",
        	        'content' => $content
        	    )
        	);
        	return file_get_contents($url, false, stream_context_create($options));
	}
	else{
		logResult('POST错误：'.$url."\n".print_r($post,true));
		return false;
	}
}

/******************************************
函数：floatcmp
输入：$f1,$f2,$precision
输出：返回两个浮点数的比较结果

功能：比较两个浮点数的大小
********************************************/
function floatcmp($f1,$f2,$precision = 2) {// are 2 floats equal 
    return bccomp($f1,$f2,$precision);
    $e = pow(10,$precision);  
    $i1 = intval($f1 * $e);  
    $i2 = intval($f2 * $e); 
    return ($i1 == $i2);  
}
/********************
函数：email
输入参数：$to,$title,$body
输出参数：true,false(发送成功或者失败)

功能：发送邮件个指定的地址
*********************/
function email($to,$title,$body){
	$url=MESSAGE."/mail.php?to=".urlencode($to).'&title='.urlencode($title).'&body='.urlencode($body);
	$rs=file_get_contents($url);
	$data = json_decode($rs,true);
	if($data['ret'] === 0) return true;
	else return false;
}
function email1($to,$title,$body){
	if(preg_match('/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i',$to)){}
	else{
		return false;
	}
	$now = date("Y-m-d h:i:s");
	$from_name = '睿江云服务';
	$from_name = "=?UTF-8?B?".base64_encode($from_name)."?=";
	$from_email = 'noreply@eflypro.com';
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= "Content-Transfer-Encoding: 8bit\r\n";
	$headers .= "From: $from_name <$from_email>\r\n";
	
	$subject = "=?UTF-8?B?".base64_encode($title)."?=";
	if (mail($to, $subject, $body, $headers)) {
		return true;
	}
	else{
		return false;
	}
}

/********************
函数：sendEvent
输入参数：$stauts,$struct
输出参数：无

功能：推送事件
*********************/
function sendEvent($stauts,$struct='')
{
    $data = array(
        'eventName'=>$stauts,
        'source'=>SOURCE,
        'token'=>'',
        'TS'=>date('Y-m-d H:i:s'),
        'target'=>'',
        'struct'=>$struct,
        );
    //echo base64_encode(json_encode($data));
    //echo "</br>";
    $url = EVENT_API."publicEventRecv.php?event=".urlencode(base64_encode(json_encode($data)));
    //echo $url;
    $data = fopen($url,'r');
    //echo $data;
}

/********************
函数：set_url_encode
输入参数：$data
输出参数：url请求参数的url编码

功能：将GET请求的参数进行编码
*********************/
function set_url_encode($data){
    foreach ($data as $key => $value) {
        $str .=$key."=".urlencode($value)."&";
    }
    return trim($str,"&");
}



/********************
函数：insert_into_dayily_logging
输入参数：$mysql,$username,$opt
输出参数：无

功能：对于用户的操作记录下来
*********************/
function insert_into_dayily_logging($mysql,$username,$opt,$from='',$referer=''){
    $sql = "INSERT INTO `Daily_Logging`(`userName`,`operation`,`from`,`referer`) values('$username','$opt','$from','$referer')";
    $mysql->query($sql);
    if ($mysql->affected_rows == 0) {
        error_return('日志更新出错');
    }
}

/********************
函数：get_order_code
输入参数：无
输出参数：返回一个唯一的订单编号

功能：生成一个唯一的订单编号
*********************/
function get_order_code(){
    $code=file_get_contents(API_URL.'/build_order_code.php');
    return $code;
}

/********************
函数：get_money
输入参数：$username
输出参数：无

功能：获取账号的余额
*********************/
function get_money($username){
    $data = array();
    $data['opt'] = 'query';
    $data['source'] = SOURCE;
    $data['userName'] = $username;
    $req = set_url_encode($data);
    $url = CASHIER_URL."/accountInquiry.php?".$req;
    $data=file_get_contents($url);
    $data=json_decode($data,true);
    $data=$data['data'];

    $info = array();
    $info['recharge'] = bcadd($data['balanceRecharge'],0,2);
    $info['coupon'] = bcadd($data['balanceCoupon'],0,2);
    return $info;
}

/********************
函数：order_create
输入参数：$order,$recharge,$coupon,$mysql
输出参数：无

功能：创建订单
*********************/
function order_create($order,$recharge,$coupon,$mysql){
    if(!isset($order['about'])){
        $order['about'] = '无';
    }
    $sql = "INSERT into `Bu_Order` (`Login_ID`,`Code`,`IsPay`,`Type`,`Money`,`CouponPay`,`BalancePay`,`about`) values (?,?,?,?,?,?,?,?)";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param("isisddds",$order['loginid'],$order['code'],$order['IsPay'],$order['Type'],$order['Money'],$coupon,$recharge,$order['about']);
        if ($stmt->execute()) {
            $order_id = $stmt->insert_id;
        }
        else
        {
            $mysql->rollback();
            sendEvent('系统错误！(Bu_Order)',$sql);
            error_return('系统错误！',$stmt->error.$sql);
        }
        $stmt->close();
    }
    else{
        sendEvent('系统错误！(Bu_Order)',$sql);
        error_return('系统错误！',$stmt->error.$sql);
    }
}


/********************
函数：order_pay
输入参数：$username,$order,$recharge,$coupon
输出参数：无

功能：订单支付
*********************/
function order_pay($username,$order,$recharge,$coupon,$mysql){
    $req['opt'] = "add";
    $req['product'] = "云平台";
    $req['operation'] = "资源购买";
    $req['source'] = SOURCE;
    $req['callBack'] = CALLBACK;
    $req['userName'] = $username;
    $req['code'] = $order['code'];
    $req['money'] = $order['Money'];
    $req['onlinePay'] = 0;
    $req['rechargePay'] = $recharge;
    $req['couponPay'] = $coupon;
    $req['payType'] = 'alipay';
    $req['finishJump'] = PRJ_ADDR.'manageCenter.php?target=mOrderList';

    $req_str = set_url_encode($req);

    $url = CASHIER_URL."/consume.php?".$req_str;

    $data = file_get_contents($url);


    $json = json_decode($data,true);
    $ret = $json['ret'];
    if ($ret != 0 ) {
        error_return('系统异常，冻结余额失败！', print_r($_GET,true));
    }

    insert_into_dayily_logging($mysql,$username,"进行支付订单：".$order['code'],$_SESSION[SOURCE]['from'],$_SESSION[SOURCE]['referer']);
    return $ret;
}

/********************
函数：money_return
输入参数：$username,$money,$about
输出参数：$data

功能：云平台解冻的钱返还到收银台
*********************/
function money_return($username,$money,$about='云平台返还'){
    $req['opt'] = "moneyReturn";
    $req['source'] = SOURCE;
    $req['userName'] = $username;
    $req['money'] = $money;
    $req['about'] = $about;
    $req_str = set_url_encode($req);
    $url = CASHIER_URL."/consumeReturn.php?".$req_str;
    $data = file_get_contents($url);
    return $data;
}

/********************
函数：update_order
输入参数：$code,$ispay,$mysql
输出参数：无

功能：更新订单状态
*********************/
function update_order($code,$ispay,$mysql){
    $sql = "UPDATE `Bu_Order` set `IsPay` = $ispay where `Code` = '$code'";
    $mysql->query($sql);
}

/********************
update_order_return
输入参数：$code,$data,$mysql
输出参数：无

功能：更新返钱订单的返钱情况
*********************/
function update_order_return($code,$data,$mysql){
    $sql = "UPDATE `Bu_Order` set `IsPay` = 1 ,`PayTs` = NOW() , `CouponPay` = ".$data['coupon']." , `BalancePay` = ".$data['recharge']." where `Code` = '$code'";
    $mysql->query($sql);
}

/********************
函数： get_froze_resources
输入参数：$loginid,$mysql
输出参数：冻结的资源总数

功能：获取冻结的资源总数
*********************/
function get_froze_resources($loginid,$mysql){
    $yesterday = date("Y-m-d",strtotime(" -1   day"));
    $today = date("Y-m-d");
    $tomorrow = date("Y-m-d 00:00:00",strtotime(" +1   day"));
    $today_time = date("Y-m-d 00:00:00");

    //VM资源统计
    $price_vm = 0;
    $sql = "SELECT * from `Bu_VMCharge` where `Time` >= '$yesterday' and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    if ($rs->num_rows > 0) {
        $data = mysqli_fetch_assoc_all($rs);
        //$info = array();
        foreach ($data as $key => $value) {
            $price = get_VM_price($value['CPU'],$value['RAM'],$value['stockHouse']);
            $price_vm = bcadd($price, $price_vm ,2);
        }
    }
    
    $sql = "SELECT * FROM `Bu_VM` where `code` not in (SELECT `VMCode` from `Bu_VMCharge` where `Time` = '$today') and `stopTS` >= '$tomorrow' and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    if ($rs->num_rows > 0) {
        $data = mysqli_fetch_assoc_all($rs);
        //$info = array();
        foreach ($data as $key => $value) {
            $price = get_VM_price($value['CPU'],$value['RAM'],$value['stockHouse']);
            $price_vm = bcadd($price, $price_vm ,2);
        }
    }
    
    $sql = "SELECT `Bu_VM`.`CPU` as `CPU`, `Bu_VM`.`RAM` as `RAM`,`Bu_VM`.`BGPBandWidth` as `BandWidth_BGP`, `Bu_VM`.`IPLCBandWidth` as `BandWidth_IPLC` , `Temp`.`days` as `days`,`Bu_VM`.`stockHouse` as `stockHouse` from `Bu_VM`,
    (SELECT To_Days(`Bu_VM`.`stopTS`)-To_Days('$tomorrow') as `days`,`Bu_VM`.`code` as `VMCode` FROM `Bu_VM` where `Bu_VM`.`loginID` = $loginid and `Bu_VM`.`stopTS` > '$tomorrow' ) as `Temp`
    where `Bu_VM`.`Free` = 0 and `Bu_VM`.`code`=`Temp`.`VMCode` and `Bu_VM`.`loginID`=$loginid and `Bu_VM`.`stopTS` > '$tomorrow'";
    $rs = $mysql->query($sql);
    if ($rs->num_rows <1) {
        //$info =  array();
    }else{
        $data = mysqli_fetch_assoc_all($rs);
        //$info = array();
        foreach ($data as $key => $value) {
            $price = get_VM_price($value['CPU'],$value['RAM'],$value['stockHouse']);
            $price_vm = bcadd($price_vm, bcmul($price, $value['days'],2) ,2);
        }
    }

    //带宽
    $price_bandwidth = 0;
    $sql = "SELECT * from `Bu_BandWidthCharge` where `Time` >= '$yesterday' and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    if ($rs->num_rows > 0) {
        $data = mysqli_fetch_assoc_all($rs);
        //$info = array();
        foreach ($data as $key => $value) {
            $price = get_BandWidth_price($value['BandWidth'],$value['Type'],$value['stockHouse']);
            $price_bandwidth = bcadd($price, $price_bandwidth ,2);
        }
    }
    
    $sql = "SELECT * FROM `Bu_BandWidth` where `VMCode` not in (SELECT `VMCode` from `Bu_BandWidthCharge` where `Time` = '$today') and `stopTS` >= '$tomorrow' and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    if ($rs->num_rows > 0) {
        $data = mysqli_fetch_assoc_all($rs);
        //$info = array();
        foreach ($data as $key => $value) {
            $price = get_BandWidth_price($value['BandWidth'],$value['Type'],$value['stockHouse']);
            $price_bandwidth = bcadd($price, $price_bandwidth ,2);
        }
    }
    
    $sql = "SELECT `Bu_BandWidth`.`BandWidth` as `BandWidth`, `Bu_BandWidth`.`Type` as `Type`, `Temp`.`days` as `days`,`Bu_BandWidth`.`stockHouse` as `stockHouse` from `Bu_BandWidth`,`Bu_BandWidthLifeLog`,
    (SELECT To_Days(`stopTS`)-To_Days('$tomorrow') as `days`, `VMCode` FROM `Bu_BandWidth` where `loginID` = $loginid and `stopTS` > '$tomorrow' ) as `Temp`
    where `Bu_BandWidthLifeLog`.`Free` = 0 and `Bu_BandWidth`.`VMCode`=`Temp`.`VMCode` and `Bu_BandWidthLifeLog`.`VMCode`=`Temp`.`VMCode` and `Bu_BandWidth`.`loginID`=$loginid and `Bu_BandWidth`.`stopTS` > '$tomorrow'";
    $rs = $mysql->query($sql);
    if ($rs->num_rows <1) {
        //$info =  array();
    }else{
        $data = mysqli_fetch_assoc_all($rs);
        //$info = array();
        foreach ($data as $key => $value) {
            $price = get_BandWidth_price($value['BandWidth'],$value['Type'],$value['stockHouse']);
            $price_bandwidth = bcadd(bcmul($price, $value['days'],2), $price_bandwidth ,2);
        }
    }

    //磁盘
    $sql = "SELECT sum(`capacity`) as `capacity`, `type` from `Bu_DISKCharge` where `Time` >= '$yesterday' and `loginID` = $loginid group by `type`";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        switch ($value['type']) {
            case 'iSCSI_SSD':
            $info['DISK_iSCSI_SSD'] += $value['capacity'];
            break;

            case 'iSCSI_SATA':
            $info['DISK_iSCSI_SATA'] += $value['capacity'];
            break;

            default:
                # code...
            break;
        }
    }

    $sql = "SELECT sum(`capacity`) as `capacity`, `type` from `Bu_DISKLifeLog` where `Free` = 0 and `uuid` not in(SELECT `uuid` from `Bu_DISKCharge` where `Time` = 'today') and `stopTS` >= '$tomorrow' and `loginID` = $loginid group by `type`";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        switch ($value['type']) {
            case 'iSCSI_SSD':
            $info['DISK_iSCSI_SSD'] += $value['capacity'];
            break;

            case 'iSCSI_SATA':
            $info['DISK_iSCSI_SATA'] += $value['capacity'];
            break;

            default:
                # code...
            break;
        }
    }

    $sql = "SELECT sum(`Bu_DISK`.`capacity`*`Temp`.`days`) as `capacity` , `Bu_DISK`.`type` as `type` FROM `Bu_DISK`,
    (SELECT To_Days(`Bu_DISK`.`stopTS`)-To_Days('$tomorrow') as `days`,`Bu_DISK`.`ID` as `ID` from `Bu_DISK`,`Bu_DISKLifeLog` where `Bu_DISK`.`loginID` = $loginid and `Bu_DISK`.`uuid`=`Bu_DISKLifeLog`.`uuid` and `Bu_DISKLifeLog`.`Free`= 0) as `Temp`
    where `Bu_DISK`.`ID` = `Temp`.`ID` and `Bu_DISK`.`loginID` = $loginid and `Bu_DISK`.`stopTS` >= '$tomorrow'
    group by `Bu_DISK`.`type`";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        switch ($value['type']) {
            case 'iSCSI_SSD':
            $info['DISK_iSCSI_SSD'] += $value['capacity'];
            break;

            case 'iSCSI_SATA':
            $info['DISK_iSCSI_SATA'] += $value['capacity'];
            break;

            default:
                # code...
            break;
        }
    }
    $price_disk = get_disk_price($info['DISK_iSCSI_SATA'],$info['DISK_iSCSI_SSD']);

    //IP
    $sql = "SELECT `Bu_IPLifeLog`.`stockHouse` as `stockHouse`, `Bu_IPLifeLog`.`type` as `type` from `Bu_IPCharge` ,`Bu_IPLifeLog` where `Bu_IPCharge`.`Time` >= '$yesterday' and `Bu_IPCharge`.`loginID` = $loginid and `Bu_IPCharge`.`uuid` = `Bu_IPLifeLog`.`uuid` ";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price_ip = bcadd($price_ip,get_ip_price($value['type'],$value['stockHouse']),2);
    }

    $sql = "SELECT `stockHouse`, `type` from `Bu_IPLifeLog` where `uuid` not in (SELECT `uuid` from `Bu_IPCharge` where `Time` = '$today') and `loginID` = $loginid and `Free` = 0 and `stopTS` >= '$tomorrow' ";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price_ip = bcadd($price_ip,get_ip_price($value['type'],$value['stockHouse']),2);
    }

    $sql = "SELECT sum(`Temp`.`days`) as `days` , `Bu_IP`.`type` as `type` , `Temp`.`stockHouse` as `stockHouse` FROM `Bu_IP`,
    (SELECT To_Days(`Bu_IP`.`stopTS`)-To_Days('$tomorrow') as `days`,`Bu_IP`.`uuid` as `uuid`,`Bu_IPLifeLog`.`stockHouse` as `stockHouse` from `Bu_IP`,`Bu_IPLifeLog` where `Bu_IP`.`loginID` = $loginid and `Bu_IP`.`uuid`=`Bu_IPLifeLog`.`uuid` and `Bu_IPLifeLog`.`Free`= 0) as `Temp`
    where `Bu_IP`.`uuid` = `Temp`.`uuid` and `Bu_IP`.`loginID` = $loginid and `Bu_IP`.`stopTS` >= '$tomorrow' ";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price_ip = bcadd($price_ip,bcmul($value['days'],get_ip_price($value['type'],$value['stockHouse']),2),2);
    }

    $price = bcadd($price_vm, bcadd($price_bandwidth, bcadd($price_disk, $price_ip,2),2),2);

    //FireWall
    $sql = "SELECT * from `Bu_FireWallCharge` where `Time` >= '$yesterday' and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    $fw_price = 0;
    foreach ($data as $key => $value) {
        $money = get_FW_charge($value['stockHouse'],(int)$value['Type'],(int)$value['IPCount'],(int)$value['maxFlow'],(int)$value['Flow']);
        $fw_price = bcadd($fw_price, $money ,2);
    }

    $sql = "SELECT * from `Bu_FireWallLifeLog` where `FWCode` not in (SELECT `FWCode` from `Bu_FireWallCharge` where `Time` = '$today') and `loginID` = $loginid and `Free` = 0 and `ExceptedTime` >= '$tomorrow' and `stopTS` is null";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $money = get_FW_price($value['stockHouse'],(int)$value['Type'],(int)$value['IPCount'],(int)$value['maxFlow']);
        $fw_price = bcadd($fw_price, $money ,2);
    }

    $sql = "SELECT `stockHouse` , `Type` , `IPCount`, `maxFlow`, To_Days(`ExceptedTime`)-To_Days('$tomorrow') as `days` from `Bu_FireWallLifeLog` where `loginID` = $loginid and `Free` = 0 and `ExceptedTime` >= '$tomorrow' and `stopTS` is null";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $money = get_FW_price($value['stockHouse'],(int)$value['Type'],(int)$value['IPCount'],(int)$value['maxFlow']);
        $fw_price = bcadd($fw_price, bcmul($money, $value['days'],2) ,2);
    }
    $price = bcadd($fw_price, $price,2);

    //快照统计
    $price_disksnapshot = 0;
    $sql = "SELECT * from `Bu_DISKSnapShotCharge` where `Time` >= '$yesterday' and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price_disksnapshot = bcadd($price_disksnapshot,get_DISKSnapShot_price($value['Type'],$value['capacity']),2);
    }

    $sql = "SELECT * from `Bu_DISKSnapShot` where `Auto` = 0 and `loginID` = $loginid and `snap_uuid` not in(SELECT `snap_uuid` from `Bu_DISKSnapShotCharge` where `Time` = '$today' and `loginID` = $loginid)";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price_disksnapshot = bcadd($price_disksnapshot,get_DISKSnapShot_price($value['Type'],$value['capacity']),2);
    }

    $sql = "SELECT * from `Bu_DISKSnapShot` where `CreatTime` < '$today_time' and `Auto` = 1 and `loginID` = $loginid and `snap_uuid` not in(SELECT `snap_uuid` from `Bu_DISKSnapShotCharge` where `Time` = '$today' and `loginID` = $loginid)";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price_disksnapshot = bcadd($price_disksnapshot,get_DISKSnapShot_price($value['Type'],$value['capacity']),2);
    }


    $sql = "SELECT `Bu_DISKSnapShot`.*,To_Days(`ExceptedTime`)-To_Days('$tomorrow') AS `days` from `Bu_DISKSnapShot` where `ExceptedTime` >= '$tomorrow' and `loginID` = $loginid ";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price_disksnapshot = bcadd($price_disksnapshot,bcmul(get_DISKSnapShot_price($value['Type'],$value['capacity']), $value['days'],2),2);
    }

    $price = bcadd($price_disksnapshot, $price,2);
    return $price;
}

/********************
函数： get_used
输入参数：$loginid,$mysql
输出参数：

功能：计算已经扣费的钱
*********************/
function get_used($loginid,$mysql){
    $sql = "SELECT sum(`Money`) as `Money` from `Bu_DayConsume`  where `LoginID` = $loginid";
    $rs = $mysql->query($sql);
    $data = $rs->fetch_assoc();
    return $data['Money'];
}

/********************
函数： get_resource
输入参数：$loginid,$mysql
输出参数：

功能：计算不同类型的钱数
*********************/
function get_resource($loginid,$mysql,$about=null){
    $sql = "SELECT sum(`Money`) as `Money`, `Type` from `Bu_Order`  where `IsPay` = 1 and `Login_ID` = $loginid group by `Type`";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        switch ($value['Type']) {
            case '冻结':
                $info['froze'] = $value['Money'];
                break;

            case '自动续费':
                $info['auto'] = $value['Money'];
                break;

            case '解冻':
                $info['thaw'] = $value['Money'];
                break;

            case '返还':
                $info['return'] = $value['Money'];
                break;
            default:
                # code...
                break;
        }
    }
    $real_froze = get_froze_resources($loginid,$mysql);
    $used = get_used($loginid,$mysql);

    $froze = bcadd(bcadd(bcadd((double)$info['froze'] , (double)$info['auto'],2), - (double)$info['thaw'],2), - (double)$used , 2);

    $balance_froze = bcadd($froze , - (double)$real_froze , 2 );
    $thaw = bcadd((double)$info['thaw'] , - (double)$info['return'],2);
    $temp = bcadd((double)$thaw, (double)$balance_froze,2);
    if ($balance_froze > 0) {
        $order['loginid'] = $loginid;
        $order['code'] = get_order_code();
        $order['Money'] = $balance_froze;
        $order['Type'] = '解冻';
        $order['IsPay'] = 1;
        $order['about'] = $about;
        order_create($order,0,0,$mysql);
    }elseif ($balance_froze < 0 && $thaw > 0) {
        if ($temp < 0) {
            $order['loginid'] = $loginid;
            $order['code'] = get_order_code();
            $order['Money'] = bcadd(0, -$thaw,2);
            $order['Type'] = '解冻';
            $order['IsPay'] = 1;
            $order['about'] = $about;
            order_create($order,0,0,$mysql);

            /*$order['loginid'] = $loginid;
            $order['code'] = get_order_code();
            $order['Money'] = $thaw;
            $order['Type'] = '冻结';
            $order['IsPay'] = 1;
            $order['about'] = $about;
            order_create($order,0,0,$mysql);*/
        }else{
            $order['loginid'] = $loginid;
            $order['code'] = get_order_code();
            $order['Money'] = $balance_froze;
            $order['Type'] = '解冻';
            $order['IsPay'] = 1;
            $order['about'] = $about;
            order_create($order,0,0,$mysql);

            /*$order['loginid'] = $loginid;
            $order['code'] = get_order_code();
            $order['Money'] = bcadd(0, -$balance_froze,2);
            $order['Type'] = '冻结';
            $order['IsPay'] = 1;
            $order['about'] = $about;
            order_create($order,0,0,$mysql);*/
        }
    }
    handle_order($temp,$mysql,$about);
}

/********************
函数： handle_order
输入参数：$price,$mysql
输出参数：

功能：解冻处理
*********************/
function handle_order($price,$mysql,$about=null){
    if ($price < 0) {
        $price = bcadd(0, -$price,2);
        $money = get_money($_SESSION[SOURCE]['userName']);
        $order['loginid'] = $_SESSION[SOURCE]['loginID'];
        $order['code'] = get_order_code();
        $order['Money'] = $price;
        $order['Type'] = '冻结';
        $order['IsPay'] = 0;
        $order['about'] = $about;
        if (bccomp($money['recharge'], $price,2) >= 0) {
            order_create($order,$price,0,$mysql);
            order_pay($_SESSION[SOURCE]['userName'],$order,$price,0,$mysql);
        }else{
            $price2 = bcadd($price, - $money['recharge'],2);
            if (bccomp($money['coupon'], $price2,2) >= 0) {
                order_create($order,$money['recharge'],$price2,$mysql);
                order_pay($_SESSION[SOURCE]['userName'],$order,$money['recharge'],$price2,$mysql);
            }else{
                error_return('余额不足，请充值！', print_r($_GET,true)); 
            }
        }
    }elseif ($price >= 1) {
        $order['loginid'] = $_SESSION[SOURCE]['loginID'];
        $order['code'] = get_order_code();
        $order['Money'] = $price;
        $order['Type'] = '返还';
        $order['IsPay'] = 0;
        $order['about'] = $about;
        order_create($order,0,0,$mysql);
        $data = money_return($_SESSION[SOURCE]['userName'],$price,'云平台返还');
        $data = json_decode($data,TRUE);
        if ($data['ret'] != 0) {
            update_order($order['code'],0,$mysql);
            $error['Code'] = $order['code'];
            $error['error'] = $data;
            sendEvent('云平台返还失败',$error);
            insert_into_dayily_logging($mysql,$_SESSION[SOURCE]['userName'],"返还失败：".$order['code']);
            echo json_encode($data);
            exit;
        }
        update_order_return($order['code'],$data['data'],$mysql);
        insert_into_dayily_logging($mysql,$_SESSION[SOURCE]['userName'],"返还成功：￥".$price);
    }
}

/********************
函数：get_time
输入参数：$date 当前日期，$time 增加的时间 月|季|半年|年
输出参数：增加后的时间

功能：计算时间
*********************/
function get_time($date,$time){
    switch ($time) {
        case '月':
            return date("Y-m-d H:i:s",strtotime("$date   +1   month"));
            break;
        case '季':
            return date("Y-m-d H:i:s",strtotime("$date   +3   month"));
            break;
        case '半年':
            return date("Y-m-d H:i:s",strtotime("$date   +6   month"));
            break;
        case '年':
            return date("Y-m-d H:i:s",strtotime("$date   +1   year"));
            break;
        default:
            $time = date("Y-m-d" , strtotime($time));
            $time = date("$time H:i:s");
            $second = strtotime($time) - strtotime($date);
            if ($second < 24*60*60) {
                $time = date("Y-m-d H:i:s",strtotime("$date   +1   day"));
            }
            return $time;
            break;
    }
}

/********************
函数：get_day
输入参数：$time 增加的时间 月|季|半年|年
输出参数：对应天数

功能：计算天数
*********************/
function get_day($time){
    $date = date("Y-m-d");
    switch ($time) {
        case '月':
            $date2 = date("Y-m-d",strtotime("$date   +1   month"));
            break;
        case '季':
            $date2 = date("Y-m-d",strtotime("$date   +3   month"));
            break;
        case '半年':
            $date2 = date("Y-m-d",strtotime("$date   +6   month"));
            break;
        case '年':
            $date2 = date("Y-m-d",strtotime("$date   +1   year"));
            break;
        default:
            $date2 = date("Y-m-d",strtotime("$time"));
            break;
    }
    $datetime1 = strtotime($date)/24/60/60;
    $datetime2 = strtotime($date2)/24/60/60;
    $day = ceil($datetime2-$datetime1);
    return (int)$day;
}

/********************
函数：to_pay
输入参数：$user,$price
输出参数：无

功能：冻结账户上的余额
*********************/
function to_pay($user,$price,$mysql,$about=null){
    $money = get_money($user['username']);
    $order['loginid'] = $user['loginID'];
    $order['code'] = get_order_code();
    $order['Money'] = $price;
    $order['Type'] = '冻结';
    $order['IsPay'] = 0;
    $order['about'] = $about;

    if (bccomp($money['recharge'], $price,2) >= 0) {
        order_create($order,$price,0,$mysql);
        $re = order_pay($user['username'],$order,$price,0,$mysql);
    }else{
        $price2 = bcadd($price, - $money['recharge'],2);
        if (bccomp($money['coupon'], $price2,2) >= 0) {
            order_create($order,$money['recharge'],$price2,$mysql);
            $re = order_pay($user['username'],$order,$money['recharge'],$price2,$mysql);
        }else{
            error_return('余额不足，请充值！', print_r($_GET,true)); 
        }
    }
    if ($re != 0) {
        error_return('系统错误，冻结金额失败！', print_r($_GET,true)); 
    }
}

/********************
函数：to_return
输入参数：$user,$price
输出参数：无

功能：返回账户上的余额
*********************/
function to_return($user,$money,$mysql,$about=null){
    //$money = bcadd(0, -$data['exp_price'],2);
    $order['loginid'] = $user['loginID'];
    $order['code'] = get_order_code();
    $order['Money'] = $money;
    $order['Type'] = '解冻';
    $order['IsPay'] = 1;
    $order['about'] = $about;
    order_create($order,0,0,$mysql);
    if ($money >= 1) {
        $order['loginid'] = $user['loginID'];
        $order['code'] = get_order_code();
        $order['Money'] = $money;
        $order['Type'] = '返还';
        $order['IsPay'] = 0;
        $order['about'] = $about;
        order_create($order,0,0,$mysql);
        $data = money_return($user['username'],$money,'云平台返还');
        $data = json_decode($data,TRUE);
        if ($data['ret'] != 0) {
            update_order($order['code'],0,$mysql);
            $error['Code'] = $order['code'];
            $error['error'] = $data;
            sendEvent('云平台返还失败',$error);
            insert_into_dayily_logging($mysql,$user['username'],"返还失败：".$order['code']);
            echo json_encode($data);
            exit;
        }
        update_order_return($order['code'],$data['data'],$mysql);
        insert_into_dayily_logging($mysql,$user['username'],"返还成功：￥".$money);
    }
}


/********************
函数：get_total_charge
输入参数：$loginid,$mysql
输出参数：$price

功能：计算用户当前所拥有资源的总费用
*********************/
function get_total_charge($loginid,$mysql){
    // $time = date("Y-m-d 00:00:00",strtotime("+1   day"));
    $price = 0 ;
    $sql = "SELECT * from `Bu_VMCharge` where `Money` is null and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price = $price + get_VM_price($value['CPU'],$value['RAM'],$value['stockHouse']);
    }

    //IP
    $sql = "SELECT `Bu_IPCharge`.`type` as `type`,`Bu_IPLifeLog`.`stockHouse` as `stockHouse` from `Bu_IPCharge`,`Bu_IPLifeLog` 
    where `Bu_IPCharge`.`loginID` = $loginid and `Bu_IPCharge`.`Money` is null and `Bu_IPCharge`.`uuid` =  `Bu_IPLifeLog`.`uuid`";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price = $price + get_ip_price($value['type'],$value['stockHouse']);
    }

    //带宽
    $sql = "SELECT `Type`,`BandWidth`,`stockHouse` FROM  `Bu_BandWidthCharge` WHERE `Money` is null and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price = $price + get_BandWidth_price($value['BandWidth'],$value['Type'],$value['stockHouse']);
    }
   
    //高防
    $sql = "SELECT `stockHouse`,`Type`,`IPCount`,`maxFlow` FROM  `Bu_FireWallCharge` WHERE `Money` = 0.00 and `loginID` = $loginid";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        $price = $price + get_FW_price($value['stockHouse'],$value['Type'],$value['IPCount'],$value['maxFlow']);
    }

    //Disk磁盘
    $sql = "SELECT sum(`capacity`) as `capacity`,`type` FROM  `Bu_DISKCharge` WHERE `Money` is null and `loginID` = $loginid group by `type`";
    $rs = $mysql->query($sql);
    $data = mysqli_fetch_assoc_all($rs);
    foreach ($data as $key => $value) {
        switch ($value['type']) {
            case 'iSCSI_SSD':
            $price = $price + get_disk_price(0,$value['capacity']);
            break;

            case 'iSCSI_SATA':
            $price = $price + get_disk_price($value['capacity'],0);
            break;

            default:
                # code...
            break;
        }
    }

    return $price;
}