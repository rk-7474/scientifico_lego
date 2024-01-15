<?php
    function init() {
        $host = "localhost";
        $username = "root";
        $password = "";
        $database = "rooms";
    
        $conn = new mysqli($host, $username, $password, $database);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    }
?>