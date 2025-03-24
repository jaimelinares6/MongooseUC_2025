<?php
include_once 'DB.php';
class ManageBD extends DB{
  public function getQueries(){

	$actor= $this->connect()->query('SELECT * FROM actor');
	$film= $this->connect()->query('SELECT * FROM film');
	$queries = array (
		"actor"=>$actor,
		"film"=>$film
	);
	
		return $queries;
	
	}
}
?>