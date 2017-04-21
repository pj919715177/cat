<?php
class database
{
	private static $data;
	public $pdo;

	private $engine;
	private $host;
	private $database;
	private $user;
	private $pass;

	private function __construct() {
		$this->engine = 'mysql';
		$this->host = 'localhost:3306';
		$this->database = 'cat';
		$this->user = 'root';
		$this->pass = 'zxc1111';
		$dns = $this->engine.':dbname='.$this->database.";host=".$this->host;
		$this->pdo = new PDO($dns, $this->user, $this->pass);
	}
	public static function getDatabase()
	{
		if(!isset($data)) {
			self::$data = new database();
		}
		return self::$data;
	}
	
	public function addUser($nickname, $email, $password, $registHeadImgUrl, $signature, $createTime)
	{
		$sql = "INSERT INTO user(nickname,email,password,imgUrl,signature,createTime) 
			VALUES(\"{$nickname}\",\"{$email}\",\"{$password}\",\"{$registHeadImgUrl}\",\"{$signature}\",{$createTime})";
		$statement = $this->pdo->prepare($sql);
//		$params = [
//			':nickname' => $nickname,
//			':email' => $email,
//			':password' => $password,
//			':imgUrl' => $imgUrl,
//			':signature' => $signature,
//			':createTime' => $createTime,
//		];
		$result = $statement->execute();
		return $result;
	}

	public function checkUser($email, $password)
	{
		$sql = "SELECT id from user WHERE email=\"{$email}\" AND password=\"{$password}\"";
		$statement = $this->pdo->prepare($sql);
//		$params = [':email' => $email, ':password' => $password];
		$statement->execute();
		$result = $statement->fetch();
		return $result;
	}

	public function getUserByEmail($email)
	{
		$sql = "SELECT * from user WHERE email=:email";
		$statement = $this->pdo->prepare($sql);
		$params = [':email' => $email];
		$statement->execute($params);
		$result = $statement->fetch();
		return $result;
	}
	
	public function editUser($id, $nickname, $email, $imgUrl, $signature)
	{
		$sql = "UPDATE user SET nickname=\"{$nickname}\",email=\"{$email}\",imgUrl=\"{$imgUrl}\",signature=\"{$signature}\" WHERE id=\"{$id}\"";
		$statement = $this->pdo->prepare($sql);
//		$params = [
//			':nickname' => $nickname,
//			':email' => $email,
//			':password' => $password,
//			':imgUrl' => $imgUrl,
//			':signature' => $signature,
//			':id' => $id,
//		];
		$result = $statement->execute();
		return $result;
	}

	public function editPassword($id, $newPassword)
	{
		$sql = "UPDATE user SET password=\"{$newPassword}\" WHERE id=\"{$id}\"";
		$statement = $this->pdo->prepare($sql);
//		$params = [
//			':nickname' => $nickname,
//			':email' => $email,
//			':password' => $password,
//			':imgUrl' => $imgUrl,
//			':signature' => $signature,
//			':id' => $id,
//		];
		$result = $statement->execute();
		return $sql;
	}

	public function deleteUser($id)
	{
		$sql = "DELETE FROM user WHERE id={$id}";
		$statement = $this->pdo->prepare($sql);
		$result  = $statement->execute();
		return $result;
	}
	public function addActivity($activityName, $latitude, $longitude, $host_email, $startTime, $endTime,$applyStartTime,$applyEndTime,$theme,$introduce,$process,$coverImg,$location)
	{
		$sql = "INSERT INTO activity(activityName,latitude,longitude,host_email,startTime,endTime,applyStartTime,applyEndTime,theme,introduce,process,coverImg,location) VALUES(\"{$activityName}\",\"{$latitude}\",\"{$longitude}\",\"{$host_email}\",\"{$startTime}\",\"{$endTime}\",\"{$applyStartTime}\",\"{$applyEndTime}\",\"{$theme}\",\"{$introduce}\",\"{$process}\",\"{$coverImg}\",\"{$location}\")";

		$statement = $this->pdo->prepare($sql);
		$result = $statement->execute();
		return $result;
	}
	// public function getAllActivity(){
	// 	$sql = "SELECT * FROM activity";
	// 	$statement = $this->pdo->prepare($sql);
	// 	$result = $statement->fetch();
	// 	return $result;

	// 	// $sql = "SELECT * from user WHERE email=:email";
	// 	// $statement = $this->pdo->prepare($sql);
	// 	// $params = [':email' => $email];
	// 	// $statement->execute($params);
	// 	// $result = $statement->fetch();
	// 	// return $result;
	// }
}