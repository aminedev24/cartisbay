<?php
session_start();
include 'headers.php';
include 'db_connection.php'; // Include the database connection

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User  not logged in']);
    exit;
}

// Get user ID from session
$user_id = $_SESSION['user_id'];

// Get the updated data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Initialize an array to hold user input
$userInput = [
    'name' => isset($data['name']) ? trim($data['name']) : '',
    'email' => isset($data['email']) ? trim($data['email']) : '',
    'phone' => isset($data['phone']) ? trim($data['phone']) : '',
    'country' => isset($data['country']) ? trim($data['country']) : '',
];

// Initialize an array to hold error messages
$errors = [];

// Check for empty fields and add to errors array
foreach ($userInput as $field => $value) {
    if (empty($value)) {
        $errors[] = ucfirst($field) . ' is required.';
    }
}

// Validate email format
if (!empty($userInput['email']) && !filter_var($userInput['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email is required.';
}

// If there are errors, return them
if (!empty($errors)) {
    echo json_encode(['error' => $errors]);
    exit;
}

// Sanitize inputs
foreach ($userInput as $field => $value) {
    $userInput[$field] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

// Prepare the SQL statement to update user data
$sql = "UPDATE users SET full_name = ?, email = ?, phone = ?, country = ? WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die(json_encode(['error' => 'SQL prepare failed: ' . $conn->error]));
}

$stmt->bind_param("ssssi", $userInput['name'], $userInput['email'], $userInput['phone'], $userInput['country'], $user_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    // Fetch the updated user data to return
    $stmt->close();
    $sql = "SELECT full_name, email, phone, country FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'User  not found']);
    }
} else {
    echo json_encode(['error' => 'No changes made or user not found']);
}

$stmt->close();
$conn->close();
?>