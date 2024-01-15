<?php

function s_log($text) {
    file_put_contents('./log_'.date("j.n.Y").'.log', $text, FILE_APPEND);
}

?>