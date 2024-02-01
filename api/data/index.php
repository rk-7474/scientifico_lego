<?php
include "../../libs/sql/db.php";
include "../../libs/log.php";


if ( $_SERVER['REQUEST_METHOD'] === "GET") {
    $id = $_GET["id"];
    $room_data = select($id);
    echo "$room_data";
} else {
    $body = file_get_contents('php://input');

    if (empty($body)) {
        exit;
    }
    $decoded = json_decode($body, true);


    if (json_last_error() !== JSON_ERROR_NONE) {
        exit;
    }

    s_log("\n$body");

    if (!update($decoded["id"], json_encode($decoded["data"]))) exit;

}


?>