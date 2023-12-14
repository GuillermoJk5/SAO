<?php

header("Access-Control-Allow-Origin: *");
// Permitir los métodos GET, POST, PUT, DELETE, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir ciertos encabezados
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// Permitir que las cookies se incluyan en las solicitudes
header("Access-Control-Allow-Credentials: true");

echo file_get_contents("../BBDD/users.txt");
?>