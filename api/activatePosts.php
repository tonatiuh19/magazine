<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require_once('db_cnn/cnn.php');
echo $todayVisit = date("Y-m-d H:i:s");

$sql = "SELECT id_post FROM posts WHERE active=2 AND date_toPublish < '".$todayVisit."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $sql2 = "UPDATE posts SET active=1 WHERE id_post=".$row["id_post"]."";

    if ($conn->query($sql2) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
  }
} else {
  echo "0 results";
}

$conn->close();
?>