<?php
// Database connection details
include 'db_connection.php';
include 'headers.php';

$user_id = $_SESSION['user_id']; // Assuming user_id is stored in the session
$session_id = session_id();

// SQL query to fetch tire order details
// Secure query with a WHERE clause
$sql = "SELECT make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index, order_date 
        FROM submittedtireorders
        WHERE user_id = ? AND session_id = ?";
$result = $conn->query($sql);

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
