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
        $idUser = $params['id_user'];
        $title = $params['title'];
        $category = $params['category'];
        $short = $params['short'];
        $todayVisit = date("Y-m-d H:i:s");


        $sql2 = "UPDATE posts SET active='4' WHERE id_post=".$idPost."";

        if ($conn->query($sql2) === TRUE) {
            $sql = "INSERT INTO posts (id_user, rating, id_post_type, titulo, date_created, short_content) VALUES ('$idUser', '5', '$category', '$title', '$todayVisit', '$short')";

            if ($conn->query($sql) === TRUE) {
                $last_id = $conn->insert_id;
                $sql2 = "SELECT id_post FROM posts WHERE id_post=".$last_id."";
                $result2 = $conn->query($sql2);

                if ($result2->num_rows > 0) {
                
                    while($row2 = $result2->fetch_assoc()) {
                        $array[] = array_map('utf8_encode', $row2);
                    }
                    $res = json_encode($array, JSON_NUMERIC_CHECK);
                    header('Content-Type: application/json');
                    echo $res;
                } else {
                    echo "0";
                }
                
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
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