<?php
include "../../libs/sql/db.php";
include "../../libs/zip.php";

function failure($id) {
    header("Location: /create?error=$id");
    exit;
}

$label=$_POST['label'];
$desc=$_POST['desc'];
$img=$_POST['img'];

$id = uniqid();

$model= $_FILES['file'];
$name = $model['name'];
$path = "../../files/$id";
$file = "$path/$name";
$temp = $model['tmp_name'];

mkdir($path);

if (!str_contains($name, ".zip")) {
    failure(3);
    unlink($temp);
}

move_uploaded_file($temp, $file);

if(!unZip($path, $name)) exit;

if (!file_exists("$path/textures/") or !file_exists("$path/scene.gltf")) failure(4);

create($id, $label, $desc, $img);

header("Location: /rooms/$id");

?>