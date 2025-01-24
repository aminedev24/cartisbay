<?php
include 'db_connection.php';
include 'headers.php';

$user_id = $_SESSION['user_id']; // Assuming user_id is stored in the session
$session_id = session_id();

// SQL query to fetch invoice details
$user_id = $_SESSION['user_id']; // Ensure session_start() is called earlier in the script

// Query to select data from the invoices table for the specific user
$sql = "SELECT invoice_number, customer_name, email, deposit_amount, description, created_at, deposit_purpose 
        FROM invoices 
        WHERE user_id = ?";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $invoices = [];
    while ($row = $result->fetch_assoc()) {
        $invoices[] = $row;
    }
    // Return data as JSON
    header('Content-Type: application/json');
    echo json_encode($invoices);
} else {
    echo json_encode([]);
}

$conn->close();
