<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json'); // Ensure JSON response

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200); // Handle OPTIONS request for CORS preflight
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Define required fields
    $required_fields = ['name', 'email', 'country', 'phone', 'enquiry', 'message'];

    // Check for missing fields
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            $error_message = "Field '$field' is required.";
            error_log("[ERROR] $error_message");
            echo json_encode(['status' => 'error', 'message' => $error_message]);
            exit();
        }
    }

    // Get and sanitize form data
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $country = htmlspecialchars($_POST['country']);
    $phone = htmlspecialchars($_POST['phone']);
    $enquiry = htmlspecialchars($_POST['enquiry']);
    $company = !empty($_POST['company']) ? htmlspecialchars($_POST['company']) : '';
    $message = htmlspecialchars($_POST['message']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Invalid email format.';
        error_log("[ERROR] $error_message");
        echo json_encode(['status' => 'error', 'message' => $error_message]);
        exit();
    }

    // Set the recipient email address
    $to = 'contact@artisbay.com'; // Replace with your business email
    $subject = $enquiry;

    // Create the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Country: $country\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Enquiry Type: $enquiry\n";
    $email_content .= "Company: $company\n";
    $email_content .= "Message:\n$message\n";

    // Set the email headers
    $headers = "From: $name <$email>";

    // Attempt to send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Email sent successfully.']);
    } else {
        $error_message = 'Unable to send email. Please check your mail server configuration.';
        error_log("[ERROR] $error_message");
        echo json_encode(['status' => 'error', 'message' => $error_message]);
    }
} else {
    $error_message = 'Invalid request method.';
    error_log("[ERROR] $error_message");
    echo json_encode(['status' => 'error', 'message' => $error_message]);
}
?>
