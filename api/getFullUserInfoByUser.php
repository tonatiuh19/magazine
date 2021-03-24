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

	if ($params['id_user']) {
		$idUser = $params['id_user'];

		$sql = "SELECT a.nombre, a.apellido, a.email, a.pwd, c.id_creatives_social_networks_type, c.value, d.title FROM creatives as a 
        INNER JOIN (SELECT z.id_creatives_social_networks, z.id_user, z.id_creatives_social_networks_type, z.value, t.title FROM creatives_social_networks AS z 
        INNER JOIN creatives_social_networks_types as t on t.id_creatives_social_networks_types=z.id_creatives_social_networks_type and t.active=1
        WHERE date = ( SELECT MAX(s.date) FROM creatives_social_networks AS s WHERE z.id_creatives_social_networks_type = s.id_creatives_social_networks_type )) as c on c.id_user=a.id_user
        INNER JOIN creatives_social_networks_types as d on d.id_creatives_social_networks_types=c.id_creatives_social_networks_type
        WHERE a.active=1 and a.id_user=".$idUser." ";

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