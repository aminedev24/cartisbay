<?php
include 'db_connection.php';
include 'headers.php';

// SQL query to fetch invoice details
$sql = "SELECT invoice_number, customer_name, email, deposit_amount, description, created_at, deposit_purpose FROM invoices";
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
