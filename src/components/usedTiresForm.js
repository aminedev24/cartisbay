import React, { useState, useEffect } from "react";
import "../css/usedTiresForm.css";
import TireSelection from "./tireSelection";
import Modal from './alertModal';
import { useUser } from "./userContext"; // Importing the useUser hook to access user data
import {Link} from 'react-router-dom';
import {TireSizes} from './tireSizes';
const OrderForm = ({
  formData,
  setFormData,
  orders,
  setOrders,
  setTotalUnits,
  totalUnits,
  hasPromptedForDoubleLoading,
  setHasPromptedForDoubleLoading
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
        "A 40ft HC container can hold 2,000 units with standard loading. If you wish to load up to 3,000 units, please consider the double-loading option."
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

  //console.log(user)


  useEffect(() => {
    const fetchOrders = async () => {
      try {
      
        if (!user || !user.uid) {
          console.error('User not authenticated');
          return;
        }
  
        const response = await fetch('server/fetchTires.php', {
          method: 'GET',
          credentials: 'include', // Send cookies
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.uid}`, // Pass the UID in the Authorization header
          },
        });
  
        if (!response.ok) {
          const errorMessage = `Network response was not ok: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
  
        const data = await response.json();
        setOrders(data); // Set the fetched orders
        console.log(data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);


  const handleSendOrderEmail = async () => {
    // Prepare the data to be sent to the backend
    const { make, load_index, speed_rating, quantity, type, customerMessage } = formData;
  
    // Split the tireSize string into width, aspect ratio, and rim diameter
    const [width, aspect_ratio, rim_diameter] = formData.tireSize.split(/\/|R/);
  
    const orderData = {
      user_id: user.uid ? user.uid : '',
      email: user.email,
      make,
      width,
      aspect_ratio,
      rim_diameter,
      load_index,
      speed_rating,
      quantity: parseInt(quantity, 10),
      type,
      customerMessage: customerMessage || "",
    };
  
    try {
      const response = await fetch('server/sendTireOrder.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage("Your order has been successfully sent!");
      } else {
        setMessage(result.message || "An error occurred while sending the order.");
      }
    } catch (error) {
      setMessage("An error occurred while connecting to the server.");
    }
  };

  const handleEditOrder = (make, index) => {
    console.log("Maker:", make);
    console.log("Index:", index);
    console.log("Orders:", orders);

    // Check if orders[maker] is defined and is an array
    if (!orders.some(order => order.make === make)) {
        console.error(`No orders found for maker: ${make}`);
        return;
    }
    const ordersForMake = orders.filter(order => order.make === make);

    // Check if the index is within the bounds of the orders for the specific make
    if (index < 0 || index >= ordersForMake.length) {
        console.error(`Index ${index} is out of bounds for maker: ${make}`);
        return;
    }

    const orderToEdit = ordersForMake[index];
    console.log('orderToedit :', orderToEdit)
    // Check if orderToEdit is defined
    if (!orderToEdit) {
        console.error(`No order found at index ${index} for maker: ${make}`);
        return;
    }

    setFormData({
        make: make,
        quantity: orderToEdit.quantity,
        load_index: orderToEdit.load_index,
        speed_rating: orderToEdit.speed_rating,
        rim_diameter: orderToEdit.rim_diameter,
        type: orderToEdit.type,
        tireSize: `${orderToEdit.width}/${orderToEdit.aspect_ratio}R${orderToEdit.rim_diameter}`,
    });
    setEditingOrder(index);
    setShowForm(true);
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

  const handleSaveOrder = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.make || !formData.type || !formData.tireSize || !formData.quantity) {
        setMessage("Please fill in all required fields.");
        return;
    }

    const [width, aspect_ratio, rim_diameter] = formData.tireSize.split(/\/|R/);
    let quantity = parseInt(formData.quantity, 10);

    // Ensure quantity is valid
    if (isNaN(quantity) || quantity < 1) {
        setMessage("Quantity must be at least 1.");
        return;
    }

    const newOrder = {
        make: formData.make,
        width: parseInt(width, 10),
        aspect_ratio: parseInt(aspect_ratio, 10),
        rim_diameter: parseInt(rim_diameter, 10),
        load_index: formData.load_index,
        speed_rating: formData.speed_rating,
        quantity: quantity,
        type: formData.type,
    };

    const updatedOrders = [...orders]; // Create a copy of the existing orders array
    let newTotalUnits = updatedOrders.reduce((acc, order) => acc + order.quantity, 0);

    // Check for existing orders and update accordingly
    if (editingOrder !== null) {
        const previousOrder = updatedOrders[editingOrder];
        if (previousOrder) {
            newTotalUnits -= previousOrder.quantity;

            const existingOrderIndex = updatedOrders.findIndex(
                (order) =>
                    order.width === newOrder.width &&
                    order.aspect_ratio === newOrder.aspect_ratio &&
                    order.rim_diameter === newOrder.rim_diameter &&
                    order.type === newOrder.type &&
                    order.make === newOrder.make
            );

            if (existingOrderIndex !== -1 && existingOrderIndex !== editingOrder) {
                const accumulatedOrder = updatedOrders[existingOrderIndex];
                accumulatedOrder.quantity += newOrder.quantity;
                newTotalUnits += newOrder.quantity;
                updatedOrders.splice(editingOrder, 1);
                setMessage(`Your order has been updated and quantities have been accumulated!`);
            } else {
                updatedOrders[editingOrder] = newOrder;
                newTotalUnits += newOrder.quantity;
                setMessage(`Your order has been updated!`);
            }
        } else {
            setMessage("Error: Unable to find the order to edit.");
            return;
        }
    } else {
        const existingOrderIndex = updatedOrders.findIndex(
            (order) =>
                order.width === newOrder.width &&
                order.aspect_ratio === newOrder.aspect_ratio &&
                order.rim_diameter === newOrder.rim_diameter &&
                order.type === newOrder.type &&
                order.make === newOrder.make
        );

        if (existingOrderIndex !== -1) {
            updatedOrders[existingOrderIndex].quantity += newOrder.quantity;
            newTotalUnits += newOrder.quantity;
            setMessage(`Your order has been updated and quantities have been accumulated!`);
        } else {
            updatedOrders.push(newOrder);
            newTotalUnits += newOrder.quantity;
            setMessage(`Your new order has been added!`);
        }
    }

    setOrders(updatedOrders);
    setTotalUnits(newTotalUnits);

    // Prepare order data for submission
    const orderData = {
        order_id: editingOrder !== null ? orders[editingOrder]?.id : null,
        user_id: user.uid,
        make: formData.make,
        width: newOrder.width,
        aspect_ratio: newOrder.aspect_ratio,
        rim_diameter: newOrder.rim_diameter,
        quantity: quantity,
        type: formData.type,
    };

    if (formData.load_index) {
        orderData.load_index = formData.load_index;
    }
    if (formData.speed_rating) {
        orderData.speed_rating = formData.speed_rating;
    }

    console.log(`Payload sent to server: ${JSON.stringify(orderData)}`);

    try {
        const url = editingOrder !== null
            ? 'server/edit_order.php'
            : 'server/saveOrder.php';

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();

        if (!response.ok) {
            setMessage(result.message || `Server error: ${response.statusText}`);
        } else if (result.success) {
            setMessage("Your order has been successfully saved!");
        } else {
            setMessage(result.message || "An error occurred while saving the order.");
        }
    } catch (error) {
        setMessage(`An error occurred while connecting to the server: ${error.message}`);
    }

    setFormData({
        make: "",
        quantity: "",
        load_index: "",
        speed_rating: "",
        type: "",
        tireSize: "",
    });
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
    const response = await fetch('server/delete_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    setMessage(`An error occurred while deleting the order: ${error.message}`);
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
    clear_all: true,  // Indicate that we want to clear all orders
  };

  try {
    const response = await fetch('delete_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      setMessage(result.message || "An error occurred while clearing orders.");
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
              onConfirm={modalType === MODAL_TYPES.CLEAR_ALL ? handleConfirmClearAll : modalType === MODAL_TYPES.CONFIRMATION ? handleConfirmDelete : null} // Handle confirmation only in the appropriate modal
              onCancel={modalType === MODAL_TYPES.CLEAR_ALL ? handleCancelClearAll : modalType === MODAL_TYPES.CONFIRMATION ? handleCancelDelete : null} // Handle cancel action in confirmation modal
              type={modalType}
            />
          )}

      {/*<div className="overlay overlay-filter"></div>
      <div className="overlay overlay-image"></div>
      */}
      <header className="form-header">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="Logo"
            className="logo"
          />
          <h1>Wholesale Tires Order</h1>
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="Logo"
            className="logo"
          />
        </div>
      </header>

               {/* Check if user is logged in */}
               {!user ? (
           
             // If not logged in, display login/register prompt
             <p className="login-prompt">
             Please <Link to='/login' className="cta-link" href="/login">log in</Link> or
             <Link to='/register' className="cta-link" href="/register">register</Link> to send an order.
           </p>
          ) : (
            // If logged in, display a welcome message
            <>
            <p className="welcome-message">
              Welcome, <span className="userName">{user.name}!</span> You can now send your order.
            </p>
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
                <label htmlFor="checkbox">
                  Double Loading
                </label>
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

          <div className='form-row'>
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
            </>

          )}
          
      
    </div>
  );
};

export default OrderForm;
