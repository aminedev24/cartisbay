<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include "headers.php";
$data = json_decode(file_get_contents('php://input'), true);

// Validate input data
$requiredFields = ['to', 'subject', 'body', 'attachment'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Extract data
$to = $data['to'];
$subject = $data['subject'];
$bcc = $data['bcc'];
$body = $data['body'];
$attachment = $data['attachment'];

// Decode the base64-encoded PDF file
$pdfData = base64_decode($attachment);
if (!$pdfData) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid PDF attachment']);
    exit;
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'localhost'; // MailHog SMTP server
    $mail->SMTPAuth = false; // No authentication required
    $mail->Port = 1025; // MailHog SMTP port
    $mail->SMTPSecure = false; // Disable TLS/SSL

    // Recipients
    $mail->setFrom('no-reply@artisbay.com', 'Artisbay Inc');
    $mail->addAddress($to);
    $mail->addBCC($bcc);

    // Attachments
    $mail->addStringAttachment($pdfData, 'Invoice.pdf');

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body = $body;

    // Send the email
    $mail->send();
    echo json_encode(['success' => 'Email sent successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email: ' . $mail->ErrorInfo]);
}
?>