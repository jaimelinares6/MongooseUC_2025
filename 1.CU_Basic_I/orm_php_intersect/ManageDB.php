<?php
include_once 'DB.php';
class ManageBD extends DB{
  public function getQueries(){

	$intersect = $this->connect()->query("
    SELECT edificio FROM departamento WHERE id_departamento = 'BIOLOGY'
    INTERSECT
    SELECT edificio FROM departamento WHERE id_departamento = 'HISTORY'
");
 
	
	$queries = array (
		"intersect"=>$intersect
	);
	
		return $queries;
	
	}
}
?>