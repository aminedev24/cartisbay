import React, { useState } from 'react';

const TireSelection = ({ orders, totalUnits, message, handleEditOrder, handleDeleteOrder, handleNewCategory }) => {
  // Number of orders to show per page
  const ordersPerPage = 3; 
  const groupsPerPage = 1; // Show 1 group (maker) per page

  // Initialize state for pagination
  const [pagination, setPagination] = useState({
    // Set initial page for orders and groups
    currentOrderPage: Object.keys(orders).reduce((acc, maker) => {
      acc[maker] = 1;  // Default to page 1 for each maker
      return acc;
    }, {}),
    currentGroupPage: 1,
  });

  // Calculate the total number of pages for orders for each maker
  const calculateTotalPages = (makerOrders) => {
    return Math.ceil(makerOrders.length / ordersPerPage);
  };

  // Calculate total number of pages for groups (makers)
  const calculateTotalGroupPages = () => {
    return Math.ceil(Object.keys(orders).length / groupsPerPage);
  };

  // Handle page change for orders (each maker's orders)
  const handleOrderPageChange = (maker, direction) => {
    setPagination((prevState) => {
      const newOrderPage = prevState.currentOrderPage[maker] + direction;
      const totalPages = calculateTotalPages(orders[maker]);
      return {
        ...prevState,
        currentOrderPage: {
          ...prevState.currentOrderPage,
          [maker]: Math.max(1, Math.min(totalPages, newOrderPage)),
        },
      };
    });
  };

  // Handle page change for groups (makers)
  const handleGroupPageChange = (direction) => {
    setPagination((prevState) => {
      const newGroupPage = prevState.currentGroupPage + direction;
      return {
        ...prevState,
        currentGroupPage: Math.max(1, Math.min(calculateTotalGroupPages(), newGroupPage)),
      };
    });
  };

  // Get the makers for the current group page
  const getCurrentGroupMakers = () => {
    const makers = Object.keys(orders);
    const startIndex = (pagination.currentGroupPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;
    return makers.slice(startIndex, endIndex);
  };

  return (
    <div  className="tire-selection-container">
      <h3>Your Tire Selection:</h3>

      {/* Pagination for groups */}
      <div className="pagination-controls">
        <button 
          onClick={() => handleGroupPageChange(-1)} 
          disabled={pagination.currentGroupPage === 1}
        >
          Prev Group
        </button>
        <span>
          Group Page {pagination.currentGroupPage} of {calculateTotalGroupPages()}
        </span>
        <button 
          onClick={() => handleGroupPageChange(1)} 
          disabled={pagination.currentGroupPage === calculateTotalGroupPages()}
        >
          Next Group
        </button>
      </div>

      {/* Render the orders for the makers on the current group page */}
      {getCurrentGroupMakers().map((maker) => {
        const makerOrders = orders[maker];
        const totalPages = calculateTotalPages(makerOrders);
        const currentPageOrders = makerOrders.slice((pagination.currentOrderPage[maker] - 1) * ordersPerPage, pagination.currentOrderPage[maker] * ordersPerPage);

        return (
          <div key={maker}>
            <h4>{maker}:</h4>
            {currentPageOrders.map((order, index) => (
              <div key={index} className="order-item">
                <p>
                  <strong>Size: </strong>
                  {order.width} / {order.aspectRatio} R {order.rimDiameter}
                </p>
                <p>
                  <strong>Quantity: </strong>
                  {order.quantity}
                </p>
                <p>
                  <strong>Type: </strong> {order.type}
                </p>
                <div className="button-container">
                  <button onClick={() => handleEditOrder(maker, index)} className="small-button">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteOrder(maker, index)} className="small-button">
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination Controls for orders within this maker */}
            <div className="pagination-controls">
              <button 
                onClick={() => handleOrderPageChange(maker, -1)} 
                disabled={pagination.currentOrderPage[maker] === 1}
              >
                Prev
              </button>
              <span>
                Page {pagination.currentOrderPage[maker]} of {totalPages}
              </span>
              <button 
                onClick={() => handleOrderPageChange(maker, 1)} 
                disabled={pagination.currentOrderPage[maker] === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        );
      })}

      <p>
        <strong>Total Order:</strong> {totalUnits} units
      </p>

      <p>{message}</p>
      <button className="continue-selection-btn" onClick={handleNewCategory}>
        Continue to a New Selection
      </button>
    </div>
  );
};

export default TireSelection;
