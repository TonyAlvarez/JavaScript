<?php 
header("access-control-allow-origin: *");
$time = time();
echo '<p>This content was requested using the GET method.</p>';
echo '<p>Requested at: '.date("d-m-Y H:i:s",$time).'</p>'; 
?>
