import React, { useState, useEffect } from 'react';
import '../css/tireSelection.css';
import Modal from './ordersModal'; // Import the Modal component

const TireSelection = ({ orders, totalUnits, message, handleEditOrder, handleDeleteOrder, handleNewCategory }) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    console.log("Updated orders:", orders);
  }, [orders]);

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  const getCurrentGroupMakers = () => {
    const makers = Object.keys(orders);
    return makers[selectedGroup - 1];
  };

  const selectedMaker = getCurrentGroupMakers();
  const makerOrders = selectedMaker ? orders[selectedMaker] : [];

  return (
    <div className="tire-selection-container">
      <h3>Your Tire Selection:</h3>

      <div className="pagination-controls">
        {Object.keys(orders).length > 0 && (
          <select
            onChange={(e) => handleGroupSelection(Number(e.target.value))}
            value={selectedGroup}
            className="group-dropdown"
          >
            {Object.keys(orders).map((maker, index) => (
              <option key={index} value={index + 1}>
                {maker}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="maker-section">
        {makerOrders.length > 0 ? (
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
              {makerOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.maker}</td>
                  <td>{`${order.width}/${order.aspectRatio}R${order.rimDiameter}`}</td>
                  <td>{order.quantity}</td>
                  <td>{order.type}</td>
                  <td>
                    <div className='table-btns'>
                      <button
                        onClick={() => handleEditOrder(selectedMaker, index)}
                        className="action-button edit-button"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(selectedMaker, index)}
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
        ) : (
          <p>No orders available.</p>
        )}
      </div>

      <div className="confirmation-message">{confirmationMessage}</div>

      <div className="total-order">
        <p>
          <strong>Total Order:</strong> {totalUnits} units
        </p>
        <p>{message}</p>
      </div>
      <div className='table-btns'>
        <button
          className="continue-selection-btn"
          onClick={() => {
            handleNewCategory();
          }}
        >
          Continue to a New Selection
        </button>

        <button
          className="show-orders-btn"
          disabled= {Object.keys(orders).length === 0}
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          Show All Orders
        </button>
      </div>  
 

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        orders={makerOrders} // Pass the orders to the modal
      />
    </div>
  );
};

export default TireSelection;