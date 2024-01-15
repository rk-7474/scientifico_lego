<?php
include "../../libs/sql/db.php";
include "../../libs/zip.php";

$id=$_POST['id'];

if (exists($id)) {
    exit;
}

$model=$_FILES['file'];
$name = $model['name'];
$path = "../../files/$id";
$file = "$path/$name";

mkdir($path);
s_log($model['tmp_name']);
move_uploaded_file($model['tmp_name'], $file);

if(!unZip($path, $name)) exit;

create($id, $path);

header("Location: /rooms/$id");

?>