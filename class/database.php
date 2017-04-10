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
		$this->host = '127.0.0.1';
		$this->database = 'cat';
		$this->user = 'root';
		$this->pass = 'pj129620';
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
	
	public function addUser($nickname, $email, $password, $imgUrl, $signature, $createTime)
	{
		$sql = "INSERT INTO user(nickname,email,password,imgUrl,signature,createTime) VALUES(\"{$nickname}\",\"{$email}\",\"{$password}\",\"{$imgUrl}\",\"{$signature}\",{$createTime})";
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

	public function getUser($id)
	{
		$sql = "SELECT * from user WHERE id=:id";
		$statement = $this->pdo->prepare($sql);
		$params = [':id' => $id];
		$statement->execute($params);
		$result = $statement->fetch();
		return $result;
	}
	
	public function editUser($id, $nickname, $email, $password, $imgUrl, $signature)
	{
		$sql = "UPDATE user SET nickname=\"{$nickname}\",email=\"{$email}\",password=\"{$password}\",imgUrl=\"{$imgUrl}\",signature=\"{$signature}\" WHERE id=\"{$id}\"";
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

	public function deleteUser($id)
	{
		$sql = "DELETE FROM user WHERE id={$id}";
		$statement = $this->pdo->prepare($sql);
		$result  = $statement->execute();
		return $result;
	}
}