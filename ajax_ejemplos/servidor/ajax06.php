<?php
header("access-control-allow-origin: *");
header("Content-type:text/xml");
$con = mysql_connect("localhost","root","alualualu") or die(mysql_error());
mysql_select_db("CURSO") or die(mysql_error());
$query = "SELECT DEP_NO, DNOMBRE  FROM DEPARTAMENTOS ORDER BY DNOMBRE";
	
$result = mysql_query($query);
$numReg = mysql_num_rows($result);
$strHTML = "";

echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<DEPARTAMENTOS>';

for ($i=0; $i<$numReg; $i++) {
	echo '<DEPARTAMENTO>';
	$row = mysql_fetch_array($result);
	echo '<DEP_NO>';
	echo $row["DEP_NO"];
	echo '</DEP_NO>';
	echo '<DNOMBRE>';
	echo $row["DNOMBRE"];
	echo '</DNOMBRE>';
	echo '</DEPARTAMENTO>';
}
echo '</DEPARTAMENTOS>';
?>