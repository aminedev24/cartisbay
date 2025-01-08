<?php
session_start();

// Enable CORS for localhost development
include 'headers.php';
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data from the request
    $fullName = $data['fullName'];
    $email = $data['email'];
    $terms = $data['terms'] ? 'Agreed' : 'Not Agreed';

    // Ensure user_id is stored in session
    if (!isset($_SESSION['user_id'])) {
        http_response_code(400);
        echo json_encode(["message" => "User is not logged in."]);
        exit;
    }

    // Step 1: Insert the agreement data into the agreements table, along with name and email
    $user_id = $_SESSION['user_id'];  // Use correct syntax for session variable
    
    $accepted_at = date("Y-m-d"); // Only the date (no time)

    // Prepare SQL query to insert the data, including name and email
    $stmt = $conn->prepare("INSERT INTO agreements (user_id, accepted_at, name, email) VALUES (?, ?, ?, ?)");
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to prepare SQL statement."]);
        exit;
    }

    // Bind the parameters and execute the query
    $stmt->bind_param("isss", $user_id, $accepted_at, $fullName, $email);  // Fixed: removed $agreement_version
    if ($stmt->execute()) {
        // Step 2: Send an email to the admin
        $to = 'your-email@example.com'; // Replace with your email address
        $subject = "New Terms Agreement Submission";
        $message = "A user has agreed to the terms and conditions.\n\nFull Name: $fullName\nEmail: $email\nAgreement: $terms\nDate: $accepted_at";
        $headers = "From: no-reply@example.com";

        if (mail($to, $subject, $message, $headers)) {
            http_response_code(200);
            echo json_encode(["message" => "Data received, email sent to admin, and agreement stored."]);
        } else {
            // Mail failed
            http_response_code(500);
            echo json_encode(["message" => "Error sending email."]);
        }
    } else {
        // SQL execution failed
        http_response_code(500);
        echo json_encode(["message" => "Error storing agreement data."]);
    }

    // Clean up
    $stmt->close();
    $conn->close();
}
?>
