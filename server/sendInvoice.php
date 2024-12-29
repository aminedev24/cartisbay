<?php
require 'headers.php';

error_log("Starting sendInvoice.php script");

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Log the received data for debugging
error_log("Received data: " . print_r($data, true));

// Validate input data
if (empty($data['to']) || empty($data['subject']) || empty($data['body']) || empty($data['attachment'])) {
    http_response_code(400);
    error_log("Missing required fields");
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Extract data
$to = $data['to'];
$subject = $data['subject'];
$bcc = $data['bcc']; // BCC recipient
$body = $data['body'];
$attachment = $data['attachment']; // Base64-encoded PDF file

// Decode the base64-encoded PDF file
$pdfData = base64_decode($attachment);

if (!$pdfData) {
    http_response_code(400);
    error_log("Invalid PDF attachment");
    echo json_encode(['error' => 'Invalid PDF attachment']);
    exit;
}

// Log the size of the PDF for debugging
error_log("PDF size: " . strlen($pdfData) . " bytes");

// Generate a boundary for the email
$boundary = md5(time());

// Email headers
$headers = "From: Artisbay Inc <no-reply@artisbay.com>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Email body
$message = "--$boundary\r\n";
$message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $body . "\r\n\r\n";
$headers .= "Bcc: $bcc\r\n"; // Add the BCC recipient

// Attach the PDF file
$message .= "--$boundary\r\n";
$message .= "Content-Type: application/pdf; name=\"Invoice.pdf\"\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n";
$message .= "Content-Disposition: attachment; filename=\"Invoice.pdf\"\r\n\r\n"; // Use "attachment" for downloadable file
$message .= chunk_split($attachment) . "\r\n";
$message .= "--$boundary--";

// Log the email details for debugging
error_log("Sending email to: $to");
error_log("Email subject: $subject");
error_log("Email body: $body");

// Send the email
if (mail($to, $subject, $message, $headers)) {
    error_log("Email sent successfully");
    echo json_encode(['success' => 'Email sent successfully']);
} else {
    http_response_code(500);
    error_log("Failed to send email");
    echo json_encode(['error' => 'Failed to send email']);
}
?>