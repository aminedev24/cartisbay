<?php
include 'db_connection.php'; // Include your database connection file
include 'headers.php';       // Include headers if needed for CORS, etc.

session_start(); // Ensure the session is started

// Ensure user_id is set in the session
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Unauthorized access. User not logged in."]);
    exit();
}

$user_id = $_SESSION['user_id']; // Get user ID from session

// Prepare the SQL query to fetch invoice details
$sql = "SELECT invoice_number, customer_name, email, deposit_amount, description, created_at, deposit_purpose 
        FROM invoices 
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
    $invoices = [];
    while ($row = $result->fetch_assoc()) {
        $invoices[] = $row; // Add each invoice to the array
    }
    // Return the data as JSON
    header('Content-Type: application/json');
    echo json_encode($invoices);
} else {
    // Return an empty JSON array if no invoices found
    header('Content-Type: application/json');
    echo json_encode([]);
}

// Close the statement and database connection
$stmt->close();
$conn->close();
?>
