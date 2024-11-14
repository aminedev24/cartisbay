import React, { useState, useEffect } from "react";
import "../css/usedTiresForm.css";
import TireSelection from "./tireSelection";

const OrderForm = ({ formData, setFormData, orders, setOrders, setTotalUnits, totalUnits }) => {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [percentageFill, setPercentageFill] = useState(0);
  const [doubleLoading, setDoubleLoading] = useState(false);
  const [selectedDiameter, setSelectedDiameter] = useState(""); // State for selected diameter
  const [availableSizes, setAvailableSizes] = useState([]); // State for available sizes

  const tireSizes = [
    { diameter: 13, sizes: ["155/80R13", "165/80R13", "175/70R13", "185/70R13", "185/65R13", "195/65R13", "175/65R13", "155/70R13", "145/80R13", "165/70R13"] },
    { diameter: 14, sizes: ["165/70R14", "175/70R14", "185/70R14", "185/65R14", "195/65R14", "195/70R14", "205/65R14", "205/60R14", "215/60R14", "225/60R14", "185/60R14", "195/60R14"] },
    { diameter: 15, sizes: ["185/65R15", "195/65R15", "205/65R15", "205/60R15", "215/65R15", "225/65R15", "195/60R15", "205/55R15", "215/60R15", "225/60R15", "235/60R15", "245/60R15"] },
    { diameter: 16, sizes: ["205/55R16", "215/55R16", "225/55R16", "205/60R16", "215/60R16", "225/60R16", "235/60R16", "245/60R16", "215/65R16", "225/65R16", "235/65R16"] },
    { diameter: 17, sizes: ["215/45R17", "225/45R17", "235/45R17", "245/45R17", "255/45R17", "215/50R17", "225/50R17", "235/50R17", "215/55R17", "225/55R17", "235/55R17", "225/60R17"] },
    { diameter: 18, sizes: ["225/40R18", "235/40R18", "245/40R18", "255/40R18", "265/40R18", "225/45R18", "235/45R18", "245/45R18", "255/45R18", "275/40R18", "285/40R18", "245/50R18"] },
    { diameter: 19, sizes: ["225/35R19", "235/35R19", "245/35R19", "255/35R19", "265/35R19", "275/35R19", "285/35R19", "225/40R19", "235/40R19", "245/40R19", "255/40R19", "275/40R19"] },
    { diameter: 20, sizes: ["245/35R20", "255/35R20", "265/35R20", "275/35R20", "285/35R20", "295/35R20", "305/35R20", "245/40R20", "255/40R20", "265/40R20", "275/40R20", "285/40R20"] },
    { diameter: 21, sizes: ["255/30R21", "265/30R21", "275/30R21", "285/30R21", "295/30R21", "305/30R21", "255/35R21", "265/35R21", "275/35R21", "285/35R21", "295/35R21", "315/30R21"] },
    { diameter: 22, sizes: ["265/30R22", "275/30R22", "285/30R22", "295/30R22", "305/30R22", "315/30R22", "325/30R22", "335/30R22", "295/35R22", "305/35R22"] },
    { diameter: 23, sizes: ["285/35R23", "305/30R23", "325/30R23"] },
    { diameter: 24, sizes: ["295/30R24", "305/30R24", "325/30R24", "335/30R24"] },
    { diameter: 26, sizes: ["295/30R26", "305/30R26", "315/30R26", "325/30R26"] },
    { diameter: 28, sizes: ["295/25R28", "315/30R28", "325/35R28"] },
    { diameter: 30, sizes: ["315/30R30", "325/30R30", "335/30R30"] }
  ];

  const handleDiameterChange = (e) => {
    const diameter = parseInt(e.target.value);
    setSelectedDiameter(diameter);
    const sizes = tireSizes.find(tire => tire.diameter === diameter)?.sizes || [];
    setAvailableSizes(sizes);
    setFormData(prevData => ({
      ...prevData,
      tireSize: "", // Reset tire size when diameter changes
    }));
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      tireSize: size,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Calculate percentage fill when quantity changes
    if (name === 'quantity') {
      const quantity = parseInt(value) || 0;
      const totalCapacity = doubleLoading ? 3000 : 2000;
      const newTotalUnits = totalUnits + quantity;
      const fill = (newTotalUnits / totalCapacity) * 100;

      if (fill > 100) {
        setMessage("The container is full. Consider using double loading to add up to 3000 units");
        setPercentageFill(100);
      } else {
        setPercentageFill(fill);
        setMessage("");
      }
    }
  };

  const handleEditOrder = (maker, index) => {
    const orderToEdit = orders[maker][index];
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

    // Calculate initial percentage fill based on the current total units
    const totalCapacity = doubleLoading ? 3000 : 2000;
    const newTotalUnits = totalUnits - orderToEdit.quantity; // Remove the quantity of the order being edited
    const fill = (newTotalUnits / totalCapacity) * 100;
    setPercentageFill(fill);
};

  useEffect(() => {
    const requiredFieldsFilled =
      formData.maker && formData.type && formData.quantity && formData.tireSize;
    setIsFormValid(requiredFieldsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.maker || !formData.type || !formData.tireSize || !formData.quantity) {
        setMessage("Please fill in all required fields.");
        return;
    }

    const [width, aspectRatio, rimDiameter] = formData.tireSize.split(/\/|R/);

    const newOrder = {
        maker: formData.maker,
        width,
        aspectRatio,
        rimDiameter,
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

    let newTotalUnits = totalUnits;

    if (editingOrder !== null) {
        const previousOrder = orders[maker][editingOrder];
        newTotalUnits -= previousOrder.quantity; // Subtract the quantity of the order being edited

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

    setTotalUnits(newTotalUnits);
    const totalCapacity = doubleLoading ? 3000 : 2000;
    const newPercentageFill = (newTotalUnits / totalCapacity) * 100;
    setPercentageFill(newPercentageFill);

    setOrders(updatedOrders);
    setFormData({
        maker: "",
        quantity: "",
        loadIndex: "",
        speedRating: "",
        type: "",
        tireSize: "",
        rimDiameter: "",
    });
    setEditingOrder(null);
    setShowForm(false);
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
      tireSize: "", // Reset tire size
      rimDiameter: "",
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
          {formData.tireSize && (
            <div className="order-preview" style={{ color: 'orange', padding: '10px', marginBottom: '20px' }}>
              <p>{formData.tireSize}</p>
            </div>
          )}

          <form action="#" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Make:<span className="star">*</span>
                  <select name="maker" value={formData.maker} onChange={handleChange} required>
                    <option value="">Select Make</option>
                    <option value="Any">Any</option>
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
                  Diameter:<span className="star">*</span>
                  <select name="diameter" value={selectedDiameter} onChange={handleDiameterChange} required>
                    <option value="">Select Diameter</option>
                    {tireSizes.map(tire => (
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
                  <select name="tireSize" value={formData.tireSize} onChange={handleSizeChange} required disabled={!selectedDiameter}>
                    <option value="">Select Tire Size</option>
                    {availableSizes.map(size => (
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
                  <input type="number" name="quantity" placeholder="quantity*" value={formData.quantity} onChange={handleChange} required />
                </label>
              </div>

              <div className="form-group">
                <label>
                  Speed Rating:
                  <input type="text" name="speedRating" value={formData.speedRating} onChange={handleChange} placeholder="optional" />
                </label>
              </div>
            </div>
            <div className="form-row half">
              
              <div className="form-group">
                <label>
                  Load Index:
                  <input type="number" name="loadIndex" value={formData.loadIndex} onChange={handleChange} placeholder="optional" />
                </label>
              </div>

              <div className="form-group">
              <div className="checkbox-wrapper-21">
                <label className="control control--checkbox">
                  <span className="label-text">Double Loading:</span>
                  <input 
                    type="checkbox"
                    checked={doubleLoading} 
                    onChange={() => {
                      setDoubleLoading(!doubleLoading);
                      const quantity = parseInt(formData.quantity) || 0;
                      const totalCapacity = !doubleLoading ? 3000 : 2000;
                      const fill = (quantity / totalCapacity) * 100;
                      setPercentageFill(fill);
                    }} 
                  />
                  <div className="control__indicator"></div>
                </label>
              </div>
            </div>

            </div>
          
            <button disabled={percentageFill >= 100} type="submit">
              {editingOrder !== null ? "Update Order" : "Save Order"}
            </button>
            <p className="mandatory-note">the mark * is mandatory</p>
            {message && <p className="message">{message}</p>}
          </form>

          <div className="percentage-fill" style={{ marginTop: '20px', fontWeight: 'bold' }}>
            Container Percentage Fill: {percentageFill.toFixed(2)}%
          </div>

          <div className="form-group textArea">
            <textarea
              name="customerMessage"
              placeholder="Your message"
              rows="4"
              value={formData.customerMessage || ''}
              onChange={handleChange}
            />
          </div>

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