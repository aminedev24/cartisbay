<?php
// Database connection details
include 'db_connection.php';
include 'headers.php';

session_start(); // Ensure the session is started

// Ensure user_id is set in the session
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Unauthorized access. User not logged in."]);
    exit();
}

$user_id = $_SESSION['user_id']; // Get user ID from session

// SQL query to fetch tire order details
// Secure query with a WHERE clause
$sql = "SELECT make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index, order_date 
        FROM submittedtireorders
        WHERE id = ?";
$stmt = $conn->prepare($sql); // Use prepared statements for security

if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to prepare the SQL statement."]);
    exit();
}

// Bind the user_id parameter to the query
$stmt->bind_param("i", $user_id); // "i" indicates an integer parameter

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();


if ($result->num_rows > 0) {
    $tireOrders = [];
    while ($row = $result->fetch_assoc()) {
        $tireOrders[] = $row;
    }
    // Return data as JSON
    header('Content-Type: application/json');
    echo json_encode($tireOrders);
} else {
    echo json_encode([]);
}

$conn->close();
