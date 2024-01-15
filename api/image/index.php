<?php
$imageUrl = $_GET['url']; 
$imageData = file_get_contents($imageUrl);

if ($imageData === false) {
    header("HTTP/1.1 404 Not Found");
    exit;
}

header('Content-Type: image/png'); 
echo $imageData;

?>
