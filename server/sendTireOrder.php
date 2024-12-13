<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (replace '*' with 'http://localhost:3000' for stricter access)
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, authorization headers, etc.)
header('Content-Type: application/json');

include 'db_connection.php'; // Include your database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $orderId = isset($_POST['order_id']) ? htmlspecialchars(trim($_POST['order_id'])) : null;
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : null;

    // List of required fields
    $requiredFields = [
        'order_id' => $orderId,
        'email' => $email,
    ];

    // Check for missing fields
    $missingFields = [];
    foreach ($requiredFields as $field => $value) {
        if (empty($value)) {
            $missingFields[] = $field;
        }
    }

    // If there are missing fields, return a detailed error message
    if (!empty($missingFields)) {
        $errorMessage = "Missing required fields: " . implode(', ', $missingFields);
        error_log($errorMessage);  // Log the missing fields error
        echo json_encode(["status" => "error", "message" => $errorMessage]);
        exit; // Stop the script execution
    }

    // Validate the email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMessage = "Invalid email format.";
        error_log($errorMessage);  // Log error
        echo json_encode(["status" => "error", "message" => $errorMessage]);
        exit;
    }

    // Retrieve order details from the database based on the order ID
    $conn = db_connect(); // Ensure you have a function to establish a database connection
    $sql = "SELECT * FROM tireorders WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Get the order details
            $order = $result->fetch_assoc();

            // Prepare email body with the order details
            $to = "orders@artisbay.com"; // Replace with your email
            $subject = "New Tire Order Received";
            $body = "New Tire Order Details:\n\n" .
                    "Maker: " . $order['make'] . "\n" .
                    "Width: " . $order['width'] . "\n" .
                    "Aspect Ratio: " . $order['aspect_ratio'] . "\n" .
                    "Rim Diameter: " . $order['rim_diameter'] . "\n" .
                    "Load Index: " . $order['load_index'] . "\n" .
                    "Speed Rating: " . $order['speed_rating'] . "\n" .
                    "Quantity: " . $order['quantity'] . "\n" .
                    "Type: " . $order['type'] . "\n" .
                    "Customer Message: " . $order['customer_message'];

            $headers = "From: " . $email; // Replace with a valid sender email

            // Send email
            if (mail($to, $subject, $body, $headers)) {
                // Email sent successfully, now clear the orders from the database
                $sqlDelete = "DELETE FROM tireorders WHERE order_id = ?";
                $stmtDelete = $conn->prepare($sqlDelete);

                if ($stmtDelete) {
                    $stmtDelete->bind_param("i", $orderId);
                    if ($stmtDelete->execute()) {
                        echo json_encode(["status" => "success", "message" => "Order sent and cleared from the database."]);
                    } else {
                        $errorMessage = "Order sent, but failed to clear from the database.";
                        error_log($errorMessage);  // Log error
                        echo json_encode(["status" => "error", "message" => $errorMessage]);
                    }
                    $stmtDelete->close();
                } else {
                    $errorMessage = "Failed to prepare delete query.";
                    error_log($errorMessage);  // Log error
                    echo json_encode(["status" => "error", "message" => $errorMessage]);
                }
            } else {
                // Capture more detailed error message if mail fails
                $error = error_get_last();
                $errorMessage = "Failed to send order. Error: " . $error['message'];
                error_log($errorMessage);  // Log error
                echo json_encode([ "status" => "error", "message" => $errorMessage ]);
            }
        } else {
            $errorMessage = "Order not found in the database.";
            error_log($errorMessage);  // Log error
            echo json_encode([ "status" => "error", "message" => $errorMessage ]);
        }

        $stmt->close();
    } else {
        $errorMessage = "Failed to prepare query to retrieve order details.";
        error_log($errorMessage);  // Log error
        echo json_encode([ "status" => "error", "message" => $errorMessage ]);
    }

    $conn->close();
}
?>
