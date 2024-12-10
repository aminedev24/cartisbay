<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
    $to = "order@artisbay.com"; // Replace with your email
    $subject = "New Vehicle Inquiry from $name";
    $body = "Name: $name\nAddress: $address\nEmail: $email\nCountry: $country\nTel: $tel\nPort: $port\nMessage: $message\n\nVehicle Information:\nMake: $make\nModel: $model\nRegistration Year: $yearFrom to $yearTo\nPrice: $priceFrom to $priceTo\nBody Type: $bodyType\nMileage: $mileageFrom to $mileageTo\nTransmission: $transmission\nSteering: $steering";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Inquiry sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send inquiry."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>