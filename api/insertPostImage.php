<?php 
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


require_once('db_cnn/cnn.php');
$response = array();

if($_FILES['avatar'])
{
    $idPost = $_POST['id_post'];

    $folder_path = "storage/min/images/".$idPost."/";

    if (!file_exists($folder_path)) {
        mkdir($folder_path, 0777, true);
    }else{
        $files = glob($folder_path.'*'); // get all file names
        foreach($files as $file){ // iterate files
        if(is_file($file))
            unlink($file); // delete file
        }
    }

    $filename = basename($_FILES['avatar']['name']);
    $newname = $folder_path . $filename;
    $fileOk = 1;
    $types = array('image/jpeg', 'image/jpg', 'image/png');  

    if(move_uploaded_file($_FILES['avatar']['tmp_name'], $newname)){
        $response = array(
            "status" => "1",
            "message" => "File uploaded!"
        );
    
    } else {
        $response = array(
            "status" => "error",
            "message" => "Error uploading"
        );
    }

}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}

echo json_encode($response);
?>