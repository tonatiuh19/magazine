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
		$email = $params['email'];
        $pwd = $params['pwd'];
        $name = $params['name'];
        $lastName = $params['lastName'];
        $justification = $params['justification'];
        $todayVisit = date("Y-m-d H:i:s");

        $sql = "INSERT INTO creatives (email, nombre, pwd, apellido, date) VALUES ('$email', '$name', '$pwd', '$lastName', '$todayVisit')";

        if ($conn->query($sql) === TRUE) {
            $last_id = $conn->insert_id;
            $sql2 = "SELECT id_user FROM creatives WHERE id_user=".$last_id."";
            $result2 = $conn->query($sql2);

            if ($result2->num_rows > 0) {
            
                while($row2 = $result2->fetch_assoc()) {
                    $array[] = array_map('utf8_encode', $row2);
                }
                $sql5 = "INSERT INTO creatives_justification (id_user, justification, date) VALUES ('$last_id', '$justification', '$todayVisit')";

                if ($conn->query($sql5) === TRUE) {
                    $res = json_encode($array, JSON_NUMERIC_CHECK);
                    header('Content-Type: application/json');
                    echo $res;
                } else {
                    echo "Error: " . $sql5 . "<br>" . $conn->error;
                }
               
            } else {
                echo "0";
            }
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