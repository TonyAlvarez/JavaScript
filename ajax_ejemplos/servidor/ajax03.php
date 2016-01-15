<?php 
header("access-control-allow-origin: *");
$time = time();
$fname=htmlspecialchars($_POST["fname"]);
$lname=htmlspecialchars($_POST["lname"]);
echo 'Hi '.$fname.' '.$lname .' via POST';
echo '<p>Requested at: '.date("d-m-Y H:i:s",$time).'</p>'; 
?>
