<?php
include_once 'DB.php';
class ManageBD extends DB{
  public function getQueries(){
	$course=$this->connect()->query('SELECT * FROM course');
	$takes=$this->connect()->query('SELECT * FROM takes');
	$credit_sum=$this->connect()->query('SELECT DISTINCT SUM(credits) FROM course c INNER JOIN takes t WHERE c.course_id = t.course_id  COLLATE utf8mb4_unicode_ci;');
	$queries = array (
		"course"=>$course,
		"takes"=>$takes,
	    "credit_sum"=>$credit_sum
	);
	
		return $queries;
	
	}
}
?>