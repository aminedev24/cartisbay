<?php
session_start();

// Handle CORS preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    exit;
}

// Handle POST request
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include 'db_connection.php'; // Include your database connection

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate inputs
    $fullName = isset($_POST['full-name']) ? trim($_POST['full-name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    $country = isset($_POST['country']) ? trim($_POST['country']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $company = isset($_POST['company']) ? trim($_POST['company']) : '';
    // Validate that all fields are filled
    if (empty($fullName) || empty($email) || empty($password) || empty($country) || empty($phone)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        error_log("Signup failed: All fields are required.");
        exit;
    }

    // Validate the email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Invalid email format.']);
        error_log("Signup failed: Invalid email format.");
        exit;
    }

    // Check if the email already exists
    $emailCheckQuery = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $emailCheckQuery->bind_param("s", $email);
    $emailCheckQuery->execute();
    $emailCheckResult = $emailCheckQuery->get_result();

    if ($emailCheckResult->num_rows > 0) {
        // Email already exists
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Email already exist try login in please.']);
        $emailCheckQuery->close();
        exit;
    }

    // Generate a unique ID for the user
    $uid = uniqid('user_', true); // Generates a unique ID prefixed with 'user_'
    $_SESSION['uid'] = $uid; // Store UID in session

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind the database statement for inserting the user
    $stmt = $conn->prepare("INSERT INTO users (uid, full_name, email, password, country, phone,company, joined_date) VALUES (?, ?, ?, ?, ?, ?,?, NOW())");
    if (!$stmt) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Database prepare failed: ' . $conn->error]);
        error_log("Database prepare failed: " . $conn->error);
        exit;
    }
    $stmt->bind_param("sssssss", $uid, $fullName, $email, $hashedPassword, $country, $phone, $company);

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
    $emailCheckQuery->close();
}

$conn->close();
?>
