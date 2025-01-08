<?php
session_start();
include 'db_connection.php';
include 'headers.php';
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Query to check if the user has already agreed
    $stmt = $conn->prepare("SELECT * FROM agreements WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["already_agreed" => true]);
    } else {
        echo json_encode(["already_agreed" => false]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "User not logged in"]);
}
?>
