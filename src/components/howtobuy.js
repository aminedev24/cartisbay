import React from "react";
import '../css/howToBuy.css'; // Add your CSS file for styling

const HowToBuy = () => {
    return (
        <div className="how-to-buy">
            <h2>How to Buy</h2>
            <ol>
                <li>
                    <h3>Start Your Search:</h3>
                    <p>
                        Begin your search from the TOP page of Artisbay. You can filter vehicles by make, car type, year, price, and more.
                    </p>
                </li>
                <li>
                    <h3>Choose Your Arrival Port:</h3>
                    <p>
                        Select your arrival port to see the all-inclusive (CIF) prices. CIF includes FOB, freight (shipping) cost, warranty, and pre-shipment inspection. You can remove insurance and inspection if not needed.
                    </p>
                </li>
                <li>
                    <h3>Find the Right Vehicle:</h3>
                    <p>
                        Browse through the listings and select the vehicle that suits your needs. Check the details like the exporting company, vehicle condition, and any necessary repairs.
                    </p>
                </li>
                <li>
                    <h3>Check Car Details and Total Price:</h3>
                    <p>
                        Review the pictures, specifications, and condition of the car. Ensure you check the total CIF price to your arrival port.
                    </p>
                </li>
                <li>
                    <h3>Contact the Seller:</h3>
                    <p>
                        Fill in the essential details and click on “Contact Seller.” You can negotiate with the seller in the chat room. Once you agree on the price, the seller will issue an invoice.
                    </p>
                </li>
                <li>
                    <h3>Payment:</h3>
                    <p>
                        Arrange payment via the bank details provided on the invoice. The CIF/CFR amount must be wired via telegraphic transfer. Forward the proof of payment to the seller.
                    </p>
                </li>
                <li>
                    <h3>After Payment:</h3>
                    <p>
                        You will receive a notification from the seller confirming the receipt of your payment. If you don’t hear from them, contact the seller.
                    </p>
                </li>
                <li>
                    <h3>Prepare for Arrival:</h3>
                    <p>
                        Once your vehicle leaves Japan, you will receive all necessary documents for customs clearance and registration. Contact your port’s clearing agent to organize the clearing process before the vessel’s arrival.
                    </p>
                </li>
                <li>
                    <h3>Vehicle Arrival:</h3>
                    <p>
                        When your vehicle arrives, let it warm up for several minutes by leaving the engine on idle before the first drive to avoid any damages.
                    </p>
                </li>
                <li>
                    <h3>Feedback:</h3>
                    <p>
                        Share your feedback and a photo of yourself with the vehicle to help improve the service.
                    </p>
                </li>
            </ol>
        </div>
    );
};

export default HowToBuy;
