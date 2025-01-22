<?php
include 'db_connection.php';
include 'headers.php';
// SQL query to fetch vehicle information
$sql = "SELECT make, model, year_from, year_to, price_from, price_to, body_type, mileage_from, mileage_to, transmission, steering, created_at 
        FROM submitted_inquiries";

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
