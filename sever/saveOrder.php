<?php
// CORS headers for all requests
header("Access-Control-Allow-Origin: *"); // Allow all origins (replace '*' with 'http://localhost:3000' for stricter access)
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, authorization headers, etc.)
header('Content-Type: application/json');
// Handle OPTIONS request (Preflight check)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Send a 200 response for preflight requests
    http_response_code(200);
    exit; // Exit here so the rest of the script does not run for OPTIONS
}

    // Database connection variables
   // Database connection parameters
    $host = 'localhost:3306'; // Your database host
    $db = 'yqjezvte_artisbay'; // Your database name
    $user = 'abdennour'; // Your database user, usually 'root' in local setups
    $pass = 'phpmyadminplt001'; // Your database password, leave blank if using XAMPP/WAMP by default


    // Create a connection to the MySQL database
    $conn = new mysqli($host, $user, $pass, $db);

    // Check for connection error
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

// If the request method is POST, proceed with processing the data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Get the POST data (the body of the request)
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate that all required fields are present
    if (
        !isset($data['user_id']) ||
        !isset($data['maker']) ||
        !isset($data['type']) ||
        !isset($data['width']) ||
        !isset($data['aspectRatio']) ||
        !isset($data['rimDiameter']) ||
        !isset($data['quantity'])
    ) {
        echo json_encode(['message' => 'Missing required fields.']);
        http_response_code(400); // Bad request if fields are missing
        exit;
    }

    // Extract data from the request
    $user_id = $data['user_id'];
    $make = $data['maker'];
    $type = $data['type'];
    $width = $data['width'];
    $aspect_ratio = $data['aspectRatio'];
    $rim_diameter = $data['rimDiameter'];
    $quantity = $data['quantity'];
    $speed_rating = isset($data['speedRating']) ? $data['speedRating'] : null;
    $load_index = isset($data['loadIndex']) ? $data['loadIndex'] : null;

    // SQL query to insert data into the orders table
    $sql = "INSERT INTO tireorders (user_id, make, type, width, aspect_ratio, rim_diameter, quantity, speed_rating, load_index)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "issiiisii", 
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
}
?>
