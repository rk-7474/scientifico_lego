<?php
$body = file_get_contents('php://input');

$decoded = json_decode($body, true);
$url = $decoded["url"];

$data = file_get_contents($url);

if ($data === false) {
    header("HTTP/1.1 404 Not Found");
    exit;
}

header('Content-Type: image/png'); 
echo $data;
?>
