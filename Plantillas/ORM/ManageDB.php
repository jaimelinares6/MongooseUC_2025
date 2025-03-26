<?php
include_once 'DB.php';
class ManageBD extends DB{
  public function getQueries(){
  	//$nombre_carpeta=$this->connect()->query('operacion');
	$json=$this->connect()->query('SELECT m.object_mongodb FROM mongodb_objects m ');
	$queries = array (
	    //"nombre_carpeta"=>$nombre_carpeta
	    "json"=>$json
	);
		return $queries;
	
	}
}
?>
