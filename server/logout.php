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

header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, authorization headers, etc.)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Content-Type: application/json; charset=UTF-8");

include 'db_connection.php'; // Include your database connection

// Check connection
if ($conn->connect_error) {
    $errorMessage = "Connection failed: " . $conn->connect_error;
    error_log($errorMessage); // Log connection error
    die(json_encode(["status" => "error", "message" => $errorMessage]));
}

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    // Prepare the SQL query
    $stmt = $conn->prepare("UPDATE user_sessions SET is_logged_in = FALSE WHERE `uid`= ?");

    // Check if prepare() was successful
    if ($stmt === false) {
        $errorMessage = "Failed to prepare the statement. Error: " . $conn->error;
        error_log($errorMessage); // Log preparation failure
        die(json_encode(["status" => "error", "message" => $errorMessage]));
    }

    // Bind the parameter and execute the query
    $stmt->bind_param("i", $userId);
    
    if (!$stmt->execute()) {
        $errorMessage = "Failed to execute the query. Error: " . $stmt->error;
        error_log($errorMessage); // Log execution failure
        echo json_encode(["status" => "error", "message" => $errorMessage]);
    } else {
        $stmt->close();
        // Destroy the session
        session_destroy();

        echo json_encode(["status" => "success", "message" => "Logged out successfully."]);
    }
} else {
    // If no user is logged in
    $errorMessage = "User is not logged in.";
    error_log($errorMessage); // Log when no user is logged in
    echo json_encode(["status" => "error", "message" => $errorMessage]);
}

$conn->close();
?>
