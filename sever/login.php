<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

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
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, full_name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $fullName, $hashedPassword);
        $stmt->fetch();

        if (password_verify($password, $hashedPassword)) {
            // Generate a unique session token
            $sessionToken = bin2hex(random_bytes(32)); // Generate a secure random token

            // Insert or update session status in the user_sessions table
            $stmt2 = $conn->prepare("INSERT INTO user_sessions (user_id, session_token, is_logged_in, last_login)
                                     VALUES (?, ?, TRUE, NOW())
                                     ON DUPLICATE KEY UPDATE session_token = ?, is_logged_in = TRUE, last_login = NOW()");
            $stmt2->bind_param("iss", $id, $sessionToken, $sessionToken);
            $stmt2->execute();
            $stmt2->close();

            // Return the session token
            echo json_encode([
                "status" => "success",
                "message" => "Login successful.",
                "session_token" => $sessionToken,
                "user" => ["id" => $id, "name" => $fullName]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Login failed. Please check your credentials and try again."]);
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
