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
    $missingFields = array_filter($requiredFields, fn($field) => empty($data[$field]));

    // Check for missing fields
    if (!empty($missingFields)) {
        $missingFieldsMessage = 'Missing required fields: ' . implode(', ', $missingFields);
        error_log($missingFieldsMessage);
        echo json_encode(['message' => $missingFieldsMessage]);
        http_response_code(400);
        exit;
    }

    // Get the user_id from the request data or session
    $uid = $data['user_id'] ?? null;
    if (empty($uid)) {
        $errorMessage = "User not logged in. Orders cannot be saved without a valid user ID.";
        error_log($errorMessage);
        echo json_encode(['message' => $errorMessage]);
        http_response_code(401); // Unauthorized
        exit;
    }

    // Get the rest of the order details
    $make = $data['make'];
    $type = $data['type'];
    $width = $data['width'];
    $aspect_ratio = $data['aspect_ratio'];
    $rim_diameter = $data['rim_diameter'];
    $quantity = $data['quantity'];
    $speed_rating = $data['speed_rating'] ?? null;
    $load_index = $data['load_index'] ?? null;

    // Check if an existing order with the same parameters already exists
    $sql_check = "SELECT id, quantity FROM tireorders WHERE user_id = ? AND make = ? AND type = ? AND width = ? AND aspect_ratio = ? AND rim_diameter = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("ssssii", $uid, $make, $type, $width, $aspect_ratio, $rim_diameter);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        // If order already exists, update the quantity
        $existingOrder = $result->fetch_assoc();
        $newQuantity = $existingOrder['quantity'] + $quantity;
        $sql_update = "UPDATE tireorders SET quantity = ? WHERE id = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("ii", $newQuantity, $existingOrder['id']);
        if ($stmt_update->execute()) {
            echo json_encode(['message' => 'Order quantity updated successfully!', 'order_id' => $existingOrder['id']]);
            http_response_code(200);
        } else {
            echo json_encode(['message' => 'Error updating the order.']);
            http_response_code(500);
        }
        $stmt_update->close();
    } else {
        // If no existing order, insert a new one
        $sql_insert = "INSERT INTO tireorders (user_id, make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param(
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

        if ($stmt_insert->execute()) {
            $order_id = $stmt_insert->insert_id;
            echo json_encode(['message' => 'Order saved successfully!', 'order_id' => $order_id]);
            http_response_code(200);
        } else {
            echo json_encode(['message' => 'Error saving the order.']);
            http_response_code(500);
        }
        $stmt_insert->close();
    }

    $stmt_check->close();
    $conn->close();
}
?>
