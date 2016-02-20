<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$con = mysql_connect("localhost","root","") or die(mysql_error());
mysql_select_db("COUNTRIES") or die(mysql_error());
$query = "SELECT id, nombre  FROM paises WHERE id_idioma=3 ORDER BY nombre";
	
$result = mysql_query($query);
$numReg = mysql_num_rows($result);
$outp = "[";
for ($i=0; $i<$numReg; $i++) {
	$row = mysql_fetch_array($result);	
	if ($outp != "[") {$outp .= ",";}
	$outp .= '{"id":"' . $row["id"] . '", ' .
				'"nombre":"' . $row["nombre"] . '"}';
}

$outp .=  "]";
//$con->close();

echo($outp);
?>