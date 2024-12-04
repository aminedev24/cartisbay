<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Database connection parameters
$host = 'localhost:3306'; // Your database host
$db = 'yqjezvte_artisbay'; // Your database name
$user = 'abdennour'; // Your database user, usually 'root' in local setups
$pass = 'phpmyadminplt001'; // Your database password, leave blank if using XAMPP/WAMP by default


$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the session_token from the request
    $data = json_decode(file_get_contents("php://input"), true);
    $sessionToken = $data['session_token'];

    if (empty($sessionToken)) {
        echo json_encode(["status" => "error", "message" => "Session token is required."]);
        exit;
    }

    // Check if the session token exists in the database
    $stmt = $conn->prepare("SELECT u.id, u.full_name FROM users u
                            JOIN user_sessions s ON u.id = s.user_id
                            WHERE s.session_token = ? AND s.is_logged_in = TRUE");
    $stmt->bind_param("s", $sessionToken);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $fullName);
        $stmt->fetch();

        echo json_encode([
            "status" => "success",
            "user" => ["uid" => $id, "name" => $fullName] // Change 'id' to 'uid'
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid session or user is logged out."]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

$conn->close();
?>
