<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include "db_connection.php";

$jwtArray = include "jwtArray.php";
$userId = $jwtArray['userId'];

$assignmentId = mysqli_real_escape_string($conn,$_REQUEST["assignmentId"]);

$sql = "SELECT title
		FROM assignment
		WHERE assignmentId = '$assignmentId'
		";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

$title = $row['title'];
$response_arr = array(
	"title"=>$title
);


 http_response_code(200);

 // make it json format
 echo json_encode($response_arr);

$conn->close();

?>

