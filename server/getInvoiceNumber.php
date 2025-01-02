<?php
// Include your database connection
include "db_connection.php"; // This should be the file with your connection details
include "headers.php";
// Query to retrieve the last invoice number
$query = "SELECT invoice_number FROM invoices ORDER BY id DESC LIMIT 1";

$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $lastInvoiceNumber = $row['invoice_number'];
    
    // Extract the numeric part using a regular expression (remove 'AB-' or other prefix)
    preg_match('/\d+/', $lastInvoiceNumber, $matches);

    // If there's a match, increment the number
    if (!empty($matches)) {
        $numericPart = $matches[0]; // Get the numeric part (e.g., 1000)
        $newInvoiceNumber =  ((int)$numericPart + 1); // Increment it and prepend 'AB-'
    } else {
        // If no numeric part, start with AB-1000
        $newInvoiceNumber = '1000';
    }
    
    // Return the new invoice number
    echo json_encode(['invoiceNumber' => $newInvoiceNumber]);
} else {
    // If no invoice exists, start with AB-1000
    echo json_encode(['invoiceNumber' => '1000']);
}

?>