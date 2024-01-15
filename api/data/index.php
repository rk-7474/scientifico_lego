<?php
include "../../libs/sql/db.php";

$uri = $_SERVER['REQUEST_URI'];
$path = explode("/", $uri);
$len = count($path);
$id = $path[$len-1];
$parent = $path[$len-2];

if (strcmp($parent, "rooms") !== 0 or empty($id)) {
    header("Location: /home");
    exit;
}

if ( $_SERVER['REQUEST_METHOD'] === "GET") {
    $room_data = select($id);

    // if ($room_data === FALSE) {
    //     header("Location: /home");
    //     exit; 
    // }

    echo "$room_data";
} else {
    $data = file_get_contents('php://input');
    $id = $_POST["id"];
    
    if (empty($data)) {
        exit;
    }

    json_decode($data);

    if (json_last_error() == JSON_ERROR_NONE) {
        exit;
    }

    update($id, $data);
}

?>