<?php
include "../../libs/sql/db.php";
include "../../libs/log.php";

$uri = $_SERVER['REQUEST_URI'];
$path = explode("/", $uri);
$len = count($path);
$id = $path[$len-1];
$parent = $path[$len-2];


if ( $_SERVER['REQUEST_METHOD'] === "GET") {
    // if (strcmp($parent, "rooms") !== 0 or empty($id)) {
    //     header("Location: /home");
    //     exit;
    // }

    $id = $_GET["id"];
    $room_data = select($id);

    // if ($room_data === FALSE) {
    //     header("Location: /home");
    //     exit; 
    // }
    echo "$room_data";
} else {
    
    $body = file_get_contents('php://input');
    s_log("ID: ".$body."\n");

    // $id = $_POST["id"];

    if (empty($body)) {
        exit;
    }

    $decoded = json_decode($body, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        exit;
    }

    if (!update($decoded["id"], json_encode($decoded["data"]))) exit;
}

?>