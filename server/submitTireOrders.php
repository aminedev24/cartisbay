<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');


// Database connection parameters
$host = 'localhost:3306'; // Your database host
$db = 'yqjezvte_artisbay'; // Your database name
$user = 'abdennour'; // Your database user, usually 'root' in local setups
$pass = 'phpmyadminplt001'; // Your database password, leave blank if using XAMPP/WAMP by default


$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the order details from the request
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if JSON was properly decoded
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON format."]);
        exit;
    }

    // Check if order details are provided
    if (empty($data['order_details']) || !is_array($data['order_details'])) {
        echo json_encode(["status" => "error", "message" => "Order details are required."]);
        exit;
    }

    // Loop through each order and insert into the database
    foreach ($data['order_details'] as $order) {
        // Debugging: Output the order data
        error_log("Order Data: " . print_r($order, true));

        // Prepare the SQL statement to insert the order into the tireOrders table
        $stmt = $conn->prepare("INSERT INTO tireOrders (user_id, make, `type`, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        if (!$stmt) {
            echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement. Error: " . $conn->error]);
            exit;
        }

        // Convert values to integers and handle NULLs for optional fields
        $userId = intval($order['user_id']);
        $make = $order['maker'];
        $type = $order['type'];
        $width = intval($order['width']);
        $aspectRatio = !empty($order['aspectRatio']) ? intval($order['aspectRatio']) : NULL;
        $rimDiameter = intval($order['rimDiameter']);
        $quantity = intval($order['quantity']);
        $speedRating = !empty($order['speedRating']) ? $order['speedRating'] : NULL;
        $loadIndex = !empty($order['loadIndex']) ? intval($order['loadIndex']) : NULL;

        // Debugging: Check if the types of the values match what is expected
        error_log("Binding parameters for maker: $make, type: $type, width: $width, rim_diameter: $rimDiameter");

        // Bind the parameters
        $stmt->bind_param("issiiisii", 
            $userId,
            $make, 
            $type, 
            $width, 
            $aspectRatio, 
            $rimDiameter, 
            $quantity, 
            $speedRating, 
            $loadIndex
        );

        // Execute the order insertion query
        if (!$stmt->execute()) {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to place the order for " . $make . " " . $type . ". Error: " . $stmt->error
            ]);
            $stmt->close();
            $conn->close();
            exit;
        }
        
        // Close the statement after each execution
        $stmt->close();
    }

    echo json_encode([
        "status" => "success",
        "message" => "All orders placed successfully."
    ]);

    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
