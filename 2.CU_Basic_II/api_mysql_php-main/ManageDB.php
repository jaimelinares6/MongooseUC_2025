<?php
include_once 'DB.php';
class ManageBD extends DB{
  public function getQueries(){
	$matricula= $this->connect()->query('SELECT s.ID,s.name, s.tot_cred,  t.course_id, t.semester, t.year, t.grade  FROM student s INNER JOIN takes t WHERE s.ID = t.ID AND dept_name="Physics"');
	$department = $this->connect()->query('SELECT *  FROM department d WHERE  d.dept_name="Physics"');
	$queries = array (
		"matricula"=>$matricula,
		"department"=>$department
	);
	
		return $queries;
	
	}
	/*echo "<pre>";
	print_r($queries);
	echo "</pre>";*/
}
?>