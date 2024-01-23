<?php
include "../../libs/sql/db.php";
include "../../libs/log.php";

if ( $_SERVER['REQUEST_METHOD'] === "GET") {
    $room_data = select_all();
    echo json_encode($room_data);
}

?>