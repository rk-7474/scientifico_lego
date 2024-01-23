<?php
    include "sql.php";

    function create($id, $label) {
        $conn = init();
        $insert = "INSERT INTO rooms (id, data) VALUES ('$id', '[]', '$label')";
    
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

    function select_all() {
        $conn = init();
    
        $select = "SELECT id, label FROM rooms";
        $result = $conn->query($select);
    
        $myArr = [];
    
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($myArr, $row);
            }
        }

        return $myArr;
    }

    

    function exists($id) {
        $conn = init();

        $select = "SELECT * FROM rooms WHERE id = '$id'";
        $result = $conn->query($select);
    
        return ($result->num_rows > 0);
    }

?>