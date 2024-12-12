<?php
session_start();

// Get the Origin header from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Set the allowed origins dynamically
$allowedOrigins = ['http://localhost:3000', 'https://artisbay.com'];

// Check if the incoming request's origin matches any of the allowed origins
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include 'db_connection.php'; // Include your database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check for JSON input
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    // Prepare statement to fetch user details including uid
    $stmt = $conn->prepare("SELECT id, uid, full_name, email, password FROM users WHERE email = ?");
    if (!$stmt) {
        die(json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]));
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $uid, $fullName, $emailFromDb, $hashedPassword);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashedPassword)) {
            // Store user information in session
            $_SESSION['user_id'] = $id;
            $_SESSION['full_name'] = $fullName;
            $_SESSION['uid'] = $uid;
            $_SESSION['email'] = $emailFromDb; // Store email in session
            error_log("Session Data login: " . print_r($_SESSION, true));

            $session_id = session_id();

            // Log the session ID to the PHP error log
            error_log("Session ID: login.php " . $session_id);
            // Update user_sessions table
            $stmt2 = $conn->prepare("INSERT INTO user_sessions (uid, is_logged_in, last_login)
                                     VALUES (?, TRUE, NOW())
                                     ON DUPLICATE KEY UPDATE is_logged_in = TRUE, last_login = NOW()");
            if (!$stmt2) {
                die(json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]));
            }

            // Bind the uid to the statement
            $stmt2->bind_param("s", $uid); // Assuming uid is a string (char(36))
            if (!$stmt2->execute()) {
                die(json_encode(["status" => "error", "message" => "Failed to update user_sessions: " . $stmt2->error]));
            }
            $stmt2->close();

            // Send user data (including email) back in the response
            echo json_encode([
                "status" => "success",
                "message" => "Login successful.",
                "user" => [
                    "id" => $id,
                    "uid" => $uid,
                    "name" => $fullName,
                    "email" => $emailFromDb // Send email in the response
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Password incorrect."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Login failed. Please check your credentials and try again."]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

$conn->close();
?>
