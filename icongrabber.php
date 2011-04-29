<?php
$ch = curl_init($_GET['s']."/apple-touch-icon.png");
curl_setopt($ch, CURLOPT_NOBODY, true);
curl_exec($ch);
$retcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if($retcode == 200) {
    $iconed = $_GET['s']."/apple-touch-icon.png";    
    $ctype="image/png";
} else {    
    $ch = curl_init($_GET['s']."/favicon.ico");
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_exec($ch);
    $retcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if($retcode == 200) {
        $iconed = $_GET['s']."/favicon.ico";
        $ctype="image/ico";
    }
    else {
        $iconed = "http://appautopsy.com/images/icon.png";
        $ctype="image/png";
    }
}
header("Content-Type: $ctype"); 

$ch = curl_init($iconed);
curl_exec($ch);
?>