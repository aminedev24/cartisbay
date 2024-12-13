<?php

$allowedOrigins = ['http://localhost:3000', 'https://artisbay.com'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Collect and sanitize input data
        $name = htmlspecialchars(trim($_POST['name']));
        $address = htmlspecialchars(trim($_POST['address']));
        $email = htmlspecialchars(trim($_POST['email']));
        $country = htmlspecialchars(trim($_POST['country']));
        $tel = htmlspecialchars(trim($_POST['tel']));
        $port = htmlspecialchars(trim($_POST['port']));
        $message = htmlspecialchars(trim($_POST['message']));
        $make = htmlspecialchars(trim($_POST['make']));
        $model = htmlspecialchars(trim($_POST['model']));
        $yearFrom = htmlspecialchars(trim($_POST['year-from']));
        $yearTo = htmlspecialchars(trim($_POST['year-to']));
        $priceFrom = htmlspecialchars(trim($_POST['price-from']));
        $priceTo = htmlspecialchars(trim($_POST['price-to']));
        $bodyType = htmlspecialchars(trim($_POST['body-type']));
        $mileageFrom = htmlspecialchars(trim($_POST['mileage-from']));
        $mileageTo = htmlspecialchars(trim($_POST['mileage-to']));
        $transmission = htmlspecialchars(trim($_POST['transmission']));
        $steering = htmlspecialchars(trim($_POST['steering']));

        // Prepare email
        $to = "orders@artisbay.com"; // Replace with your email
        $subject = "New Vehicle Inquiry from $name";
        $body = "Name: $name\nAddress: $address\nEmail: $email\nCountry: $country\nTel: $tel\nPort: $port\nMessage: $message\n\nVehicle Information:\nMake: $make\nModel: $model\nRegistration Year: $yearFrom to $yearTo\nPrice: $priceFrom to $priceTo\nBody Type: $bodyType\nMileage: $mileageFrom to $mileageTo\nTransmission: $transmission\nSteering: $steering";
        $headers = "From: $email";

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
