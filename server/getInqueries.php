<?php
include 'db_connection.php';
include 'headers.php';
// SQL query to fetch vehicle information
$user_id = $_SESSION['user_id']; // Ensure session_start() is called earlier in the script

// Query to select data from the submitted_inquiries table for the specific user
$sql = "SELECT make, model, year_from, year_to, price_from, price_to, body_type, mileage_from, mileage_to, transmission, steering, created_at 
        FROM submitted_inquiries 
        WHERE user_id = ?";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $vehicles = [];
    while ($row = $result->fetch_assoc()) {
        $vehicles[] = $row;
    }
    // Return data as JSON
    header('Content-Type: application/json');
    echo json_encode($vehicles);
} else {
    echo json_encode([]);
}

$conn->close();
