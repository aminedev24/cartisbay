<?php
// Include your database connection
require 'db_connection.php';
include 'headers.php';

// If it's a preflight request (OPTIONS), send a 200 response without processing further
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Max-Age: 86400"); // Cache the preflight response for 24 hours
    http_response_code(200);
    exit;
}

define('BASE_URL', ($_SERVER['HTTP_HOST'] === 'localhost')
    ? 'http://localhost:3000' // Local development URL
    : 'https://artisbay.com'); // Production URL

// If it's a POST request, process the forgot password request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data (JSON) from the request body
    $input = json_decode(file_get_contents('php://input'), true);

    // Check if the email field exists in the input
    if (isset($input['email'])) {
        $email = trim($input['email']); // Sanitize the email input

        // Validate the email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
            exit;
        }

        // Check if the email exists in the users table
        $query = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $query->bind_param("s", $email);
        $query->execute();
        $result = $query->get_result();

        if ($result->num_rows > 0) {
            // User exists, generate a secure random token and expiry time
            $user = $result->fetch_assoc();
            $token = bin2hex(random_bytes(32)); // Generate a secure random token
            $expiry = date('Y-m-d H:i:s', strtotime('+1 hour')); // Token valid for 1 hour

            // Save the token and expiry in the password_resets table
            $insert = $conn->prepare("INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)");
            $insert->bind_param("iss", $user['id'], $token, $expiry);
            $insert->execute();

            // Send password reset email
            $resetLink = BASE_URL . "/#/reset-password/$token"; // Updated for React route
            $subject = "Password Reset Request";
            $message = "Click the link below to reset your password:\n\n$resetLink\n\nThis link will expire in 1 hour.";
            $headers = "From: contact@artisbay.com"; // Sender email address

            // Add the recipient's email address (this should be the email the user provided)
            $to = $email;  // $email is the recipient email address

            // Check if email is sent successfully
            if (mail($to, $subject, $message, $headers)) {
                echo json_encode(['status' => 'success', 'message' => 'Password reset email sent.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to send email. Please try again.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Email not found.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email not provided.']);
    }
}
?>
