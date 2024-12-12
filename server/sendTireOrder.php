<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (replace '*' with 'http://localhost:3000' for stricter access)
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, authorization headers, etc.)
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $maker = isset($_POST['make']) ? htmlspecialchars(trim($_POST['make'])) : null;
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : null;
    $width = isset($_POST['width']) ? htmlspecialchars(trim($_POST['width'])) : null;
    $aspectRatio = isset($_POST['aspect_ratio']) ? htmlspecialchars(trim($_POST['aspect_ratio'])) : null;
    $rimDiameter = isset($_POST['rim_diameter']) ? htmlspecialchars(trim($_POST['rim_diameter'])) : null;
    $loadIndex = isset($_POST['load_index']) ? htmlspecialchars(trim($_POST['load_index'])) : null;
    $speedRating = isset($_POST['speed_rating']) ? htmlspecialchars(trim($_POST['speed_rating'])) : null;
    $quantity = isset($_POST['quantity']) ? htmlspecialchars(trim($_POST['quantity'])) : null;
    $type = isset($_POST['type']) ? htmlspecialchars(trim($_POST['type'])) : null;
    $customerMessage = isset($_POST['customerMessage']) ? htmlspecialchars(trim($_POST['customerMessage'])) : null;

    // Validate the inputs
    if (!$maker || !$email || !$width || !$aspectRatio || !$rimDiameter || !$loadIndex || !$speedRating || !$quantity || !$type) {
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
        exit; // Stop the script execution
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit;
    }

    // Prepare email
    $to = "me@example.com"; // Replace with your email
    $subject = "New Tire Order Received";
    $body = "New Tire Order Details:\n\n" .
            "Maker: $maker\n" .
            "Width: $width\n" .
            "Aspect Ratio: $aspectRatio\n" .
            "Rim Diameter: $rimDiameter\n" .
            "Load Index: $loadIndex\n" .
            "Speed Rating: $speedRating\n" .
            "Quantity: $quantity\n" .
            "Type: $type\n" .
            "Customer Message: $customerMessage";

    $headers = "From: " . $email; // Replace with a valid sender email

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Order sent successfully!"]);
    } else {
        // Capture more detailed error message if mail fails
        $error = error_get_last();
        echo json_encode([
            "status" => "error",
            "message" => "Failed to send order. Error: " . $error['message']
        ]);
    }
} else {
    // Handle incorrect request method
    echo json_encode(["status" => "error", "message" => "Invalid request method. Only POST requests are allowed."]);
}
?>
