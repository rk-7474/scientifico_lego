<?php
    include "sql.php";

    function create($id) {
        $conn = init();
        $insert = "INSERT INTO rooms (id, data) VALUES ('$id', '{}')";
    
        return ($conn->query($insert));
    }

    function update($id, $data) {
        $conn = init();
        
        $update = "UPDATE rooms SET data = '$data' WHERE id = '$id'";
        return ($conn->query($update));
    }

    function select($id) {
        $conn = init();

        $select = "SELECT data FROM rooms WHERE id = '$id'";
        $result = $conn->query($select);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['data'];
        } else {
            return FALSE;
        }
        
    }

    function exists($id) {
        $conn = init();

        $select = "SELECT * FROM rooms WHERE id = '$id'";
        $result = $conn->query($select);
    
        return ($result === TRUE and $result->num_rows > 0);
    }

?>