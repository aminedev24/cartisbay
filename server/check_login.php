<?php
session_start(); // Start the session

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Log session data for debugging
error_log("Session Data check_login : " . print_r($_SESSION, true));

// Check if the session contains user information
if (isset($_SESSION['user_id']) && isset($_SESSION['uid'])) {
    $userId = $_SESSION['user_id'];
    $uid = $_SESSION['uid'];

    include 'db_connection.php'; // Include your database connection

    // Query the user_sessions table to verify session details
    $stmt = $conn->prepare("SELECT session_token, is_logged_in, last_login FROM user_sessions WHERE uid = ?");
    if (!$stmt) {
        error_log("SQL Prepare Error: " . $conn->error);
        die(json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]));
    }

    // Bind the UID parameter and execute the query
    $stmt->bind_param("s", $uid); // Assuming `uid` is a string
    $stmt->execute();
    $stmt->bind_result($sessionToken, $isLoggedIn, $lastLogin);
    $stmt->fetch();

    if ($sessionToken) {
        echo json_encode([
            "status" => "success",
            "user" => [
                "id" => $userId,
                "uid" => $uid,
                "session_token" => $sessionToken,
                "is_logged_in" => $isLoggedIn,
                "last_login" => $lastLogin
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Session not found for the given UID."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "User is not logged in or UID is missing from the session."]);
}
?>
