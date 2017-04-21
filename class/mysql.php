<?php
/*******************************
接口：mysql.php
提交方式：无
提交参数：无
返回类型：无
返回结果：无

功能：连接数据库
********************************/

/*$con = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWD);
$db_selected = mysql_select_db("cloud_content",$con);
mysql_set_charset('utf8', $con); */
$mysql = new mysqli('localhost:3306','root','zxc1111','cat');
if(mysqli_connect_errno())
{
	printf("Connect failed:%s\n",mysqli_connect_error());
	exit;
}
$mysql->set_charset('UTF8');
