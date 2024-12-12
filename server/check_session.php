<?php
session_start();
header("Access-Control-Allow-Origin: http://artisbay.com"); // Adjust if necessary
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'success',
        'user' => [
            'id' => $_SESSION['user_id'],
            'uid' => $_SESSION['uid'],
            'name' => $_SESSION['full_name'],
            'email' => $_SESSION['email'],
        ]
    ]);
} else {
    echo json_encode(['status' => 'failure']);
}
?>
