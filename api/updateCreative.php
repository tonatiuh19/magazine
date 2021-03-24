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

	if ($params['email']) {
        $idUser = $params['id_user'];
		$email = $params['email'];
        $pwd = $params['pwd'];
        $name = $params['name'];
        $lastName = $params['lastName'];
        $todayVisit = date("Y-m-d H:i:s");

        $sql = "UPDATE creatives SET email='$email', nombre='$name', pwd='$pwd', apellido='$lastName', date='$todayVisit' WHERE id_user=".$idUser."";

        if ($conn->query($sql) === TRUE) {
            echo "1";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
		
	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

$conn->close();
?>