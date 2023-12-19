<?php

header("Access-Control-Allow-Origin: null");
// header("Access-Control-Allow-Origin: http://localhost");
// header("Access-Control-Allow-Origin: http://localhost/SAO/*") ;
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if (!isset($_GET["id"]) || !is_numeric($_GET["id"])) {
    http_response_code(400);
    echo "invalid id user";
    exit();
}

$file = "../BBDD/users/" . $_GET["id"] . ".json";

if (!file_exists($file)) {
    http_response_code(404);
    echo "user doesn't exist";
    exit();
}

// Establece el tipo de contenido
header('Content-Type: application/json');
echo file_get_contents($file);
?>