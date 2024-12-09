<?php
// signup.php

// Database connection parameters
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Database connection parameters
$host = 'localhost'; // Your database host
$db = 'artisbay'; // Your database name
$user = 'root'; // Your database user, usually 'root' in local setups
$pass = ''; // Your database password, leave blank if using XAMPP/WAMP by default


$conn = new mysqli($host, $user, $pass, $db);

// Check the connection
if ($conn->connect_error) {
    // Set response header to application/json
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = $_POST['full-name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $country = $_POST['country'];
    $phone = $_POST['phone'];

    // Validate input
    if (empty($fullName) || empty($email) || empty($password) || empty($country) || empty($phone)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        exit;
    }

    // Generate a unique ID
    $uid = uniqid('user_', true); // Generates a unique ID prefixed with 'user_'

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

   // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (uid, full_name, email, password, country, phone, joined_date) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssssss", $uid, $fullName, $email, $hashedPassword, $country, $phone);

    // Execute the statement
    if ($stmt->execute()) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'uid' => $uid]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Error: ' . $stmt->error]);
    }

    // Close statement and connection
    $stmt->close();
}

$conn->close();
?>