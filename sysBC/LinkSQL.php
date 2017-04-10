<?php
$host = 'localhost:3306';
$user = 'root';
$pass = 'zxc1111';
//连接
$link = mysqli_connect($host, $user, $pass);
mysqli_select_db($link,'test');

// 查询
$sqlSelect = 'SELECT * FROM test.test;';
$resSelect = mysqli_query($link,$sqlSelect);
$rowselect = mysqli_fetch_assoc_all($resSelect);
// var_dump($row);
// echo var_dump($rowselect);
echo json_encode($rowselect);
// 插入
$insertName = 'baba';
$insertIdtest = '02';
$sqlInsert = "INSERT INTO test.test(idtest,name) VALUES('4','$insertName');";
$resInsert = mysqli_query($link,$sqlInsert);
$uidInsert = mysqli_insert_id($link);
echo "<br>新的ID为：".$uidInsert;
echo "<br>resInsert：".$resInsert;
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