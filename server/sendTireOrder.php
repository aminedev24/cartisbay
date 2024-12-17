<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include 'db_connection.php'; // Include database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the incoming JSON data
    $inputData = json_decode(file_get_contents("php://input"), true);

    if ($inputData === null) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data received."]);
        exit;
    }

    // Collect and sanitize inputs
    $orderIds = isset($inputData['order_ids']) ? $inputData['order_ids'] : null;
    $email = isset($inputData['email']) ? htmlspecialchars(trim($inputData['email'])) : null;
    $customerMessage = isset($inputData['customerMessage']) ? htmlspecialchars(trim($inputData['customerMessage'])) : '';

    // Validate required fields
    if (empty($orderIds) || empty($email)) {
        echo json_encode(["status" => "error", "message" => "Email and order IDs are required."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit;
    }

    if (!is_array($orderIds)) {
        echo json_encode(["status" => "error", "message" => "order_ids must be an array."]);
        exit;
    }

    // Prepare placeholders for SQL query
    $placeholders = implode(',', array_fill(0, count($orderIds), '?'));

    // Retrieve order details from the database
    $sql = "SELECT * FROM tireorders WHERE id IN ($placeholders)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param(str_repeat('i', count($orderIds)), ...$orderIds);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Prepare the email body as an HTML table
            $body = "
                <html>
                    <head>
                        <style>
                            table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            th, td {
                                border: 1px solid #ddd;
                                padding: 8px;
                            }
                            th {
                                background-color: #f2f2f2;
                                text-align: left;
                            }
                            tr:nth-child(even) {
                                background-color: #f9f9f9;
                            }
                            tr:hover {
                                background-color: #f1f1f1;
                            }
                            .customer-message {
                                margin-top: 20px;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>New Tire Order Details</h2>
                        <table>
                            <tr>
                                <th>Order ID</th>
                                <th>Maker</th>
                                <th>Size</th>
                                <th>Load Index</th>
                                <th>Speed Rating</th>
                                <th>Quantity</th>
                                <th>Type</th>
                            </tr>";

            while ($order = $result->fetch_assoc()) {
                // Set default values for load index and speed rating if empty
                $loadIndex = !empty($order['load_index']) ? $order['load_index'] : 0;
                $speedRating = !empty($order['speed_rating']) ? $order['speed_rating'] : 0;

                // Format the size as width/aspect_ratioRrim_diameter (e.g., 255/45R18)
                $size = htmlspecialchars($order['width']) . '/' . htmlspecialchars($order['aspect_ratio']) . 'R' . htmlspecialchars($order['rim_diameter']);

                $body .= "
                            <tr>
                                <td>" . htmlspecialchars($order['id']) . "</td>
                                <td>" . htmlspecialchars($order['make']) . "</td>
                                <td>" . $size . "</td>
                                <td>" . $loadIndex . "</td>
                                <td>" . $speedRating . "</td>
                                <td>" . htmlspecialchars($order['quantity']) . "</td>
                                <td>" . htmlspecialchars($order['type']) . "</td>
                            </tr>";
            }

            $body .= "
                        </table>";

            // Append optional customer message if provided
            if (!empty($customerMessage)) {
                $body .= "
                        <div class='customer-message'>
                            <p>Customer Message: " . nl2br(htmlspecialchars($customerMessage)) . "</p>
                        </div>";
            }

            $body .= "
                    </body>
                </html>";

            // Email details
            $to = "orders@artisbay.com";
            $subject = "New Tire Orders Received";
            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "From: " . $email . "\r\n";

            // Send the email
            if (mail($to, $subject, $body, $headers)) {
                // Clear the orders from the database
                $deleteSql = "DELETE FROM tireorders WHERE id IN ($placeholders)";
                $stmtDelete = $conn->prepare($deleteSql);

                if ($stmtDelete) {
                    $stmtDelete->bind_param(str_repeat('i', count($orderIds)), ...$orderIds);
                    $stmtDelete->execute();
                    $stmtDelete->close();

                    echo json_encode(["status" => "success", "message" => "Orders sent successfully and cleared from the database."]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Orders sent but failed to clear from the database."]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to send the email."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "No orders found with the provided IDs."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to prepare query."]);
    }

    $conn->close();
}
?>
