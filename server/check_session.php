<?php
ini_set('session.cookie_lifetime', 0);
ini_set('session.cookie_httponly', true);
session_start();

include 'headers.php';

// Check if the user session exists
if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "success",
        "message" => "User is logged in.",
        "user" => [
            "id" => $_SESSION['user_id'],
            "name" => $_SESSION['full_name'],
            "email" => $_SESSION['email'],
            "uid" => $_SESSION['uid']
        ]
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not logged in."
    ]);
}
?>
