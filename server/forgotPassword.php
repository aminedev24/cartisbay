<?php
// Include your database connection
require 'db_connection.php';
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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

            // Send password reset email using PHPMailer
            $resetLink = BASE_URL . "/#/reset-password/$token"; // Updated for React route
            $subject = "Password Reset Request";
            $message = "
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                    }
                    .email-container {
                        background-color: #f9f9f9;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #ddd;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .email-header {
                        text-align: center;
                        background-color: #1da1f2;
                        color: white;
                        padding: 10px;
                        border-radius: 8px 8px 0 0;
                    }
                    .email-body {
                        padding: 20px;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    .reset-button {
                        background-color: #f1892b;
                        color: white;
                        padding: 12px 20px;
                        text-decoration: none;
                        border-radius: 4px;
                        text-align: center;
                        display: inline-block;
                        font-weight: bold;
                        margin-top: 20px;
                    }
                    .email-footer {
                        text-align: center;
                        font-size: 14px;
                        color: #777;
                        margin-top: 20px;
                        padding: 20px 0;
                        background-color: #f1f1f1;
                        border-radius: 0 0 8px 8px;
                    }
                    .email-footer p {
                        margin: 5px 0;
                    }
                    .email-footer .contact-info {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        flex-direction:column;
                    }
                    .email-footer .contact-info img {
                        width: 18px;
                        height: 18px;
                    }
                    .logo {
                        width: 120px;
                        height: auto;
                    }
                    .contact-info a {
                        text-decoration: none;
                        color: inherit;
                        display: flex;
                        justify-content: center;
                        align-items: baseline;
                    }
                    .contact-info i {
                        color: #1e398a;
                        }
                </style>
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'> <!-- FontAwesome CDN -->
            </head>
            <body>
                <div class='email-container'>
                    <div class='email-header'>
                        <h2>Password Reset Request</h2>
                    </div>
                    <div class='email-body'>
                        <p>Dear User,</p>
                        <p>We received a request to reset your password for your account. If you did not request this change, please disregard this email.</p>
                        <p>To reset your password, please click the link below. This link will expire in 1 hour for security reasons:</p>
                        <p><a href=\"$resetLink\" class=\"reset-button\">Reset Your Password</a></p>
                        <p>If you encounter any issues or did not request this reset, please contact our support team immediately.</p>
                    </div>
                    <div class='email-footer'>
                        <div>
                            <img src='https://artisbay.com/images/Signatureforemail.png' alt='Artisbay Inc. Logo' class='logo'>

                            <p><strong>Your trusted platform for the sale and export of used vehicles and auto parts</strong></p>
                            <p>Registered in Japan | License No. 7839499</p>
                            <div class='contact-info'>
                                <a href='mailto:info@artisbay.com'>
                                    <i class='fas fa-envelope'></i>
                                    contact@artisbay.com
                                </a>
                                <a href='https://www.artisbay.com'>
                                    <i class='fas fa-globe'></i>
                                    www.artisbay.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        ";
        
        
        
        
            // Create a new PHPMailer instance
            $mail = new PHPMailer(true);

            try {
                //Server settings
                $mail->isSMTP();
                $mail->Host = 'localhost'; // MailHog SMTP server
                $mail->SMTPAuth = false; // No authentication required
                $mail->Port = 1025; // MailHog SMTP port
                $mail->SMTPSecure = false; // Disable TLS/SSL

                // Recipients
                $mail->setFrom('noreply@artisbay.com', 'Artisbay Inc.');
                $mail->addAddress($email); // Add the recipient's email address

                // Content
                $mail->isHTML(true); // Set email format to plain text
                $mail->Subject = $subject;
                $mail->Body    = $message;

                // Send email
                if ($mail->send()) {
                    echo json_encode(['status' => 'success', 'message' => 'Password reset email sent.']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Failed to send email. Please try again.']);
                }
            } catch (Exception $e) {
                echo json_encode(['status' => 'error', 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Email not found.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email not provided.']);
    }
}
?>
