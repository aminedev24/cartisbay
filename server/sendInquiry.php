<?php

$allowedOrigins = ['http://localhost:3000', 'https://artisbay.com'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

include 'db_connection.php'; // Include database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Collect and sanitize input data
        $inputs = [
            'name' => htmlspecialchars(trim($_POST['name'] ?? '')),
            'address' => htmlspecialchars(trim($_POST['address'] ?? '')),
            'email' => htmlspecialchars(trim($_POST['email'] ?? '')),
            'country' => htmlspecialchars(trim($_POST['country'] ?? '')),
            'tel' => htmlspecialchars(trim($_POST['tel'] ?? '')),
            'port' => htmlspecialchars(trim($_POST['port'] ?? '')),
            'message' => htmlspecialchars(trim($_POST['message'] ?? '')),
            'make' => htmlspecialchars(trim($_POST['make'] )), // Default to 'Any' if not provided
            'model' => htmlspecialchars(trim($_POST['model'])), // Default to 'Any' if not provided
            'year_from' => (int) htmlspecialchars(trim($_POST['year-from'] ?? 0)),
            'year_to' => (int) htmlspecialchars(trim($_POST['year-to'] ?? 0)),
            'price_from' => (float) htmlspecialchars(trim($_POST['price-from'] ?? 0.0)),
            'price_to' => (float) htmlspecialchars(trim($_POST['price-to'] ?? 0.0)),
            'body_type' => htmlspecialchars(trim($_POST['body-type'])),
            'mileage_from' => (int) htmlspecialchars(trim($_POST['mileage-from'] ?? 0)),
            'mileage_to' => (int) htmlspecialchars(trim($_POST['mileage-to'] ?? 0)),
            'transmission' => htmlspecialchars(trim($_POST['transmission'])),
            'steering' => htmlspecialchars(trim($_POST['steering'])),
        ];

        // Log the received inputs for debugging
        error_log("Received inputs: " . print_r($inputs, true));

        // Prepare the SQL statement to insert the inquiry into the database
        $insertSql = "INSERT INTO submitted_inquiries (name, address, email, country, tel, port, message, make, model, year_from, year_to, price_from, price_to, body_type, mileage_from, mileage_to, transmission, steering)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmtInsert = $conn->prepare($insertSql);

        if ($stmtInsert === false) {
            error_log("Database query preparation failed: " . $conn->error);
            echo json_encode(["status" => "error", "message" => "Error preparing insert statement."]);
            exit;
        }

        $stmtInsert->bind_param(
            "sssssssssiidddssss", 
            $inputs['name'], 
            $inputs['address'], 
            $inputs['email'], 
            $inputs['country'], 
            $inputs['tel'], 
            $inputs['port'], 
            $inputs['message'], 
            $inputs['make'], 
            $inputs['model'], 
            $inputs['year_from'], 
            $inputs['year_to'], 
            $inputs['price_from'], 
            $inputs['price_to'], 
            $inputs['body_type'], 
            $inputs['mileage_from'], 
            $inputs['mileage_to'], 
            $inputs['transmission'], 
            $inputs['steering']
        );

        // Execute the statement
        if ($stmtInsert->execute()) {
            // Prepare email
            $to = "orders@example.com"; // Replace with your email
            $subject = "New Vehicle Inquiry from " . $inputs['name'];
            $body = "Name: " . $inputs['name'] . "\nAddress: " . $inputs['address'] . "\nEmail: " . $inputs['email'] . "\nCountry: " . $inputs['country'] . "\nTel: " . $inputs['tel'] . "\nPort: " . $inputs['port'] . "\nMessage: " . $inputs['message'] . "\n\nVehicle Information:\nMake: " . $inputs['make'] . "\nModel: " . $inputs['model'] . "\nRegistration Year: " . $inputs['year_from'] . " to " . $inputs['year_to'] . "\nPrice: " . $inputs['price_from'] . " to " . $inputs['price_to'] . "\nBody Type: " . $inputs['body_type'] . "\nMileage: " . $inputs['mileage_from'] . " to " . $inputs['mileage_to'] . "\nTransmission: " . $inputs['transmission'] . "\nSteering: " . $inputs['steering'];
            $headers = "From: " . $inputs['email'];

            // Send email
            if (mail($to, $subject, $body, $headers)) {
                http_response_code(200); // Set status code 200 for success
                echo json_encode(["status" => "success", "message" => "Inquiry sent successfully!"]);
            } else {
                $error = error_get_last();
                error_log("Failed to send email. Error: " . print_r($error, true)); // Log detailed error
                http_response_code(500); // Set status code 500 for failure
                echo json_encode(["status" => "error", "message" => "Failed to send inquiry."]);
            }
        } else {
            error_log("Error inserting inquiry into submitted_inquiries: " . $stmtInsert->error);
            http_response_code(500); // Set status code 500 for failure
            echo json_encode(["status" => "error", "message" => "Failed to save inquiry to the database."]);
        }
    } catch (Exception $e) {
        // Log any exceptions
        error_log("Exception: " . $e->getMessage());
        http_response_code(500); // Set status code 500 for exception
        echo json_encode(["status" => "error", "message" => "An error occurred while processing your request."]);
    }
} else {
    http_response_code(405); // Set status code 405 for invalid method
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

?>
