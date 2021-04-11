<?php 
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


require_once('db_cnn/cnn.php');
$response = array();

if($_FILES['avatar'])
{
    $idPost = $_POST['id_post'];
    $type = $_POST['id_post_attachment_type'];
    $content = $_POST['content'];
    $order_post = $_POST['order_post'];
    $todayVisit = date("Y-m-d H:i:s");

    $sql = "INSERT INTO posts_attachment (id_post_attachment_type, content, id_post, order_post, date, active) VALUES ('$type', '$content', '$idPost', '$order_post', '$todayVisit', '1')";

    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        //echo "New record created successfully. Last inserted ID is: " . $last_id;
        $sql2 = "SELECT id_post_attachment FROM posts_attachment WHERE id_post_attachment=".$last_id."";
        $result2 = $conn->query($sql2);

        if ($result2->num_rows > 0) {
        
            while($row2 = $result2->fetch_assoc()) {
                $idAttachment = $row2["id_post_attachment"];
            }

            $folder_path = "storage/images/".$idAttachment."/";
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
            $types = array('image/jpeg', 'image/jpg', 'image/png', 'image/jpeg'); 

            if(move_uploaded_file($_FILES['avatar']['tmp_name'], $newname)){
                
                foreach(glob('storage/images/'.$idAttachment.'/*.{jpg,pdf,png,PNG,jpeg,jpeg}', GLOB_BRACE) as $file) {
                    //echo $file;
                    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]"."/api/".$file;
                    $sqlx = "UPDATE posts_attachment SET img='$actual_link' WHERE id_post_attachment=".$last_id."";

                    if ($conn->query($sqlx) === TRUE) {
                        $response = array(
                            "status" => "1",
                            "message" => "File uploaded!"
                        );
                    } else {
                        echo "Error updating record: " . $conn->error;
                    }
                }
            }
            
        } else {
            $response = array(
                "status" => "error",
                "message" => "No attachment ID"
            );
        }
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