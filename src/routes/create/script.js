const params = new URLSearchParams(window.location.search);
let error = params.get('error');
if (error != null) error = Number(error);

switch (error) {
    case 1: toastr.error("Invalid room id"); break;
    case 2: toastr.error("A room with this id already exists"); break;
    case 3: toastr.error("Invalid room file (must be a .zip)"); break;
    case 4: toastr.error("Model file or texures folder not found in file"); break;
}

function _(el) {
    return document.getElementById(el);
}
  
function uploadFile() {
    var file = _("file1").files[0];
    // alert(file.name+" | "+file.size+" | "+file.type);
    var formdata = new FormData();
    formdata.append("file1", file);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "file_upload_parser.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
    //use file_upload_parser.php from above url
    ajax.send(formdata);
}


function switch_template() {
    console.log("switched")
    $("form").html(`
        <input type="button" value="Choose from files..." onclick="switch_file()">
        <input name="template" list="browsers">
        <input class="hidden" name="using_template" value="1">
        <input type="text" name="label" placeholder="Label">
        <input type="text" name="img" placeholder="Immagine">
        <input type="text" name="desc" placeholder="Descrizione">
        <input type="submit">
    `)
}

function switch_file() {
    console.log("switched")
    $("form").html(`
        <input type="button" value="Choose from templates..." onclick="switch_template()">
        <input type="file" name="file" class="file">
        <input type="text" name="label" placeholder="Label">
        <input type="text" name="img" placeholder="Immagine">
        <input type="text" name="desc" placeholder="Descrizione">
        <input type="submit">
    `)
}


function progressHandler(event) {
    _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
}

function completeHandler(event) {
    _("status").innerHTML = event.target.responseText;
    _("progressBar").value = 0; //wil clear progress bar after successful upload
}

function errorHandler(event) {
    _("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
    _("status").innerHTML = "Upload Aborted";
}