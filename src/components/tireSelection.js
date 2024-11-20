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
}) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const groupsPerPage = 1;

  const [pagination, setPagination] = useState({
    currentGroupPage: 1,
  });

  const [selectedType, setSelectedType] = useState(""); // State to track selected type for filtering
  const [selectedMaker, setSelectedMaker] = useState("All Makes"); // Default to "All Makes"

  useEffect(() => {
    console.log("Updated orders:", orders);
  }, [orders]);

  const calculateTotalGroupPages = () => {
    return Math.max(1, Math.ceil(Object.keys(orders).length / groupsPerPage));
  };

  const handleGroupPageChange = (direction) => {
    setPagination((prevState) => {
      const newGroupPage = prevState.currentGroupPage + direction;
      return {
        ...prevState,
        currentGroupPage: Math.max(
          1,
          Math.min(calculateTotalGroupPages(), newGroupPage),
        ),
      };
    });
  };

  // Get orders for the selected maker or all makers
  const makerOrders = selectedMaker === "All Makes"
    ? Object.values(orders).flat() // Flatten all orders if "All Makes" is selected
    : orders[selectedMaker] || []; // Get orders for the selected maker

  // Filter orders based on selectedType
  const filteredOrders = makerOrders.filter((order) => {
    return selectedType ? order.type === selectedType : true;
  });

  const handleClearOrders = () => {
    setOrders({});
    setTotalUnits(0);
  };

  return (
    <div className="tire-selection-container">
      <h3>Your Order List:</h3>
      <div className="pagination-controls">
        {Object.keys(orders).length > 0 && (
          <>
            <label htmlFor="group-dropdown">Make:</label>
            <select
              onChange={(e) => {
                const selected = e.target.value;
                setSelectedMaker(selected);
                // Reset pagination when changing maker
                setPagination({ currentGroupPage: 1 });
              }}
              value={selectedMaker}
              className="group-dropdown"
            >
              <option value="All Makes">All Makes</option>
              {Object.keys(orders).map((maker, index) => (
                <option key={index} value={maker}>
                  {maker}
                </option>
              ))}
            </select>

            <label htmlFor="type-filter">Type:</label>
            <select
              id="type-filter"
              className="group-dropdown"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)} // Update selectedType
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

      <div className ="orders-wrapper">
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
                  <td>{order.maker}</td>
                  <td>{`${order.width}/${order.aspectRatio}R${order.rimDiameter}`}</td>
                  <td>{order.quantity}</td>
                  <td>{order.type}</td>
                  <td>
                    <div className="table-btns">
                      <button
                        onClick={() => handleEditOrder(selectedMaker, index)}
                        className="action-button edit-button"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteOrder(selectedMaker, index)
                        }
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
        <div className="table-btns">
          <button className="continue-selection-btn" onClick={handleClearOrders}>
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
            src={`${process.env.PUBLIC_URL}/images/container2.png`}
            alt="Container Image"
          />
          <div className="text">{percentageFill.toLocaleString()}</div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        orders={orders} // Pass all orders to the modal
      />
    </div>
  );
};

export default TireSelection;