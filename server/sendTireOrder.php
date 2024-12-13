<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include 'db_connection.php'; // Include database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the incoming JSON data
    $inputData = json_decode(file_get_contents("php://input"), true);

    if ($inputData === null) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data received."]);
        exit;
    }

    // Collect and sanitize inputs
    $orderIds = isset($inputData['order_ids']) ? $inputData['order_ids'] : null;
    $email = isset($inputData['email']) ? htmlspecialchars(trim($inputData['email'])) : null;
    $customerMessage = isset($inputData['customer_message']) ? htmlspecialchars(trim($inputData['customer_message'])) : '';

    // Validate required fields
    if (empty($orderIds) || empty($email)) {
        echo json_encode(["status" => "error", "message" => "Email and order IDs are required."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit;
    }

    if (!is_array($orderIds)) {
        echo json_encode(["status" => "error", "message" => "order_ids must be an array."]);
        exit;
    }

    // Prepare placeholders for SQL query
    $placeholders = implode(',', array_fill(0, count($orderIds), '?'));

    // Retrieve order details from the database
    $sql = "SELECT * FROM tireorders WHERE id IN ($placeholders)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param(str_repeat('i', count($orderIds)), ...$orderIds);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Prepare the email body
            $body = "New Tire Order Details:\n\n";
            while ($order = $result->fetch_assoc()) {
                $body .= "Order ID: " . $order['id'] . "\n" . 
                         "Maker: " . $order['make'] . "\n" . 
                         "Width: " . $order['width'] . "\n" . 
                         "Aspect Ratio: " . $order['aspect_ratio'] . "\n" . 
                         "Rim Diameter: " . $order['rim_diameter'] . "\n" . 
                         "Load Index: " . $order['load_index'] . "\n" . 
                         "Speed Rating: " . $order['speed_rating'] . "\n" . 
                         "Quantity: " . $order['quantity'] . "\n" . 
                         "Type: " . $order['type'] . "\n\n";
            }

            // Append the optional customer message
            if (!empty($customerMessage)) {
                $body .= "Customer Message: " . $customerMessage . "\n\n";
            }

            // Email details
            $to = "orders@artisbay.com";
            $subject = "New Tire Orders Received";
            $headers = "From: " . $email;

            // Send the email
            if (mail($to, $subject, $body, $headers)) {
                // Clear the orders from the database
                $deleteSql = "DELETE FROM tireorders WHERE id IN ($placeholders)";
                $stmtDelete = $conn->prepare($deleteSql);

                if ($stmtDelete) {
                    $stmtDelete->bind_param(str_repeat('i', count($orderIds)), ...$orderIds);
                    $stmtDelete->execute();
                    $stmtDelete->close();

                    echo json_encode(["status" => "success", "message" => "Orders sent successfully and cleared from the database."]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Orders sent but failed to clear from the database."]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to send the email."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "No orders found with the provided IDs."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to prepare query."]);
    }

    $conn->close();
}
?>
