<?php
$to = 'test@example.com';  // You can put any email address here
$subject = 'Test Email';
$message = 'This is a test email.';
$headers = 'From: noreply@yourdomain.com';

if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
} else {
    echo 'Email sending failed!';
}
?>
