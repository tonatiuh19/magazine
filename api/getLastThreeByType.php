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

		$sql = "SELECT a.id_post, a.short_content, a.img, a.titulo, a.date_created from posts as a
        INNER JOIN (SELECT id_post_type from posts WHERE id_post=".$idPost.") as b on b.id_post_type = a.id_post_type
        WHERE a.active=1 AND a.id_post <> ".$idPost."
        ORDER BY a.date_created desc
        LIMIT 3";

		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			//echo 'Hola';
			//echo $result;
			while($row = $result->fetch_assoc()) {
				$array[] = array_map('utf8_encode', $row);
			}
			$res = json_encode($array, JSON_NUMERIC_CHECK);
			header('Content-Type: application/json');
			echo $res;
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