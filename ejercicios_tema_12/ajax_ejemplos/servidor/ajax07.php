<?php
header("access-control-allow-origin: *");
header("Content-Type: application/xml; charset=utf-8");
$con = mysql_connect("localhost","root","alualualu") or die(mysql_error());
mysql_select_db("CURSO") or die(mysql_error());
$query = "SELECT PRODUCTO_NO, DESCRIPCION  FROM PRODUCTOS ORDER BY DESCRIPCION";
	
$result = mysql_query($query);
$numReg = mysql_num_rows($result);
$strHTML = "";

echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<PRODUCTOS>';

for ($i=0; $i<$numReg; $i++) {
	echo '<PRODUCTO>';
	$row = mysql_fetch_array($result);
	echo '<PRODUCTO_NO>';
	echo $row["PRODUCTO_NO"];
	echo '</PRODUCTO_NO>';
	echo '<DESCRIPCION>';
	echo $row["DESCRIPCION"];
	echo '</DESCRIPCION>';
	echo '</PRODUCTO>';
}
echo '</PRODUCTOS>';
?>