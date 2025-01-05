<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include "headers.php";
include "db_connection.php"; // Include your database connection file

$data = json_decode(file_get_contents('php://input'), true);

// Validate input data
$requiredFields = ['to', 'subject', 'body', 'attachment', 'invoiceNumber', 'customerFullName', 'depositAmount', 'depositDescription', 'depositPurpose'];
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

// Extract additional invoice data
$invoiceNumber = $data['invoiceNumber'] ?? null;
$customerName = $data['customerFullName'] ?? null;
$depositAmount = $data['depositAmount'] ?? null; // This will contain the formatted value like "3,000 USD"
$depositDescription = $data['depositDescription'] ?? null;
$depositPurpose = $data['depositPurpose'] ?? null; // New deposit purpose field
$serialNumber = $data['serialNumber'] ?? null; 

// Get the user's IP address
$userIp = $_SERVER['REMOTE_ADDR'];

// Fetch the region from a geolocation API (ipinfo.io does not require an API key for basic requests)
$region = '';
try {
    // Using IPInfo API to get region information (no API key required for basic use)
    $ipInfoResponse = file_get_contents("http://ipinfo.io/{$userIp}/json");
    if ($ipInfoResponse) {
        $ipInfo = json_decode($ipInfoResponse, true);
        $region = $ipInfo['region'] ?? 'Unknown region';
    }
} catch (Exception $e) {
    $region = 'Unable to retrieve region';
}

// Insert invoice data into the database using mysqli
try {
    $stmt = $conn->prepare("INSERT INTO invoices (invoice_number, customer_name, email, deposit_amount, description, deposit_purpose) 
                            VALUES (?, ?, ?, ?, ?, ?)");
    if ($stmt) {
        // Adjusted bind_param to match the number of variables (6 variables now)
        $stmt->bind_param(
            'ssssss', // Adjusted the types string to match the number of variables
            $invoiceNumber, 
            $customerName, 
            $to, 
            $depositAmount, 
            $depositDescription, 
            $depositPurpose // Bind depositPurpose
        );
        if (!$stmt->execute()) {
            throw new Exception("Failed to execute statement: " . $stmt->error);
        }
        $stmt->close();
    } else {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save invoice data: ' . $e->getMessage()]);
    exit;
}

// Create a new PHPMailer instance to send email to both the primary user and BCC
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'localhost'; // MailHog SMTP server
    $mail->SMTPAuth = false; // No authentication required
    $mail->Port = 1025; // MailHog SMTP port
    $mail->SMTPSecure = false; // Disable TLS/SSL

    // Recipients
    $mail->setFrom('noreply@artisbay.com', 'Artisbay Inc'); 
    $mail->addAddress($to); // Primary user email
    $mail->addBCC($bcc); // BCC for the additional recipient

    // Add the user's IP and region as part of the email body
    $bodyWithIpInfo = $body . "<br><br><strong>User IP:</strong> " . $userIp . "<br><strong>Region:</strong> " . $region;

    // Attachments
    $mail->addStringAttachment($pdfData, 'Invoice.pdf');

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body = $bodyWithIpInfo; // Add IP and region information to the email body

    // Send the email
    $mail->send();
    echo json_encode(['success' => 'Email sent successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email: ' . $mail->ErrorInfo]);
}

// Close the database connection
$conn->close();
?>
