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

    $sql = "SELECT t1.id_post, t1.id_user, t1.id_post_type, t1.titulo, t1.date_created, t1.img, b.name FROM posts as t1
    INNER JOIN posts_type as b on b.id_post_type=t1.id_post_type
        INNER JOIN 
        (
           SELECT MAX(id_post_type) AS ID, MAX(date_created) AS MAXDATE
           FROM posts
           GROUP BY id_post_type
        ) t2
        ON t1.id_post_type = t2.ID
        AND t1.date_created = t2.MAXDATE
        AND t1.active = 1
        ORDER by t1.date_created DESC
        LIMIT 4";
    
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
	echo "Not valid Data";
}

$conn->close();
?>