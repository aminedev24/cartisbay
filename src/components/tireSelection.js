import React, { useState, useEffect } from "react";
import "../css/tireSelection.css";
import Modal from "./ordersModal"; // Import the Modal component

const TireSelection = ({
  orders,
  setOrders,
  percentageFill,
  totalUnits,
  setTotalUnits,
  message,
  handleEditOrder,
  handleDeleteOrder,
  handleNewCategory,
  handleClearOrders
}) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const [selectedType, setSelectedType] = useState(""); // State to track selected type for filtering
  const [selectedMaker, setSelectedMaker] = useState("All Makes"); // Default to "All Makes"

  
  useEffect(() => {
    console.log("Updated orders:", orders);
  }, [orders]);

  const uniqueMakes = Array.isArray(orders) ? Array.from(new Set(orders.map((order) => order.make))) : [];

  // Get orders for the selected maker or all makers
  const filteredOrders = Array.isArray(orders) ? orders.filter((order) => {
    const matchesMaker =
      selectedMaker === "All Makes" || order.make === selectedMaker;
    const matchesType = selectedType ? order.type === selectedType : true;
    return matchesMaker && matchesType;
  }) : [];


  const handleEditOrderClick = (order) => {
    handleEditOrder(order);
};


  return (
    <div className="tire-selection-container">
      <h3>Your Order List:</h3>
      <div className="pagination-controls">
        {orders.length > 0 && (
          <>
            <label htmlFor="group-dropdown">Make:</label>
            <select
              onChange={(e) => {
                const selected = e.target.value;
                setSelectedMaker(selected);
              }}
              value={selectedMaker}
              className="group-dropdown"
            >
              <option value="All Makes">All Makes</option>
              {uniqueMakes.map((make, index) => (
                <option key={index} value={make}>
                  {make} {/* Display the make name */}
                </option>
              ))}
            </select>

            <label htmlFor="type-filter">Type:</label>
            <select
              id="type-filter"
              className="group-dropdown"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
              }} // Update selectedType
            >
              <option value="">All</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="All-Season">All-Season</option>
              {/* Add more types as needed */}
            </select>
          </>
        )}
      </div>

      <div className="orders-wrapper">
        <div className="maker-section">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Make</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.make}</td>
                  <td>{`${order.width}/${order.aspect_ratio}R${order.rim_diameter}`}</td>
                  <td>{order.quantity}</td>
                  <td>{order.type}</td>
                  <td>
                    <div className="table-btns">
                    <button
                        onClick={() => handleEditOrderClick(order)}
                        className="action-button edit-button"
                      >
                        <i className="fas fa-edit"></i>
                      </button>

                      <button
                        onClick={() => handleDeleteOrder(index)}
                        className="action-button delete-button"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="total-order">
          <p>
            <strong>Total Order:</strong> {totalUnits} units
          </p>
          <p>{message}</p>
        </div>
      </div>

      <div className="table-btns">
        <button 
          className="continue-selection-btn" onClick={handleClearOrders} 
          disabled={Object.keys(orders).length === 0}>
          Clear Orders
        </button>

        <button
          className="continue-selection-btn"
          disabled={Object.keys(orders).length === 0}
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          Show All Orders
        </button>
      </div>

      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/containericonnew.png`}
          alt="Container Image"
        />
        <div className="text">{percentageFill.toLocaleString()}</div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        orders={orders} // Pass all orders to the modal
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TireSelection;
