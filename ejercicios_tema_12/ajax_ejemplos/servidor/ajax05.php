<?php
header("access-control-allow-origin: *");
$con = mysql_connect("localhost","root","alualualu") or die(mysql_error());
mysql_select_db("CURSO") or die(mysql_error());
$query = "SELECT DEP_NO, DNOMBRE  FROM DEPARTAMENTOS ORDER BY DNOMBRE";
	
$result = mysql_query($query);
$numReg = mysql_num_rows($result);
$strHTML = "";

for ($i=0; $i<$numReg; $i++) {
	$row = mysql_fetch_array($result);
	$strHTML .= '<option value="'.$row["DEP_NO"].'">'.$row["DNOMBRE"].'</option>';
}
echo $strHTML;
?>