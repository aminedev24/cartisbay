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
    // Since the data is sent in application/x-www-form-urlencoded format, 
    // we access it through the $_POST superglobal directly
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($email) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        error_log("Error: All fields are required (email or password missing).");
        exit;
    }

    // Prepare statement to fetch user details including uid
    $stmt = $conn->prepare("SELECT id, uid, full_name, email, password FROM users WHERE email = ?");
    if (!$stmt) {
        error_log("Prepare failed: " . $conn->error); // Log the error
        die(json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]));
    }

    $stmt->bind_param("s", $email);
    if (!$stmt->execute()) {
        error_log("Query execution failed: " . $stmt->error); // Log query execution error
        die(json_encode(["status" => "error", "message" => "Failed to execute query: " . $stmt->error]));
    }
    
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
            error_log("Session ID: login.php " . $session_id);

            // Update user_sessions table
            $stmt2 = $conn->prepare("INSERT INTO user_sessions (uid, is_logged_in, last_login)
                                     VALUES (?, TRUE, NOW())
                                     ON DUPLICATE KEY UPDATE is_logged_in = TRUE, last_login = NOW()");
            if (!$stmt2) {
                error_log("Prepare failed: " . $conn->error); // Log prepare failure
                die(json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]));
            }

            $stmt2->bind_param("s", $uid); // Assuming uid is a string (char(36))
            if (!$stmt2->execute()) {
                error_log("Failed to update user_sessions: " . $stmt2->error); // Log execution failure
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
            error_log("Error: Password incorrect for email " . $email);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Login failed. Please check your credentials and try again."]);
        error_log("Error: Login failed for email " . $email . " - No matching user found.");
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    error_log("Error: Invalid request method. Expected POST.");
}

$conn->close();
?>
