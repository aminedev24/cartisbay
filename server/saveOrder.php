<?php
session_start(); // Start the session to access session variables

include 'headers.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $requiredFields = ['make', 'type', 'width', 'aspect_ratio', 'rim_diameter', 'quantity'];
    $missingFields = array_filter($requiredFields, fn($field) => empty($data[$field]));

    // Check for missing fields
    if (!empty($missingFields)) {
        $missingFieldsMessage = 'Missing required fields: ' . implode(', ', $missingFields);
        error_log($missingFieldsMessage);
        echo json_encode(['message' => $missingFieldsMessage]);
        http_response_code(400);
        exit;
    }

    // Get the user_id from the session
    $user_id = $_SESSION['user_id'] ?? null; // Use session to get user_id
    if (empty($user_id)) {
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
    $stmt_check->bind_param("ssssii", $user_id, $make, $type, $width, $aspect_ratio, $rim_diameter);
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
            // Fetch the updated order data
            $sql_fetch = "SELECT * FROM tireorders WHERE id = ?";
            $stmt_fetch = $conn->prepare($sql_fetch);
            $stmt_fetch->bind_param("i", $existingOrder['id']);
            $stmt_fetch->execute();
            $updatedOrder = $stmt_fetch->get_result()->fetch_assoc();

            echo json_encode([
                'message' => 'Order quantity updated successfully!',
                'order' => $updatedOrder
            ]);
            http_response_code(200);
        } else {
            echo json_encode(['message' => 'Error updating the order.']);
            http_response_code(500);
        }
        $stmt_update->close();
        $stmt_fetch->close();
    } else {
        // If no existing order, insert a new one
        $sql_insert = "INSERT INTO tireorders (user_id, make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param(
            "sssiiisii",
            $user_id,
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
            // Get the newly created order ID
            $order_id = $stmt_insert->insert_id;

            // Fetch the newly created order data
            $sql_fetch = "SELECT * FROM tireorders WHERE id = ?";
            $stmt_fetch = $conn->prepare($sql_fetch);
            $stmt_fetch->bind_param("i", $order_id);
            $stmt_fetch->execute();
            $newOrder = $stmt_fetch->get_result()->fetch_assoc();

            echo json_encode([
                'message' => 'Order saved successfully!',
                'order' => $newOrder
            ]);
            http_response_code(200);
        } else {
            echo json_encode(['message' => 'Error saving the order.']);
            http_response_code(500);
        }
        $stmt_insert->close();
        $stmt_fetch->close();
    }

    $stmt_check->close();
    $conn->close();
}
?>