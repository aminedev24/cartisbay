<?php
session_start();

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


include 'headers.php';
include 'db_connection.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);

    $fullName = $data['fullName'];
    $email = $data['email'];
    $terms = $data['terms'] ? 'Agreed' : 'Not Agreed';
    $agreementType = $data['agreementType'];
    $agreementContent = $data['agreementContent']; // Assuming this field contains the agreement text

    if (!isset($_SESSION['user_id'])) {
        http_response_code(400);
        echo json_encode(["message" => "User is not logged in."]);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $accepted_at = date("Y-m-d H:i:s");

    $stmt = $conn->prepare("INSERT INTO agreements (user_id, accepted_at, name, email, agreement_type) VALUES (?, ?, ?, ?, ?)");
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to prepare SQL statement."]);
        exit;
    }

    $stmt->bind_param("issss", $user_id, $accepted_at, $fullName, $email, $agreementType);
    if ($stmt->execute()) {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'localhost'; // MailHog SMTP server
            $mail->SMTPAuth = false; // No authentication required
            $mail->Port = 1025; // MailHog SMTP port
            $mail->SMTPSecure = false; // Disable TLS/SSL
            $sender_email = 'noreply@artisbay.com'; // Replace with your Titan Email address
            $mail->setFrom($sender_email, 'Artisbay Inc.');
            $mail->addAddress($email, $fullName);
            $mail->addBCC('contact@artisbay.com');

            $mail->isHTML(true);
            $mail->Subject = "$agreementType agreement";
            $mail->Body = "
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h2 { color: #333; }
                        p { line-height: 1.6; }
                        ul { padding-left: 20px; }
                        .agreement-content { 
                            line-height: 1.6;
                            color: #333;
                            padding: 10px;
                            margin: 20px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            max-width: 800px;
                            margin: 0 auto;
                        }
                            .agreement-content h2 {
                                margin-top: 20px;
                                margin-bottom: 10px;
                            }
                            .agreement-content p {
                                  margin-bottom: 10px;
                                  padding: 0 20px;
                            }
                            .agreement-content ul {
                                  list-style-type: disc;
                                  margin-left: 20px;
                            }
                            .agreement-content ul li {
                                margin-bottom: 10px !important;
                                margin-left: 30px;
                            }
                        .footer { font-size: 12px; color: #999; }
                    </style>
                </head>
                <body>
                    <h2 style=`color: #004080;`>Dear $fullName,</h2>
                    <p>Thank you for agreeing to the terms and conditions of our platform, Artisbay Inc. Your acceptance has been successfully recorded.</p>
                    <h2 style='color: #004080;'>Details of Your Agreement:</h2>
                    <ul>
                        <li><strong>Name:</strong> $fullName</li>
                        <li><strong>Email:</strong> $email</li>
                        <li><strong>Date and Time of Agreement:</strong> $accepted_at</li>
                        <li><strong>Agreement Type:</strong> $agreementType</li>
                    </ul>
                    <p><strong>Content of the Agreement:</strong></p>
                    <div class='agreement-content'>$agreementContent</div>
                    <p>Should you have any questions or need further clarification, feel free to contact us at:<a href='mailto:contact@artisbay.com,'>contact@artisbay.com</a>./p>
                    <p>Thank you for choosing <strong>Artisbay Inc.</strong>.</p>
                    <p style='color:#004080;'><strong>Best regards,</strong><br>Artisbay Inc.</p>
                </body>
                </html>
            ";

            $mail->send();
            http_response_code(200);
            echo json_encode(["message" => "Data received, confirmation email sent to customer, and agreement stored."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error sending confirmation email: " . $mail->ErrorInfo]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error storing agreement data."]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["message" => "Invalid request method."]);
}
?>
