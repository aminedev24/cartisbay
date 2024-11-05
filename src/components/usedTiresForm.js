import React, { useState } from "react";
import "../css/usedTiresForm.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    maker: "",
    width: "",
    aspectRatio: "",
    rimDiameter: "",
    loadIndex: "",
    speedRating: "",
    quantity: "",
    type: "", // Default value
    //quality: "New", // Default value
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Function to open popup
  const openPopup = () => setIsPopupOpen(true);

  // Function to close popup
  const closePopup = () => setIsPopupOpen(false);

  const [orders, setOrders] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");
  const [totalUnits, setTotalUnits] = useState(0);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Updated handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      maker: formData.maker, // Include maker in the newOrder
      width: formData.width,
      aspectRatio: formData.aspectRatio,
      rimDiameter: formData.rimDiameter,
      loadIndex: formData.loadIndex,
      speedRating: formData.speedRating,
      quantity: parseInt(formData.quantity, 10),
      type: formData.type, // Include type
      //quality: formData.quality, // Include quality
    };

    // Update orders
    if (editingOrder !== null) {
      // Edit existing order
      const maker = formData.maker;
      const updatedOrders = { ...orders };
      const previousQuantity = updatedOrders[maker][editingOrder].quantity; // Get previous quantity
      updatedOrders[maker][editingOrder] = newOrder; // Update the specific order
      setOrders(updatedOrders);

      // Update total units: subtract previous quantity and add new quantity
      setTotalUnits((prev) => prev - previousQuantity + newOrder.quantity);
      setMessage(`Your order has been updated!`);
    } else {
      // Check for existing orders for the same maker and dimensions
      const maker = formData.maker;
      const updatedOrders = { ...orders };

      if (!updatedOrders[maker]) {
        updatedOrders[maker] = [];
      }

      // Check if the order already exists
      const existingOrderIndex = updatedOrders[maker].findIndex(
        (order) =>
          order.width === newOrder.width &&
          order.aspectRatio === newOrder.aspectRatio &&
          order.rimDiameter === newOrder.rimDiameter &&
          order.type === newOrder.type 
          //order.quality === newOrder.quality, // Check for quality
      );

      if (existingOrderIndex !== -1) {
        // If the order already exists, update the quantity
        updatedOrders[maker][existingOrderIndex].quantity += newOrder.quantity;
        setOrders(updatedOrders);
        setTotalUnits((prev) => prev + newOrder.quantity); // Update total units
        setMessage(
          `Your existing order has been updated with additional quantity!`,
        );
      } else {
        // If it doesn't exist, add the new order
        updatedOrders[maker].push(newOrder);
        setOrders(updatedOrders);
        setTotalUnits((prev) => prev + newOrder.quantity); // Update total units
        setMessage(`Great, your order has been saved!`);
      }
    }

    // Reset form data
    setFormData({
      maker: "Yokohama",
      width: "",
      aspectRatio: "",
      rimDiameter: "",
      loadIndex: "",
      speedRating: "",
      quantity: "",
      type: "All-Season", // Reset to default
      //quality: "New", // Reset to default
    });
    setEditingOrder(null); // Reset editing state
    setShowForm(false);
  };

  // Updated handleEditOrder function
  const handleEditOrder = (maker, index) => {
    const orderToEdit = orders[maker][index];
    setFormData({
      maker: maker,
      width: orderToEdit.width,
      aspectRatio: orderToEdit.aspectRatio,
      rimDiameter: orderToEdit.rimDiameter,
      loadIndex: orderToEdit.loadIndex,
      speedRating: orderToEdit.speedRating,
      quantity: orderToEdit.quantity,
      type: orderToEdit.type, // Set type
      //quality: orderToEdit.quality, // Set quality
    });
    setEditingOrder(index); // Set editing state
    setShowForm(true); // Show form for editing
  };

  const handleDeleteOrder = (maker, index) => {
    const updatedOrders = { ...orders };
    const quantityToRemove = updatedOrders[maker][index].quantity;

    // Remove order from the list
    updatedOrders[maker].splice(index, 1);

    // If the maker's orders array is empty, delete the maker from orders
    if (updatedOrders[maker].length === 0) {
      delete updatedOrders[maker];
    }

    setOrders(updatedOrders);
    setTotalUnits(totalUnits - quantityToRemove); // Update total units
    setMessage(`Order has been deleted.`);
  };

  // Updated handleNewCategory function
  const handleNewCategory = () => {
    // Reset the form data for a new category
    setFormData({
      maker: "",
      width: "",
      aspectRatio: "",
      rimDiameter: "",
      loadIndex: "",
      speedRating: "",
      quantity: "",
      type: "", // Reset to default
      //quality: "New", // Reset to default
    });
    setShowForm(true);
    setMessage("");
    setEditingOrder(null);
  };

  return (
    <div className="order-form-container">
      {/* Form and Real-Time Preview */}
      <div className={`order-form ${Object.keys(orders).length > 0 ? 'visible' : 'hidden'}`} >
        <h1>Wholesale Tires Order</h1>

      

      
      <>
            <form className={`order-form form`} onSubmit={handleSubmit}>
              <label>
                Maker:<span className="star">*</span>
                <select
                  name="maker"
                  value={formData.maker}
                  onChange={handleChange}
                >
                  <option value="Make">Make</option>
                  <option value="Yokohama">Yokohama</option>
                  <option value="Bridgestone">Bridgestone</option>
                  <option value="Michelin">Michelin</option>
                  <option value="Continental">Continental</option>
                </select>
              </label>

              {/* New Quality Field 
              <label>
                Quality:
                <select
                  name="quality"
                  value={formData.quality}
                  onChange={handleChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>
              */}

              {/* New Type Field */}
              <label>
                Type:<span className="star">*</span>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="type">type</option>
                  <option value="All-Season">All-Season</option>
                  <option value="Winter">Winter</option>
                  <option value="Summer">Summer</option>
                  <option value="Off-Road">Off-Road</option>
                </select>
              </label>

              <label>
                Width:<span className="star">*</span>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Aspect Ratio:
                <input
                  type="number"
                  name="aspectRatio"
                  value={formData.aspectRatio}
                  onChange={handleChange}
                  placeholder="optional"
                />
              </label>
              <label>
                Rim Diameter:<span className="star">*</span>
                <input
                  type="number"
                  name="rimDiameter"
                  value={formData.rimDiameter}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Load index:
                <input
                  type="number"
                  name="loadIndex"
                  value={formData.loadIndex}
                  onChange={handleChange}
                  placeholder="optional"
                />
              </label>
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

              <label>
                Quantity:<span className="star">*</span>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">
                {editingOrder !== null ? "Update Order" : "Save Order"}
              </button>
            </form>

            {/* Real-Time Preview */}
           
            <div className="output">
              <h3>Order Preview:</h3>
              <p>
                {`${formData.maker ? formData.maker : ''}: size ${formData.width}${formData.aspectRatio ? ` / ${formData.aspectRatio}` : ''} R ${formData.rimDiameter}${formData.loadIndex ? ` - ${formData.loadIndex}` : ''}${formData.speedRating ? ` ${formData.speedRating}` : ''}${formData.type ? ` - ${formData.type}` : ''}${formData.quantity ? ` - quantity: ${formData.quantity} units` : ''}`}
              </p>

              
              {/* Popup with slide-up effect */}
              {showForm &&
                  <div
                  className={`popup ${Object.keys(orders).length > 1 ?'visible' : 'hidden'}`}
                  onClick={closePopup}
                >
                  <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/tire-size-ilustration2.png`}
                      alt="Tire"
                      className="popup-image"
                    />
                  </div>
                </div>
              }
            </div>

           
          </>
      {/* Show order details if there are saved orders */}
      {Object.keys(orders).length > 0 && (
      
          <div className="tire-selection-container">
            <h3>Your Tire Selection:</h3>
            {Object.keys(orders).map((maker) => (
              <div key={maker}>
                <h4>{maker}:</h4>
                {orders[maker].map((order, index) => (
                  <div key={index} className="order-item">
                    <p>
                      <strong>Size: </strong>{order.width} / {order.aspectRatio} R{" "}
                      {order.rimDiameter}
                    </p>
                    <p>
                      <strong>Quantity: </strong>{order.quantity}
                    </p>
                    <p>
                      <strong>Type: </strong> {order.type}
                    </p>
                    <div className="button-container">
                      <button
                        onClick={() => handleEditOrder(maker, index)}
                        className="small-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(maker, index)}
                        className="small-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <p>
              <strong>Total Order:</strong> {totalUnits} units
            </p>

            <p>{message}</p>
            <button onClick={handleNewCategory}>
              Continue to a New Selection
            </button>
          </div>
        )}
      </div>
    </div>


  
  );
};

export default OrderForm;
