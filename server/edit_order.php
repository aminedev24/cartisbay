<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'db_connection.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if all required fields are present
    $requiredFields = ['order_id', 'make', 'quantity', 'rim_diameter', 'type', 'width', 'aspect_ratio'];
    
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            // Log the missing or empty field
            $errorMessage = "Missing or empty field: $field";
            error_log($errorMessage);

            // Additionally, log the whole data array to see what is present
            error_log("Data received: " . print_r($data, true));

            echo json_encode(['success' => false, 'message' => $errorMessage]);
            exit;
        }
        
        // Log each field value for debugging
        error_log("Field: $field, Value: " . (empty($data[$field]) ? "EMPTY" : $data[$field]));
    }

    // Retrieve data from the request
    $orderId = $data['order_id'];
    $make = $data['make'];
    $quantity = $data['quantity'];
    $rim_diameter = $data['rim_diameter'];
    $type = $data['type'];
    $width = $data['width'];
    $aspect_ratio = $data['aspect_ratio'];
    $load_index = $data['load_index'] ?? null;
    $speed_rating = $data['speed_rating'] ?? null;

    // Check if an existing order matches by make, type, width, aspect_ratio, and rim_diameter
    $query = "SELECT id, quantity FROM tireorders WHERE make=? AND type=? AND width=? AND aspect_ratio=? AND rim_diameter=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssss", $make, $type, $width, $aspect_ratio, $rim_diameter);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // If a matching order is found, accumulate quantities
        $existingOrder = $result->fetch_assoc();
        $newQuantity = $existingOrder['quantity'] + $quantity; // Accumulate quantity

        // Update the existing order with the accumulated quantity
        $updateQuery = "
            UPDATE tireorders 
            SET quantity=?, load_index=?, speed_rating=? 
            WHERE id=?";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bind_param("issi", $newQuantity, $load_index, $speed_rating, $existingOrder['id']);

        if ($updateStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Order updated successfully and quantities accumulated.']);
        } else {
            $errorMessage = 'Failed to update order: ' . $updateStmt->error;
            error_log($errorMessage);
            echo json_encode(['success' => false, 'message' => 'Failed to update order.']);
        }
    } else {
        // If no matching order exists, proceed with updating the original order
        $updateQuery = "
            UPDATE tireorders 
            SET make=?, quantity=?, load_index=?, speed_rating=?, rim_diameter=?, type=?, width=?, aspect_ratio=? 
            WHERE id=?";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bind_param("sissssssi", $make, $quantity, $load_index, $speed_rating, $rim_diameter, $type, $width, $aspect_ratio, $orderId);

        if ($updateStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Order updated successfully.']);
        } else {
            $errorMessage = 'Failed to update order: ' . $updateStmt->error;
            error_log($errorMessage);
            echo json_encode(['success' => false, 'message' => 'Failed to update order.']);
        }
    }

    $stmt->close();
} else {
    $errorMessage = 'Invalid request method: ' . $_SERVER['REQUEST_METHOD'];
    error_log($errorMessage);
}

$conn->close();
?>
