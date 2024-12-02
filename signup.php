<?php
// signup.php

// Database connection parameters
$host = 'localhost:3306'; // Your database host
$db = 'yqjezvte_artisbay'; // Your database name
$user = 'abdennour'; // Your database user, usually 'root' in local setups
$pass = 'phpmyadminplt001'; // Your database password, leave blank if using XAMPP/WAMP by default

// Create a new MySQLi connection
$conn = new mysqli($host, $user, $pass, $db);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
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
        echo "All fields are required.";
        exit;
    }

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, country, phone) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $fullName, $email, $hashedPassword, $country, $phone);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Account created successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
}

$conn->close();
?>
