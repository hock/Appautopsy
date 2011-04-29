<?php
$ch = curl_init("http://api.ipinfodb.com/v3/ip-city/?key=34ca1c9c268b4042ecccf2ff0d3c57d9b043516bcd9a23f533e3f0adfbbb37c8&ip=".$_GET['s']."&format=json"); 
$x = curl_exec($ch); 
curl_close($ch);

?>