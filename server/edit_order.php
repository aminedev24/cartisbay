<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *"); // Replace '*' with your frontend URL for better security
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Specify allowed methods
header("Access-Control-Allow-Headers: Content-Type"); // Specify allowed headers
header('Content-Type: application/json');

include 'db_connection.php'; // Include your database connection

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Exit for preflight requests
}

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if all required fields are present
    $requiredFields = ['order_id', 'make', 'quantity', 'rim_diameter', 'type', 'width', 'aspect_ratio'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $errorMessage = "Missing or empty field: $field";
            error_log($errorMessage); // Log the error
            echo json_encode(['success' => false, 'message' => $errorMessage]);
            exit;
        }
    }

    // Retrieve data from the JSON request
    $orderId = $data['order_id'];
    $make = $data['make'];
    $quantity = $data['quantity'];
    $rim_diameter = $data['rim_diameter'];
    $type = $data['type'];
    $width = $data['width'];
    $aspect_ratio = $data['aspect_ratio'];

    // Optional fields
    $load_index = $data['load_index'] ?? null;
    $speed_rating = $data['speed_rating'] ?? null;

    // Prepare and execute the update query on the 'orders' table
    $stmt = $conn->prepare("
        UPDATE tireorders 
        SET make=?, quantity=?, load_index=?, speed_rating=?, rim_diameter=?, type=?, width=?, aspect_ratio=? 
        WHERE id=?
    ");
    if ($stmt === false) {
        $errorMessage = 'Failed to prepare the SQL statement: ' . $conn->error;
        error_log($errorMessage); // Log the error
        echo json_encode(['success' => false, 'message' => $errorMessage]);
        exit;
    }

    $stmt->bind_param("sissssssi", $make, $quantity, $load_index, $speed_rating, $rim_diameter, $type, $width, $aspect_ratio, $orderId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Order updated successfully.']);
    } else {
        $errorMessage = 'Failed to update order: ' . $stmt->error;
        error_log($errorMessage); // Log the error
        echo json_encode(['success' => false, 'message' => 'Failed to update order.']);
    }

    $stmt->close();
} else {
    $errorMessage = 'Invalid request method: ' . $_SERVER['REQUEST_METHOD'];
    error_log($errorMessage); // Log the error
}

$conn->close();
?>
