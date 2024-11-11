import React, { useState, useEffect } from "react";
import "../css/usedTiresForm.css";
import TireSelection from "./tireSelection";

const OrderForm = ({ formData, setFormData, orders, setOrders, setTotalUnits, totalUnits }) => {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false); // To track form validity

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Check if required fields are filled out to validate the form
    const requiredFieldsFilled =
      formData.maker && formData.type && formData.width && formData.rimDiameter && formData.quantity;
    setIsFormValid(requiredFieldsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.maker || !formData.type || !formData.width || !formData.rimDiameter || !formData.quantity) {
      setMessage("Please fill in all required fields.");
      return;
    }
  
    const newOrder = {
      maker: formData.maker,
      width: formData.width,
      aspectRatio: formData.aspectRatio,
      rimDiameter: formData.rimDiameter,
      loadIndex: formData.loadIndex,
      speedRating: formData.speedRating,
      quantity: parseInt(formData.quantity, 10),
      type: formData.type,
    };
  
    const maker = formData.maker;
    const updatedOrders = { ...orders };
  
    if (!updatedOrders[maker]) {
      updatedOrders[maker] = [];
    }
  
    console.log("---- Order Submission ----");
    console.log("Initial Total Units:", totalUnits);
  
    if (editingOrder !== null) {
      const previousOrder = orders[maker][editingOrder];
      console.log("Editing Existing Order:", previousOrder);
  
      // Subtract the old order's quantity from the total before updating
      setTotalUnits((prev) => {
        const updatedTotal = prev - previousOrder.quantity;
        console.log("Subtracted Previous Order Quantity:", previousOrder.quantity);
        console.log("Total After Subtraction:", updatedTotal);
        return updatedTotal;
      });
  
      const existingOrderIndex = updatedOrders[maker].findIndex(
        (order) =>
          order.width === newOrder.width &&
          order.aspectRatio === newOrder.aspectRatio &&
          order.rimDiameter === newOrder.rimDiameter &&
          order.type === newOrder.type
      );
  
      if (existingOrderIndex !== -1 && existingOrderIndex !== editingOrder) {
        const accumulatedOrder = updatedOrders[maker][existingOrderIndex];
        console.log("Found Matching Order to Accumulate:", accumulatedOrder);
  
        accumulatedOrder.quantity += newOrder.quantity;
        console.log("New Accumulated Quantity:", accumulatedOrder.quantity);
  
        setTotalUnits((prev) => {
          const updatedTotal = prev + newOrder.quantity;
          console.log("Total After Adding Accumulated Quantity:", updatedTotal);
          return updatedTotal;
        });
  
        updatedOrders[maker].splice(editingOrder, 1);
  
        setMessage(`Your order has been updated and quantities have been accumulated!`);
      } else {
        updatedOrders[maker][editingOrder] = newOrder;
  
        setTotalUnits((prev) => {
          const updatedTotal = prev + newOrder.quantity;
          console.log("Total After Updating with New Quantity:", updatedTotal);
          return updatedTotal;
        });
  
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
        console.log("Found Existing Order. Updated Quantity:", updatedOrders[maker][existingOrderIndex].quantity);
  
        setTotalUnits((prev) => {
          const updatedTotal = prev + newOrder.quantity;
          console.log("Total After Adding Existing Order Quantity:", updatedTotal);
          return updatedTotal;
        });
  
        setMessage(`Your order has been updated and quantities have been accumulated!`);
      } else {
        updatedOrders[maker].push(newOrder);
  
        setTotalUnits((prev) => {
          const updatedTotal = prev + newOrder.quantity;
          console.log("Added New Order. Total After Addition:", updatedTotal);
          return updatedTotal;
        });
  
        setMessage(`Your new order has been added!`);
      }
    }
  
    console.log("Final Total Units After Submission:", totalUnits);
    console.log("---------------------------");
  
    setOrders(updatedOrders);
    setFormData({
      maker: "",
      width: "",
      aspectRatio: "",
      rimDiameter: "",
      loadIndex: "",
      speedRating: "",
      quantity: "",
      type: "",
    });
    setEditingOrder(null);
    setShowForm(false);
  };
  
  
  
  
  
  
  

  const [originalQuantity, setOriginalQuantity] = useState(null);

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
      type: orderToEdit.type,
    });
    setEditingOrder(index);
    setShowForm(true);
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
      width: "",
      aspectRatio: "",
      rimDiameter: "",
      loadIndex: "",
      speedRating: "",
      quantity: "",
      type: "",
    });
    setShowForm(true);
    setMessage("");
    setEditingOrder(null);
  };

  return (
    <div id="usedTiresForm" className="usedTiresForm-container">
      <div className="form-header">
        <h1>Wholesale Tires Order</h1>
      </div>

      <div className="container-inner">
        <div className="form-container">
          {/* Conditionally render order preview */}
          {formData.width && formData.aspectRatio && formData.rimDiameter &&  (
            <div className="order-preview" style={{ color: 'orange', padding: '10px', marginBottom: '20px' }}>
              <p>
                {formData.width} / {formData.aspectRatio} R {formData.rimDiameter}
              </p>
            </div>
          )}

          <form action="#" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Make:<span className="star">*</span>
                  <select name="maker" value={formData.maker} onChange={handleChange} required>
                    <option value="">Select Make</option>
                    <option value="Yokohama">Yokohama</option>
                    <option value="Bridgestone">Bridgestone</option>
                    <option value="Michelin">Michelin</option>
                    <option value="Continental">Continental</option>
                  </select>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Type:<span className="star">*</span>
                  <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="All-Season">All-Season</option>
                    <option value="Winter">Winter</option>
                    <option value="Summer">Summer</option>
                    <option value="Off-Road">Off-Road</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Width:<span className="star">*</span>
                  <input type="number" name="width" placeholder="width*" value={formData.width} onChange={handleChange} required />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Aspect Ratio:
                  <input type="number" name="aspectRatio" value={formData.aspectRatio} onChange={handleChange} placeholder="optional" />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Rim Diameter:<span className="star">*</span>
                  <input type="number" name="rimDiameter" placeholder="Rim Diameter*" value={formData.rimDiameter} onChange={handleChange} required />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Quantity:<span className="star">*</span>
                  <input type="number" name="quantity" placeholder="quantity*" value={formData.quantity} onChange={handleChange} required />
                </label>
              </div>
            </div>
            <div className="form-row half">
              <div className="form-group">
                <label>
                  Speed Rating:
                  <input type="text" name="speedRating" value={formData.speedRating} onChange={handleChange} placeholder="optional" />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Load Index:
                  <input type="number" name="loadIndex" value={formData.loadIndex} onChange={handleChange} placeholder="optional" />
                </label>
              </div>
            </div>
            <button type="submit">
              {editingOrder !== null ? "Update Order" : "Save Order"}
            </button>
            <p className="mandatory-note">the mark * is mandatory</p>
            {message && <p className="message">{message}</p>}
          </form>

          {/* Text Area for Message */}
          <div className="form-group textArea">
            <textarea
              name="customerMessage"
              placeholder="Your message"
              rows="4"
              value={formData.customerMessage || ''}
              onChange={handleChange}
            />
          </div>

          {/* Additional Message below the Text Area */}
          <p className="contact-message">
            If you need any further assistance with your order or the use of this form, just get in touch with us. We are here to help!
          </p>
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
    </div>
  );
};

export default OrderForm;
