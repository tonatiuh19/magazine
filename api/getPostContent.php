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

		$sql = "SELECT a.id_post, a.titulo, a.date_created, a.id_post_type, a.id_user, b.name, a.short_content, a.img from posts as a
        INNER JOIN posts_type as b on b.id_post_type=a.id_post_type
        WHERE a.id_post=".$idPost."";

		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			//echo 'Hola';
			//echo $result;
			while($row = $result->fetch_assoc()) {
				$idUser = $row["id_user"];
				$array[] = array_map('utf8_encode', $row);
			}

            $sql2 = "SELECT a.id_post_attachment, a.id_post_attachment_type, a.content, a.order_post, a.img, a.date FROM posts_attachment as a
            WHERE a.active=1 and a.id_post=".$idPost."
            ORDER BY a.order_post ASC";
            $result2 = $conn->query($sql2);

            if ($result2->num_rows > 0) {
            // output data of each row
                while($row2 = $result2->fetch_assoc()) {
                    $array[] = array_map('utf8_encode', $row2);
                }
                $res = json_encode($array, JSON_NUMERIC_CHECK);
                header('Content-Type: application/json');
                echo $res;
            } else {
                echo "0 results";
            }
			
		} else {
			echo "0";
		}
	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

$conn->close();
?>