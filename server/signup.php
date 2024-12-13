<?php
session_start();

// Handle CORS preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Allow headers, credentials, and methods for the preflight request
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    exit; // End the preflight request here
}

// Handle POST request
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include 'db_connection.php'; // Include your database connection

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = isset($_POST['full-name']) ? $_POST['full-name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $country = isset($_POST['country']) ? $_POST['country'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';

    // Validate input
    if (empty($fullName) || empty($email) || empty($password) || empty($country) || empty($phone)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        error_log("Signup failed: All fields are required.");
        exit;
    }

    // Generate a unique ID
    $uid = uniqid('user_', true); // Generates a unique ID prefixed with 'user_'
    $_SESSION['uid'] = $uid; // Store UID in session

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind the database statement
    $stmt = $conn->prepare("INSERT INTO users (uid, full_name, email, password, country, phone, joined_date) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    if (!$stmt) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Database prepare failed: ' . $conn->error]);
        error_log("Database prepare failed: " . $conn->error);
        exit;
    }
    $stmt->bind_param("ssssss", $uid, $fullName, $email, $hashedPassword, $country, $phone);

    // Execute the statement
    if ($stmt->execute()) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'uid' => $uid]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Error: ' . $stmt->error]);
        error_log("Signup failed: " . $stmt->error);
    }

    // Close statement and connection
    $stmt->close();
}

$conn->close();
?>
