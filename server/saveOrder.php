<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $requiredFields = ['user_id', 'make', 'type', 'width', 'aspect_ratio', 'rim_diameter', 'quantity'];
    $missingFields = array_filter($requiredFields, fn($field) => !isset($data[$field]));

    if (!empty($missingFields)) {
        $missingFieldsMessage = 'Missing required fields: ' . implode(', ', $missingFields);
        error_log($missingFieldsMessage);
        echo json_encode(['message' => $missingFieldsMessage]);
        http_response_code(400);
        exit;
    }

    $uid = $data['user_id'];
    $make = $data['make'];
    $type = $data['type'];
    $width = $data['width'];
    $aspect_ratio = $data['aspect_ratio'];
    $rim_diameter = $data['rim_diameter'];
    $quantity = $data['quantity'];
    $speed_rating = $data['speed_rating'] ?? null;
    $load_index = $data['load_index'] ?? null;

    $sql = "INSERT INTO tireorders (`user_id`, make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        $errorMessage = "Failed to prepare the SQL statement. Error: " . $conn->error;
        error_log($errorMessage);
        echo json_encode(['message' => 'Error preparing the SQL statement.']);
        http_response_code(500);
        exit;
    }

    $stmt->bind_param(
        "sssiiisii", 
        $uid, 
        $make, 
        $type, 
        $width, 
        $aspect_ratio, 
        $rim_diameter, 
        $quantity, 
        $speed_rating, 
        $load_index
    );

    // Log the SQL and parameters for debugging
    error_log("Executing SQL: $sql");
    error_log("Parameters: uid=$uid, make=$make, type=$type, width=$width, aspect_ratio=$aspect_ratio, rim_diameter=$rim_diameter, quantity=$quantity, speed_rating=$speed_rating, load_index=$load_index");

    if ($stmt->execute()) {
        $order_id = $stmt->insert_id;
        echo json_encode(['message' => 'Order saved successfully!', 'order_id' => $order_id]);
        http_response_code(200);
    } else {
        $errorMessage = "Error executing the SQL statement. Error: " . $stmt->error;
        error_log($errorMessage);
        echo json_encode(['message' => 'Error saving the order.']);
        http_response_code(500);
    }

    $stmt->close();
    $conn->close();
}
?>