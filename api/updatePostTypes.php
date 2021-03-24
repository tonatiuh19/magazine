<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require_once('db_cnn/cnn.php');
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
	$requestBody=file_get_contents('php://input');
	$params= json_decode($requestBody);
	$params = (array) $params;

	if ($params['id_post']) {
        
		$idPost = $params['id_post'];
        $idPostAttach = $params['id_post_attachment'];
        $type = $params['id_post_attachment_type'];
        $content = $params['content'];
        $order_post = $params['order_post'];
        $todayVisit = date("Y-m-d H:i:s");

        $sql2 = "UPDATE posts_attachment SET active='0' WHERE id_post_attachment=".$idPostAttach."";

        if ($conn->query($sql2) === TRUE) {
            $sql = "INSERT INTO posts_attachment (id_post_attachment_type, content, id_post, order_post, date, active) VALUES ('$type', '$content', '$idPost', '$order_post', '$todayVisit', '1')";

            if ($conn->query($sql) === TRUE) {
                echo "1";
            } else {
                echo "0";
            }
        } else {
            echo "Error updating record: " . $conn->error;
        }

        
	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

$conn->close();
?>