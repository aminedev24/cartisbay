<?php

// Get the Origin header from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Set the allowed origins dynamically
$allowedOrigins = ['http://localhost:3000', 'https://artisbay.com'];

// Check if the incoming request's origin matches any of the allowed origins
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Include Authorization header
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include 'db_connection.php'; // Include database connection

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No content
    exit();
}

// Retrieve the Authorization header
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized: Missing Authorization header']);
    exit();
}

// Extract the UID from the Authorization header
$authHeader = $headers['Authorization'];
$uid = str_replace('Bearer ', '', $authHeader);

if (empty($uid)) {
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized: Invalid UID']);
    exit();
}

// Prepare the SQL statement
$query = "SELECT * FROM tireorders WHERE user_id = ?";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    http_response_code(500);
    echo json_encode(['message' => 'Database query preparation failed', 'error' => $conn->error]);
    exit();
}

// Bind the UID as a parameter
if (!$stmt->bind_param("s", $uid)) {
    http_response_code(500);
    echo json_encode(['message' => 'Parameter binding failed', 'error' => $stmt->error]);
    exit();
}

// Execute the statement
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['message' => 'Database query execution failed', 'error' => $stmt->error]);
    exit();
}

// Fetch results
$result = $stmt->get_result();
$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

// Return results as JSON
echo json_encode($orders);

// Close statement and connection
$stmt->close();
$conn->close();
?>
