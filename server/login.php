<?php

// Secure Session Configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1); // Ensure HTTPS is enabled
ini_set('session.cookie_samesite', 'Strict');
session_start();


session_regenerate_id(true); // Regenerate session ID

// Allowed Origins (CORS)
$allowedOrigins = ['http://localhost:3000', 'https://artisbay.com'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

include 'db_connection.php'; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize Input
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = filter_input(INPUT_POST, 'password', FILTER_DEFAULT);

    if (!$email || !$password) {
        echo json_encode(["status" => "error", "message" => "Email and password are required."]);
        exit;
    }

    // Prepare SQL Query to Prevent SQL Injection
    $stmt = $conn->prepare("SELECT id, uid, full_name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $uid, $fullName, $emailFromDb, $hashedPassword);
        $stmt->fetch();

        // Verify Password
        if (password_verify($password, $hashedPassword)) {
            // Secure the session and avoid fixation
            session_regenerate_id();

            $_SESSION['user_id'] = $id;
            $_SESSION['full_name'] = $fullName;
            $_SESSION['uid'] = $uid;
            $_SESSION['email'] = $emailFromDb;

            // Update user_sessions
            $updateSession = $conn->prepare("INSERT INTO user_sessions (uid, is_logged_in, last_login)
                                            VALUES (?, TRUE, NOW())
                                            ON DUPLICATE KEY UPDATE is_logged_in = TRUE, last_login = NOW()");
            $updateSession->bind_param("s", $uid);
            $updateSession->execute();
            $updateSession->close();

            // Generate Secure JWT Token
            $secretKey = "YOUR_SECURE_SECRET_KEY";
            $payload = [
                "uid" => $uid,
                "email" => $emailFromDb,
                "iat" => time(),                // Issued at
                "exp" => time() + 3600          // Expires in 1 hour
            ];
            $jwt = generateJWT($payload, $secretKey);

            // Send Response with Token
            echo json_encode([
                "status" => "success",
                "message" => "Login successful.",
                "token" => $jwt, // Return JWT token
                "user" => [
                    "id" => $id,
                    "uid" => $uid,
                    "name" => $fullName,
                    "email" => $emailFromDb
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid credentials."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
$conn->close();

// JWT Generation Function
function generateJWT($payload, $secretKey) {
    $header = base64UrlEncode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64UrlEncode(json_encode($payload));
    $signature = hash_hmac('sha256', "$header.$payload", $secretKey, true);
    $signature = base64UrlEncode($signature);
    return "$header.$payload.$signature";
}

function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
?>
