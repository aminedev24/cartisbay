import React, { useState, useEffect } from "react";
import "../css/usedTiresForm.css";
import TireSelection from "./tireSelection";
import Modal from './alertModal';
import { useUser } from "./userContext"; // Importing the useUser hook to access user data
import {Link} from 'react-router-dom';

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
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { user, loading } = useUser(); // Accessing the user from context

  const tireSizes = [
    {
      diameter: 13,
      sizes: [
        "155/80R13",
        "165/80R13",
        "175/70R13",
        "185/70R13",
        "185/65R13",
        "195/65R13",
        "175/65R13",
        "155/70R13",
        "145/80R13",
        "165/70R13",
      ],
    },
    {
      diameter: 14,
      sizes: [
        "165/70R14",
        "175/70R14",
        "185/70R14",
        "185/65R14",
        "195/65R14",
        "195/70R14",
        "205/65R14",
        "205/60R14",
        "215/60R14",
        "225/60R14",
        "185/60R14",
        "195/60R14",
      ],
    },
    {
      diameter: 15,
      sizes: [
        "185/65R15",
        "195/65R15",
        "205/65R15",
        "205/60R15",
        "215/65R15",
        "225/65R15",
        "195/60R15",
        "205/55R15",
        "215/60R15",
        "225/60R15",
        "235/60R15",
        "245/60R15",
      ],
    },
    {
      diameter: 16,
      sizes: [
        "205/55R16",
        "215/55R16",
        "225/55R16",
        "205/60R16",
        "215/60R16",
        "225/60R16",
        "235/60R16",
        "245/60R16",
        "215/65R16",
        "225/65R16",
        "235/65R16",
      ],
    },
    {
      diameter: 17,
      sizes: [
        "215/45R17",
        "225/45R17",
        "235/45R17",
        "245/45R17",
        "255/45R17",
        "215/50R17",
        "225/50R17",
        "235/50R17",
        "215/55R17",
        "225/55R17",
        "235/55R17",
        "225/60R17",
      ],
    },
    {
      diameter: 18,
      sizes: [
        "225/40R18",
        "235/40R18",
        "245/40R18",
        "255/40R18",
        "265/40R18",
        "225/45R18",
        "235/45R18",
        "245/45R18",
        "255/45R18",
        "275/40R18",
        "285/40R18",
        "245/50R18",
      ],
    },
    {
      diameter: 19,
      sizes: [
        "225/35R19",
        "235/35R19",
        "245/35R19",
        "255/35R19",
        "265/35R19",
        "275/35R19",
        "285/35R19",
        "225/40R19",
        "235/40R19",
        "245/40R19",
        "255/40R19",
        "275/40R19",
      ],
    },
    {
      diameter: 20,
      sizes: [
        "245/35R20",
        "255/35R20",
        "265/35R20",
        "275/35R20",
        "285/35R20",
        "295/35R20",
        "305/35R20",
        "245/40R20",
        "255/40R20",
        "265/40R20",
        "275/40R20",
        "285/40R20",
      ],
    },
    {
      diameter: 21,
      sizes: [
        "255/30R21",
        "265/30R21",
        "275/30R21",
        "285/30R21",
        "295/30R21",
        "305/30R21",
        "255/35R21",
        "265/35R21",
        "275/35R21",
        "285/35R21",
        "295/35R21",
        "315/30R21",
      ],
    },
    {
      diameter: 22,
      sizes: [
        "265/30R22",
        "275/30R22",
        "285/30R22",
        "295/30R22",
        "305/30R22",
        "315/30R22",
        "325/30R22",
        "335/30R22",
        "295/35R22",
        "305/35R22",
      ],
    },
    { diameter: 23, sizes: ["285/35R23", "305/30R23", "325/30R23"] },
    {
      diameter: 24,
      sizes: ["295/30R24", "305/30R24", "325/30R24", "335/30R24"],
    },
    {
      diameter: 26,
      sizes: ["295/30R26", "305/30R26", "315/30R26", "325/30R26"],
    },
    { diameter: 28, sizes: ["295/25R28", "315/30R28", "325/35R28"] },
    { diameter: 30, sizes: ["315/30R30", "325/30R30", "335/30R30"] },
  ];

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
      setShowModal(true);
      setHasPromptedForDoubleLoading(true); // Set the flag to true after showing the modal
    }

    const fill = (existingQuantity / totalCapacity) * 100;
    setPercentageFill(fill); // Allow percentage to exceed 100%
  }, [orders, doubleLoading, hasPromptedForDoubleLoading]); // Add hasPromptedForDoubleLoading to dependencies

  const handleDiameterChange = (e) => {
    const diameter = parseInt(e.target.value);
    setSelectedDiameter(diameter);
    const sizes =
      tireSizes.find((tire) => tire.diameter === diameter)?.sizes || [];
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

  const handleEditOrder = (maker, index) => {
    console.log("Maker:", maker);
    console.log("Index:", index);
    console.log("Orders:", orders);

    // Check if orders[maker] is defined and is an array
    if (!orders[maker]) {
        console.error(`No orders found for maker: ${maker}`);
        return;
    }

    if (index < 0 || index >= orders[maker].length) {
        console.error(`Index ${index} is out of bounds for maker: ${maker}`);
        return;
    }

    const orderToEdit = orders[maker][index];

    // Check if orderToEdit is defined
    if (!orderToEdit) {
        console.error(`No order found at index ${index} for maker: ${maker}`);
        return;
    }

    setFormData({
        maker: maker,
        quantity: orderToEdit.quantity,
        loadIndex: orderToEdit.loadIndex,
        speedRating: orderToEdit.speedRating,
        type: orderToEdit.type,
        tireSize: `${orderToEdit.width}/${orderToEdit.aspectRatio}R${orderToEdit.rimDiameter}`,
    });
    setEditingOrder(index);
    setShowForm(true);
};

  useEffect(() => {
    const requiredFieldsFilled =
      formData.maker && formData.type && formData.quantity && formData.tireSize;
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
    if (!formData.maker || !formData.type || !formData.tireSize || !formData.quantity) {
      setMessage("Please fill in all required fields.");
      return;
    }
  
    const [width, aspectRatio, rimDiameter] = formData.tireSize.split(/\/|R/);
    let quantity = parseInt(formData.quantity, 10);
  
    // Ensure quantity is valid
    if (isNaN(quantity) || quantity < 1) {
      setMessage("Quantity must be at least 1.");
      return;
    }
  
    const totalCapacity = doubleLoading ? 3000 : 2000;
  
    const newOrder = {
      maker: formData.maker,
      width,
      aspectRatio,
      rimDiameter,
      loadIndex: formData.loadIndex,
      speedRating: formData.speedRating,
      quantity: quantity,
      type: formData.type,
    };
  
    const maker = formData.maker;
    const updatedOrders = { ...orders };
  
    if (!updatedOrders[maker]) {
      updatedOrders[maker] = [];
    }
  
    let existingQuantity = Object.values(updatedOrders)
      .flat()
      .reduce((acc, order) => acc + order.quantity, 0);
    let newTotalUnits = existingQuantity;
  
    // Calculate potential new total units
    const potentialNewTotalUnits =
      editingOrder !== null
        ? newTotalUnits - orders[formData.maker][editingOrder].quantity + quantity
        : newTotalUnits + quantity;
  
    // Check for existing orders and update accordingly
    if (editingOrder !== null) {
      const previousOrder = orders[maker][editingOrder];
      newTotalUnits -= previousOrder.quantity;
  
      const existingOrderIndex = updatedOrders[maker].findIndex(
        (order) =>
          order.width === newOrder.width &&
          order.aspectRatio === newOrder.aspectRatio &&
          order.rimDiameter === newOrder.rimDiameter &&
          order.type === newOrder.type
      );
  
      if (existingOrderIndex !== -1 && existingOrderIndex !== editingOrder) {
        const accumulatedOrder = updatedOrders[maker][existingOrderIndex];
        accumulatedOrder.quantity += newOrder.quantity;
        newTotalUnits += newOrder.quantity;
        updatedOrders[maker].splice(editingOrder, 1);
        setMessage(`Your order has been updated and quantities have been accumulated!`);
      } else {
        updatedOrders[maker][editingOrder] = newOrder;
        newTotalUnits += newOrder.quantity;
        setMessage(`Your order has been updated!`);
      }
    } else {
      const existingOrderIndex = updatedOrders[maker].findIndex(
        (order) =>
          order.width === newOrder.width &&
          order.aspectRatio === newOrder.aspectRatio &&
          order.rimDiameter === newOrder.rimDiameter &&
          order.type === newOrder.type
      );
  
      if (existingOrderIndex !== -1) {
        updatedOrders[maker][existingOrderIndex].quantity += newOrder.quantity;
        newTotalUnits += newOrder.quantity;
        setMessage(`Your order has been updated and quantities have been accumulated!`);
      } else {
        updatedOrders[maker].push(newOrder);
        newTotalUnits += newOrder.quantity;
        setMessage(`Your new order has been added!`);
      }
    }
  
    // Proceed with the order submission
    setOrders(updatedOrders);
    setTotalUnits(newTotalUnits);
  
    // Prepare the data to be sent to the backend
    const orderData = {
      user_id: user.uid,
      maker: formData.maker,
      width,
      aspectRatio,
      rimDiameter,
      loadIndex: formData.loadIndex,
      speedRating: formData.speedRating,
      quantity: quantity,
      type: formData.type,
    };
  
    try {
      // Send the order data to the backend API
      const response = await fetch('server/saveOrder.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
      console.log(orderData)
  
      if (response.ok) {
        setMessage("Your order has been successfully saved!");
      } else {
        setMessage(result.message || "An error occurred while saving the order.");
      }
    } catch (error) {
      setMessage("An error occurred while connecting to the server.");
    }
  
    // Clear the form after successful submission
    setFormData({
      maker: "",
      quantity: "",
      loadIndex: "",
      speedRating: "",
      type: "",
      tireSize: "",
      rimDiameter: "",
    }); // Reset form data to initial state
  };
  
  const handleDeleteOrder = (maker, index) => {
    const updatedOrders = { ...orders };
    const quantityToRemove = updatedOrders[maker][index].quantity;
    updatedOrders[maker].splice(index, 1);
    if (updatedOrders[maker].length === 0) {
      delete updatedOrders[maker];
    }
    setOrders(updatedOrders);
    setTotalUnits(totalUnits - quantityToRemove);
    setMessage(`Order has been deleted.`);
  };

  const handleNewCategory = () => {
    setFormData({
      maker: "",
      quantity: "",
      loadIndex: "",
      speedRating: "",
      type: "",
      tireSize: "",
      rimDiameter: "",
    });
    setShowForm(true);
    setMessage("");
    setEditingOrder(null);
    setHasPromptedForDoubleLoading(false); // Reset the prompt flag when starting a new category
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div id="usedTiresForm" className="usedTiresForm-container">
      {showModal && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}

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
               {user ? (
            // If logged in, display a welcome message
            <p className="welcome-message">
              Welcome, {user.name}! You can now send your order.
            </p>
          ) : (
            // If not logged in, display login/register prompt
            <p className="login-prompt">
              Please <Link to='/login' className="cta-link" href="/login">log in</Link> or
              <Link to='/register' className="cta-link" href="/register">register</Link> to send an order.
            </p>
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
                    name="maker"
                    value={formData.maker}
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
                    {tireSizes.map((tire) => (
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
                    name="speedRating"
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
                    name="loadIndex"
                    value={formData.loadIndex}
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
        />
      </div>
    </div>
  );
};

export default OrderForm;
