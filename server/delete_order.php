<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'db_connection.php'; // Include your database connection

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Exit for preflight requests
}

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if either 'order_id' or 'clear_all' is present in the request
    if (isset($data['clear_all']) && $data['clear_all'] === true) {
        // Clear all orders
        $stmt = $conn->prepare("DELETE FROM tireorders");
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'All orders have been cleared.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to clear all orders.']);
        }
        $stmt->close();
    } elseif (isset($data['order_id']) && !empty($data['order_id'])) {
        // Delete a specific order
        $orderId = $data['order_id'];

        $stmt = $conn->prepare("DELETE FROM tireorders WHERE id=?");
        $stmt->bind_param("i", $orderId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Order deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete the order.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing or invalid fields']);
    }
}

$conn->close();
?>
