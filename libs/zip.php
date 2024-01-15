<?php
    include "log.php";

    function unZip($path, $name) {
        $zip = new ZipArchive;

        $file = "$path/$name";

        s_log($file);

        $res = $zip->open($file);
        if ($res === TRUE) {
            s_log("ciao\n");
            $zip->extractTo($path);
            $zip->close();
            unlink($file);
            return TRUE;
        } else {
            return FALSE;
        }
    }
?>