<?php
// CORS headers for all requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow Content-Type header
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request (Preflight check)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Send a 200 response for preflight requests
    http_response_code(200);
    exit; // Exit here so the rest of the script does not run for OPTIONS
}

include 'db_connection.php'; // Include your database connection

// If the request method is POST, proceed with processing the data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the POST data (the body of the request)
    $data = json_decode(file_get_contents('php://input'), true);

    // List of required fields
    $requiredFields = ['user_id', 'make', 'type', 'width', 'aspect_ratio', 'rim_diameter', 'quantity'];

    // Check for missing fields
    $missingFields = array_filter($requiredFields, fn($field) => !isset($data[$field]));

    // If there are missing fields, log the error and return an error message
    if (!empty($missingFields)) {
        $missingFieldsMessage = 'Missing required fields: ' . implode(', ', $missingFields);
        error_log($missingFieldsMessage); // Log the missing fields error
        echo json_encode(['message' => $missingFieldsMessage]);
        http_response_code(400); // Bad request if fields are missing
        exit;
    }

    // Extract data from the request
    $uid = $data['user_id'];
    $make = $data['make'];
    $type = $data['type'];
    $width = $data['width'];
    $aspect_ratio = $data['aspect_ratio'];
    $rim_diameter = $data['rim_diameter'];
    $quantity = $data['quantity'];
    $speed_rating = $data['speed_rating'] ?? null;
    $load_index = $data['load_index'] ?? null;

    // SQL query to insert data into the tireorders table
    $sql = "INSERT INTO tireorders (user_id, make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        $errorMessage = "Failed to prepare the SQL statement. Error: " . $conn->error;
        error_log($errorMessage); // Log error for failed query preparation
        echo json_encode(['message' => 'Error preparing the SQL statement.']);
        http_response_code(500); // Internal Server Error
        exit;
    }

    $stmt->bind_param(
        "sssiiisii", 
        $uid, // Use uid from session
        $make, 
        $type, 
        $width, 
        $aspect_ratio, 
        $rim_diameter, 
        $quantity, 
        $speed_rating, 
        $load_index
    );

    // Execute the statement and check if it was successful
    if ($stmt->execute()) {
        $order_id = $stmt->insert_id; // Get the last inserted ID
        echo json_encode(['message' => 'Order saved successfully!', 'order_id' => $order_id]);
        http_response_code(200); // OK status code
    } else {
        $errorMessage = "Error executing the SQL statement. Error: " . $stmt->error;
        error_log($errorMessage); // Log error for failed query execution
        echo json_encode(['message' => 'Error saving the order.']);
        http_response_code(500); // Internal Server Error if something goes wrong
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
