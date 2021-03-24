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

    $sql = "SELECT a.id_creatives_social_networks_types, a.title FROM creatives_social_networks_types as a
    WHERE a.active=1";
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