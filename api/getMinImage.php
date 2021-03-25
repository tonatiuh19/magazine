<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
	$requestBody=file_get_contents('php://input');
	$params= json_decode($requestBody);
	$params = (array) $params;

	if ($params['id_post']) {
		$id_post = $params['id_post'];
        
		foreach(glob('storage/min/images/'.$id_post.'/*.{jpg,pdf,png,PNG}', GLOB_BRACE) as $file) {
            //echo $file;
            echo $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]"."/".$file;
        }

	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

?>