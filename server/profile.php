<?php
session_start();

include 'db_connection.php'; // Include the database connection
include 'headers.php';
// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User  not logged in']);
    exit;
}

// Get user information
$user_id = $_SESSION['user_id'];
$sql = "SELECT full_name, email, phone, country , joined_date , company FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die(json_encode(['error' => 'SQL prepare failed: ' . $conn->error]));
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    echo json_encode(['error' => 'User  not found']);
}

$stmt->close();
$conn->close();
?>