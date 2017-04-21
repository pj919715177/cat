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
	
	public function addActivity($activityName, $latitude, $longitude, $host_email, $startTime, $endTime,$applyStartTime,$applyEndTime,$theme,$introduce,$process,$coverImg,$location)
	{
		$sql = "INSERT INTO activity(activityName,latitude,longitude,host_email,startTime,endTime,applyStartTime,applyEndTime,theme,introduce,process,coverImg,location) VALUES(\"{$activityName}\",\"{$latitude}\",\"{$longitude}\",\"{$host_email}\",\"{$startTime}\",\"{$endTime}\",\"{$applyStartTime}\",\"{$applyEndTime}\",\"{$theme}\",\"{$introduce}\",\"{$process}\",\"{$coverImg}\",\"{$location}\")";

		$statement = $this->pdo->prepare($sql);
		$result = $statement->execute();
		return $result;
	}
	public function getAllActivity(){
		$sql = "SELECT * FROM activity";
		$statement = $this->pdo->prepare($sql);
		$result = $statement->fetch();
		return $result;

		// $sql = "SELECT * from user WHERE email=:email";
		// $statement = $this->pdo->prepare($sql);
		// $params = [':email' => $email];
		// $statement->execute($params);
		// $result = $statement->fetch();
		// return $result;
	}
}