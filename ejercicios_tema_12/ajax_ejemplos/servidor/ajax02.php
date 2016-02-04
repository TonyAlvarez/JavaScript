<?php 
header("access-control-allow-origin: *");
$time = time();
$fname=htmlspecialchars($_GET["fname"]);
$lname=htmlspecialchars($_GET["lname"]);
echo 'Hi '.$fname.' '.$lname;
echo '<p>Requested at: '.date("d-m-Y H:i:s",$time).'</p>'; 
?>
