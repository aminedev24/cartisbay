<?php
// signup.php
session_start();

// Database connection parameters
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include 'db_connection.php'; // Include your database connection

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
    $_SESSION['uid'] = $uid; // <-- Corrected line, added the semicolon

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
