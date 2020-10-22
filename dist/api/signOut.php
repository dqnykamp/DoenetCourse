<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include "db_connection.php";

$jwtArray = include "jwtArray.php";
$device = $jwtArray['deviceName'];
$userId = $jwtArray['userId'];

$sql = "UPDATE user_device
        SET signedIn='0'
        WHERE userId='$userId' AND deviceName = '$device'";
$result = $conn->query($sql);

// set response code - 200 OK
http_response_code(200);

// $domain = $ini_array['dbhost']; 
$domain = $_SERVER["SERVER_NAME"];
$isSecure = true;  
if ($domain=="localhost"){
  $isSecure = false;  
}
$isHttpOnly = true;
$expirationTime = -10;
setcookie("JWT", "", $expirationTime, "/", $domain, $isSecure, $isHttpOnly);
setcookie("JWT_JS", "", $expirationTime, "/", $domain, $isSecure, false);
setcookie("assignmentId", "", $expirationTime, "/", $domain, $isSecure, false);
// make it json format
// echo json_encode($response_arr);

$conn->close();

