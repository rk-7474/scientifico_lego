<?php
    $name = $_GET["id"];
    $file = "../../files/$name/scene.gltf";

    header('Content-Description: File Transfer');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: '.filesize($file));
    header("Content-Type: text/plain");
    readfile($file);
?>