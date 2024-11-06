import React, { useState } from "react";
import "../css/usedTiresForm.css";
import TireSelection from "./tireSelection";
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
          order.type === newOrder.type,
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
    <div  id="usedTiresForm" class="usedTiresForm-container">
      <div class="form-header">
        <h1>Wholesale Tires Order</h1>

      </div>
      <div class="container-inner">
        <div class="form-container">
          <form action="#" onSubmit={handleSubmit}>
            <div class="form-row">
              <div class="form-group">
                <label>
                  Maker:<span class="star">*</span>
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
              </div>
              <div class="form-group">
                <label>
                  Type:<span class="star">*</span>
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
              </div>

              <div class="form-group">
                <label>
                  Width:<span class="star">*</span>
                  <input
                    type="number"
                    name="width"
                    placeholder="width*"
                    value={formData.width}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>
                  Rim Diameter:<span class="star">*</span>
                  <input
                    type="number"
                    name="rimDiameter"
                    placeholder="rim Diameter*"
                    value={formData.rimDiameter}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div class="form-group">
                <label>
                  Quantity:<span class="star">*</span>
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

              <div class="form-group">
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
              </div>
            </div>
            <div class="form-row half">
              <div class="form-group">
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

              <div class="form-group">
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
              </div>
            </div>
            <button type="submit">
              {editingOrder !== null ? "Update Order" : "Save Order"}
            </button>
          </form>
        </div>
        <div class="promo">
          <h3>Order Preview:</h3>
          <p>
            <strong>{`${formData.maker ? formData.maker : ""}`}</strong>
            : size <strong>{formData.width}</strong>
            {formData.aspectRatio ? ` / <strong>${formData.aspectRatio}</strong>` : ""}
            R <strong>{formData.rimDiameter}</strong>
            {formData.loadIndex ? ` - <strong>${formData.loadIndex}</strong>` : ""}
            {formData.speedRating ? ` <strong>${formData.speedRating}</strong>` : ""}
            {formData.type ? ` - <strong>${formData.type}</strong>` : ""}
            {formData.quantity ? ` - quantity: <strong>${formData.quantity} units</strong>` : ""}
          </p>

        </div>
      </div>
      <TireSelection
        orders={orders}
        totalUnits={totalUnits}
        message={message}
        handleEditOrder={handleEditOrder}
        handleDeleteOrder={handleDeleteOrder}
        handleNewCategory={handleNewCategory}
      />
     
    </div>
  );
};

export default OrderForm;
