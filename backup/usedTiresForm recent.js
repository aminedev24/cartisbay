import React, { useState, useEffect } from "react";
import "../css/usedTiresForm.css";
import TireSelection from "./tireSelection";
import Modal from "./alertModal";
import { useUser } from "./userContext"; // Importing the useUser hook to access user data
import { Link } from "react-router-dom";
import { TireSizes } from "./tireSizes";
import { data } from "autoprefixer";
const OrderForm = ({
  formData,
  setFormData,
  orders,
  setOrders,
  setTotalUnits,
  totalUnits,
  hasPromptedForDoubleLoading,
  setHasPromptedForDoubleLoading,
}) => {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [percentageFill, setPercentageFill] = useState(0);
  const [doubleLoading, setDoubleLoading] = useState(false);
  const [selectedDiameter, setSelectedDiameter] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { user, loading } = useUser(); // Accessing the user from context

  const [modalMessage, setModalMessage] = useState(""); // Message to show in the modal
  const [modalType, setModalType] = useState(""); // Type of modal: 'warning' or 'confirmation'
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  // Dynamically set API URL based on environment
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server" // Development URL
      : "/server"; // Production URL (relative path)

  // Define modal types
  const MODAL_TYPES = {
    WARNING: "warning",
    CONFIRMATION: "confirmation",
    CLEAR_ALL: "clear_all", // New type for clearing all orders
  };

  useEffect(() => {
    const existingQuantity = Object.values(orders)
      .flat()
      .reduce((acc, order) => acc + order.quantity, 0);
    const totalCapacity = doubleLoading ? 3000 : 2000;

    // Show modal if the quantity is exactly 2000 and hasn't been prompted yet
    if (existingQuantity >= 2000 && !hasPromptedForDoubleLoading) {
      setModalMessage(
        "A 40ft HC container can hold 2,000 units with standard loading. If you wish to load up to 3,000 units, please consider the double-loading option.",
      );
      setModalType(MODAL_TYPES.WARNING);
      setShowModal(true);
      setHasPromptedForDoubleLoading(true); // Set the flag to true after showing the modal
    }

    const fill = (existingQuantity / totalCapacity) * 100;
    setPercentageFill(fill); // Allow percentage to exceed 100%
    setTotalUnits(existingQuantity);
  }, [orders, doubleLoading, hasPromptedForDoubleLoading]); // Add hasPromptedForDoubleLoading to dependencies

  const handleDiameterChange = (e) => {
    const diameter = parseInt(e.target.value);
    setSelectedDiameter(diameter);
    const sizes =
      TireSizes.find((tire) => tire.diameter === diameter)?.sizes || [];
    setAvailableSizes(sizes);
    setFormData((prevData) => ({
      ...prevData,
      tireSize: "",
    }));
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      tireSize: size,
    }));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user || !user.id) {
          console.error("User not authenticated");
          return;
        }

        const response = await fetch(`${apiUrl}/fetchTires.php`, {
          method: "GET",
          credentials: "include", // Send cookies
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.uid}`, // Pass the UID in the Authorization header
          },
        });

        if (!response.ok) {
          const errorMessage = `Network response was not ok: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setOrders(data); // Set the fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSendOrderEmail = async () => {
    // Ensure orders have been fetched
    if (orders.length === 0) {
      setMessage("No orders found to send.");
      return;
    }

    const email = user.email; // Extract email from user state (assumed you have the user's email)

    // Extract the order IDs from the fetched orders
    const orderIds = orders.map((order) => order.id); // Assuming 'id' is the order ID
    console.log(email);
    console.log(orderIds);
    const orderData = {
      order_ids: orderIds, // Send the array of order IDs
      email: email,
      customerMessage: formData.customerMessage
    };

    console.log(orderData);
    try {
      const response = await fetch(`${apiUrl}/sendTireOrder.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Your order has been successfully sent!");
        setOrders([]);
      } else {
        setMessage(
          result.message || "An error occurred while sending the order.",
        );
      }
    } catch (error) {
      setMessage("An error occurred while connecting to the server.");
    }
  };

  useEffect(() => {
    const requiredFieldsFilled =
      formData.make && formData.type && formData.quantity && formData.tireSize;
    setIsFormValid(requiredFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditOrder = (order) => {
    console.log("Order to edit:", order);

    // Set the form data based on the order to edit
    setFormData({
      make: order.make,
      quantity: order.quantity,
      load_index: order.load_index,
      speed_rating: order.speed_rating,
      rim_diameter: order.rim_diameter,
      type: order.type,
      tireSize: `${order.width}/${order.aspect_ratio}R${order.rim_diameter}`,
    });

    // Find the index of the order in the original `orders` array
    const originalIndex = orders.findIndex((o) => o === order);

    if (originalIndex === -1) {
      console.error("Order not found in original orders array.");
      return;
    }

    setEditingOrder(originalIndex);
    setShowForm(true);
  };

  const handleSaveOrder = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !formData.make ||
      !formData.type ||
      !formData.tireSize ||
      !formData.quantity
    ) {
      console.log("Validation failed: Missing required fields.");
      setMessage("Please fill in all required fields.");
      return;
    }

    const [width, aspect_ratio, rim_diameter] = formData.tireSize.split(/\/|R/);
    let quantity = parseInt(formData.quantity, 10);

    // Ensure quantity is valid
    if (isNaN(quantity) || quantity < 1) {
      console.log("Validation failed: Invalid quantity.");
      setMessage("Quantity must be at least 1.");
      return;
    }

    // Construct the new order object
    const newOrder = {
      make: formData.make,
      width: parseInt(width, 10),
      aspect_ratio: parseInt(aspect_ratio, 10),
      rim_diameter: parseInt(rim_diameter, 10),
      load_index: formData.load_index,
      speed_rating: formData.speed_rating,
      quantity: quantity,
      type: formData.type,
      id: null, // Temporarily set the ID to null for new orders
    };

    console.log("New Order before saving: ", newOrder);

    // Handle adding or editing an order
    if (editingOrder !== null) {
      await editOrder(newOrder);
    } else {
      await addOrder(newOrder);
    }

    // Clear form data
    console.log("Clearing form data...");
    setFormData({
      make: "",
      quantity: "",
      load_index: "",
      speed_rating: "",
      type: "",
      tireSize: "",
    });
  };

  //console.log(user)
  const addOrder = async (newOrder) => {
    // Simulate order submission when not logged in
    if (!user || !user.uid) {
        console.warn("User is not logged in. Order will not be saved on the server.");

        // Simulate the addition of the order locally for UI feedback
        setOrders((prevOrders) => {
            const ordersArray = Array.isArray(prevOrders) ? prevOrders : [];

            // Find an existing order with the same type and size
            const existingOrderIndex = ordersArray.findIndex(
                (order) =>
                    order.type === newOrder.type &&
                    `${order.width}/${order.aspect_ratio}R${order.rim_diameter}` ===
                        `${newOrder.width}/${newOrder.aspect_ratio}R${newOrder.rim_diameter}`
            );

            if (existingOrderIndex !== -1) {
                // Update the quantity of the existing order
                const updatedOrders = [...ordersArray];
                updatedOrders[existingOrderIndex].quantity += newOrder.quantity;
                return updatedOrders;
            } else {
                // Add the new order if no matching order exists
                return [...ordersArray, { ...newOrder, id: "TEMP_ID" }];
            }
        });

        setMessage("Order added locally but not saved. Please log in to save.");
        return;
    }

    // Prepare the order for server submission
    const orderData = {
        order_id: null,
        user_id: user ? user.uid : '',
        make: newOrder.make,
        width: newOrder.width,
        aspect_ratio: newOrder.aspect_ratio,
        rim_diameter: newOrder.rim_diameter,
        quantity: newOrder.quantity,
        type: newOrder.type,
        ...(newOrder.load_index && { load_index: newOrder.load_index }),
        ...(newOrder.speed_rating && { speed_rating: newOrder.speed_rating }),
    };

    console.log(`Payload sent to the server ${JSON.stringify(orderData)}`);
    try {
        const response = await fetch(`${apiUrl}/saveOrder.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        if (response.ok && result.order_id > 0) {
            newOrder.id = result.order_id; // Use server ID

            setOrders((prevOrders) => {
                const ordersArray = Array.isArray(prevOrders) ? prevOrders : [];

                // Find an existing order with the same type and size
                const existingOrderIndex = ordersArray.findIndex(
                    (order) =>
                        order.type === newOrder.type &&
                        `${order.width}/${order.aspect_ratio}R${order.rim_diameter}` ===
                            `${newOrder.width}/${newOrder.aspect_ratio}R${newOrder.rim_diameter}`
                );

                if (existingOrderIndex !== -1) {
                    // Update the quantity of the existing order
                    const updatedOrders = [...ordersArray];
                    updatedOrders[existingOrderIndex].quantity += newOrder.quantity;
                    return updatedOrders;
                } else {
                    // Add the new order if no matching order exists
                    return [...ordersArray, newOrder];
                }
            });

            setMessage("Order saved successfully!");
        } else {
            throw new Error(result.message || "Failed to save order.");
        }
    } catch (error) {
        console.error("Error saving order:", error.message);
        setMessage(`Error: ${error.message}`);
    }
};


  

const editOrder = async (updatedOrder) => {
  const updatedOrders = [...(orders || [])]; // Default to an empty array if orders is falsy
  const previousOrder = updatedOrders[editingOrder];

  if (!previousOrder) {
    setMessage("Order not found.");
    return;
  }

  // Temporarily update the order in the array for server submission
  updatedOrders[editingOrder] = { ...previousOrder, ...updatedOrder };

  // Grouping and quantity accumulation logic before sending to server
  const newOrders = updatedOrders.reduce((acc, order, index) => {
    const sizeKey = `${order.width}/${order.aspect_ratio}R${order.rim_diameter}`;
    const existingIndex = acc.findIndex(
      (o) =>
        o.type === order.type &&
        o.make === order.make &&
        `${o.width}/${o.aspect_ratio}R${o.rim_diameter}` === sizeKey
    );

    if (existingIndex !== -1) {
      // If a match is found, accumulate quantities
      acc[existingIndex].quantity += order.quantity;

      // If the matched order is the edited one, skip adding it again
      if (index === editingOrder) return acc;
    } else {
      // Add the order to the accumulator if it doesn't exist already
      acc.push(order);
    }

    return acc;
  }, []);

  // After the group and accumulate logic, update the state before sending to the server
  setOrders(newOrders); // Update the orders state with the merged orders
  console.log(`newOrders: ${JSON.stringify(newOrders)}`)
  // Prepare the payload for the server based on updated orders
  const payload = newOrders.map(order => ({
    order_id: order.id,
    user_id: user.uid,
    make: order.make,
    width: order.width,
    aspect_ratio: order.aspect_ratio,
    rim_diameter: order.rim_diameter,
    quantity: order.quantity,
    type: order.type,
    load_index: order.load_index || null,
    speed_rating: order.speed_rating || null,
  }));

  console.log(`Payload sent to server for editing order: ${JSON.stringify(payload)}`);

  try {
    const response = await fetch(`${apiUrl}/edit_order.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // Directly sending the array of orders
    });

    const result = await response.json();
    console.log("Server Response for editing order: ", result);

    if (response.ok && result.message === "Order updated successfully.") {
      console.log("Order updated successfully.");
      setMessage("Your order has been successfully updated and grouped!");
    } else {
      console.log("Error: Server response indicates failure.");
      setMessage(result.message || "An error occurred while updating the order.");
    }
  } catch (error) {
    console.log("Error: An error occurred during the fetch request.");
    setMessage(`An error occurred while connecting to the server: ${error.message}`);
  } finally {
    setEditingOrder(null); // Exit editing mode
  }
};





  // Open confirmation modal when deleting an order
  const handleDeleteOrder = (index) => {
    // Ensure the index is valid
    if (index < 0 || index >= orders.length) {
      console.error(`Index ${index} is out of bounds.`);
      return;
    }

    // Open the confirmation modal
    setModalMessage(`Are you sure you want to delete this order?`);
    setModalType(MODAL_TYPES.CONFIRMATION);
    setSelectedOrderIndex(index);
    setShowModal(true);
  };

  // Handle deletion confirmation
  const handleConfirmDelete = async () => {
    if (selectedOrderIndex === null) return;

    const orderId = orders[selectedOrderIndex].id;
    const quantityToRemove = orders[selectedOrderIndex].quantity;

    try {
      // Make a DELETE request to the backend
      const response = await fetch(`${apiUrl}/delete_order.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || `Failed to delete the order.`);
        return;
      }

      // Remove the order locally
      const updatedOrders = orders.filter((_, i) => i !== selectedOrderIndex);
      setOrders(updatedOrders);
      setTotalUnits((prevTotal) => prevTotal - quantityToRemove);
      setMessage(`Order deleted successfully.`);
    } catch (error) {
      setMessage(
        `An error occurred while deleting the order: ${error.message}`,
      );
    } finally {
      // Close modal after handling
      setShowModal(false);
      setSelectedOrderIndex(null);
    }
  };

  // Handle cancel action in confirmation modal
  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedOrderIndex(null);
  };

  const handleNewCategory = () => {
    setFormData({
      make: "",
      quantity: "",
      load_index: "",
      speed_rating: "",
      type: "",
      tireSize: "",
      rim_diameter: "",
    });
    setShowForm(true);
    setMessage("");
    setEditingOrder(null);
    setHasPromptedForDoubleLoading(false); // Reset the prompt flag when starting a new category
  };

  const handleClearOrders = () => {
    // Show a confirmation modal asking if the user is sure they want to clear all orders
    setModalMessage("Are you sure you want to clear all orders?");
    setModalType(MODAL_TYPES.CLEAR_ALL); // Set modal type to 'clear_all'
    setShowModal(true);
  };

  const handleConfirmClearAll = async () => {
    const clearAllData = {
      clear_all: true, // Indicate that we want to clear all orders
    };

    try {
      const response = await fetch(`${apiUrl}/delete_order.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clearAllData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || `Server error: ${response.statusText}`);
      } else if (result.success) {
        setMessage("All orders have been cleared.");
        // Clear the orders in the frontend state
        setOrders([]);
        setTotalUnits(0);
      } else {
        setMessage(
          result.message || "An error occurred while clearing orders.",
        );
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    }

    setShowModal(false); // Close the modal after action
  };

  const handleCancelClearAll = () => {
    setShowModal(false); // Close the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="usedTiresForm" className="usedTiresForm-container">
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={() => setShowModal(false)} // Close modal on close button click
          onConfirm={
            modalType === MODAL_TYPES.CLEAR_ALL
              ? handleConfirmClearAll
              : modalType === MODAL_TYPES.CONFIRMATION
                ? handleConfirmDelete
                : null
          } // Handle confirmation only in the appropriate modal
          onCancel={
            modalType === MODAL_TYPES.CLEAR_ALL
              ? handleCancelClearAll
              : modalType === MODAL_TYPES.CONFIRMATION
                ? handleCancelDelete
                : null
          } // Handle cancel action in confirmation modal
          type={modalType}
        />
      )}

      {/*<div className="overlay overlay-filter"></div>
      <div className="overlay overlay-image"></div>
      */}
      <header className="form-header">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/logo3new.png"}
            alt="Logo"
            className="logo"
          />
          <h1>Wholesale Tires Order</h1>
          <img
            src={process.env.PUBLIC_URL + "/images/logo3new.png"}
            alt="Logo"
            className="logo"
          />
        </div>
      </header>

      {/* Check if user is logged in */}
      {!user ? (
        // If not logged in, display login/register prompt
        <p className="login-prompt">
          Please{" "}
          <Link to="/login" className="cta-link" href="/login">
            log in
          </Link>{" "}
          or
          <Link to="/register" className="cta-link" href="/register">
            register
          </Link>{" "}
          to send an order.
        </p>
      ) : (
        // If logged in, display a welcome message
        <>
          <p className="welcome-message">
            Welcome, <span className="userName">{user.name}!</span> You can now
            send your order.
          </p>
        
        </>
      )}

<div className="container-inner">
            <article className="form-container">
              {formData.tireSize && (
                <div className="order-preview">
                  <p>{formData.tireSize}</p>
                </div>
              )}

              <form action="#" onSubmit={handleSaveOrder}>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Make:<span className="star">*</span>
                      <select
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Make</option>
                        <option value="Any">Any</option>
                        <option value="Yokohama">Yokohama</option>
                        <option value="Bridgestone">Bridgestone</option>
                        <option value="Michelin">Michelin</option>
                        <option value="Continental">Continental</option>
                        <option value="Tayo Tires">Toyo Tires</option>
                        <option value="Falken">Falken</option>
                        <option value="Sumitomo">Sumitomo</option>
                        <option value="Dunlop">Dunlop</option>
                        <option value="Nitto">Nitto</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Type:<span className="star">*</span>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="All-Season">All-Season</option>
                        <option value="Winter">Winter</option>
                        <option value="Summer">Summer</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Diameter:<span className="star">*</span>
                      <select
                        name="diameter"
                        value={selectedDiameter}
                        onChange={handleDiameterChange}
                        required
                      >
                        <option value="">Select Diameter</option>
                        {TireSizes.map((tire) => (
                          <option key={tire.diameter} value={tire.diameter}>
                            {tire.diameter}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Tire Size:<span className="star">*</span>
                      <select
                        name="tireSize"
                        value={formData.tireSize}
                        onChange={handleSizeChange}
                        required
                        disabled={!selectedDiameter}
                      >
                        <option value="">Select Tire Size</option>
                        {availableSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Quantity:<span className="star">*</span>
                      <input
                        type="number"
                        name="quantity"
                        placeholder="quantity*"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Speed Rating:
                      <input
                        type="text"
                        name="speed_Rating"
                        value={formData.speedRating}
                        onChange={handleChange}
                        placeholder="optional"
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row half">
                  <div className="form-group">
                    <label>
                      Load Index:
                      <input
                        type="number"
                        name="load_index"
                        value={formData.load_index}
                        onChange={handleChange}
                        placeholder="optional"
                      />
                    </label>
                  </div>

                  <div className="form-group checkbox-container">
                    <label htmlFor="checkbox">Double Loading</label>
                    <input
                      id="checkbox"
                      type="checkbox"
                      checked={doubleLoading}
                      onChange={() => setDoubleLoading(!doubleLoading)}
                    />
                  </div>
                </div>

                <div className="table-btns">
                  <button disabled={!isQuantityValid} type="submit">
                    {editingOrder !== null ? "Update Order" : "Save Order"}
                  </button>
                  <button
                    type="reset"
                    className="continue-selection-btn"
                    onClick={() => {
                      handleNewCategory();
                    }}
                  >
                    Reset
                  </button>
                </div>
                <p className="mandatory-note">* is mandatory</p>
                {message && <p className="message">{message}</p>}
              </form>

              <div className="percentage-fill">
                Container Percentage Fill : {percentageFill.toFixed(2)}%
              </div>

              <div className="form-row">
                <div className="form-group textArea">
                  <textarea
                    name="customerMessage"
                    placeholder="Your message"
                    rows="4"
                    value={formData.customerMessage || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="button"
                className="send-order-btn"
                onClick={handleSendOrderEmail}
                disabled={!user}
              >
                Send Order
              </button>

              <p className="contact-message">
                If you need any further assistance with your order or the use of
                this form, just get in touch with us. We are here to help!
              </p>
            </article>

            <TireSelection
              orders={orders}
              setOrders={setOrders}
              totalUnits={totalUnits}
              setTotalUnits={setTotalUnits}
              message={message}
              percentageFill={percentageFill}
              handleEditOrder={handleEditOrder}
              handleDeleteOrder={handleDeleteOrder}
              handleNewCategory={handleNewCategory}
              handleClearOrders={handleClearOrders}
            />
          </div>
    </div>
  );
};

export default OrderForm;