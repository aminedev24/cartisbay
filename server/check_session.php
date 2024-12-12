<?php
session_start();

// Get the Origin header from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Set the allowed origins dynamically
$allowedOrigins = ['http://localhost:3000', 'https://artisbay.com'];

// Check if the incoming request's origin matches any of the allowed origins
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    // Handle preflight requests for CORS
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
}

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'success',
        'user' => [
            'id' => $_SESSION['user_id'],
            'uid' => $_SESSION['uid'],
            'name' => $_SESSION['full_name'],
            'email' => $_SESSION['email'],
        ]
    ]);
} else {
    echo json_encode(['status' => 'failure']);
}
?>
