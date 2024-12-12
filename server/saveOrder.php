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

// Start the session to access session variables
//session_start();

include 'db_connection.php'; // Include your database connection

// If the request method is POST, proceed with processing the data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the POST data (the body of the request)
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate that all required fields are present
    $missingFields = []; // Array to hold missing fields

    if (!isset($data['user_id'])) {
        $missingFields[] = 'uid';
    }
    if (!isset($data['make'])) {
        $missingFields[] = 'make';
    }
    if (!isset($data['type'])) {
        $missingFields[] = 'type';
    }
    if (!isset($data['width'])) {
        $missingFields[] = 'width';
    }
    if (!isset($data['aspect_ratio'])) {
        $missingFields[] = 'aspect_ratio';
    }
    if (!isset($data['rim_diameter'])) {
        $missingFields[] = 'rim_diameter';
    }
    if (!isset($data['quantity'])) {
        $missingFields[] = 'quantity';
    }

    // If there are missing fields, return an error message
    if (!empty($missingFields)) {
        echo json_encode(['message' => 'Missing required fields: ' . implode(', ', $missingFields)]);
        http_response_code(400); // Bad request if fields are missing
        exit;
    }

    // Extract data from the request
    $uid = $data['user_id']; // Get uid from session
    $make = $data['make'];
    $type = $data['type'];
    $width = $data['width'];
    $aspect_ratio = $data['aspect_ratio'];
    $rim_diameter = $data['rim_diameter'];
    $quantity = $data['quantity'];
    $speed_rating = isset($data['speed_rating']) ? $data['speed_rating'] : null;
    $load_index = isset($data['load_index']) ? $data['load_index'] : null;

    // SQL query to insert data into the tireorders table
    $sql = "INSERT INTO tireorders (user_id, make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
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
        echo json_encode(['message' => 'Order saved successfully!']);
        http_response_code(200); // OK status code
    } else {
        echo json_encode(['message' => 'Error saving the order.']);
        http_response_code(500); // Internal Server Error if something goes wrong
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} // <-- This closing brace was missing
?>