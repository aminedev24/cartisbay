import React, { useState, useEffect } from 'react';
import '../css/tireSelection.css';

const TireSelection = ({ orders, totalUnits, message, handleEditOrder, handleDeleteOrder, handleNewCategory }) => {
  const ordersPerPage = 3;
  const groupsPerPage = 1;

  const [pagination, setPagination] = useState({
    currentOrderPage: Object.keys(orders).reduce((acc, maker) => {
      acc[maker] = 1;
      return acc;
    }, {}),
    currentGroupPage: 1,
  });

  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    console.log("Updated orders:", orders); // Debugging line to check orders
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentOrderPage: Object.keys(orders).reduce((acc, maker) => {
        acc[maker] = 1;
        return acc;
      }, {}),
    }));
  }, [orders]);

  const calculateTotalPages = (makerOrders) => {
    return makerOrders && makerOrders.length > 0
      ? Math.ceil(makerOrders.length / ordersPerPage)
      : 1;
  };

  const calculateTotalGroupPages = () => {
    return Math.max(1, Math.ceil(Object.keys(orders).length / groupsPerPage));
  };

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

  const handleGroupPageChange = (direction) => {
    setPagination((prevState) => {
      const newGroupPage = prevState.currentGroupPage + direction;
      return {
        ...prevState,
        currentGroupPage: Math.max(1, Math.min(calculateTotalGroupPages(), newGroupPage)),
      };
    });
  };

  const getCurrentGroupMakers = () => {
    const makers = Object.keys(orders);
    const startIndex = (pagination.currentGroupPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;
    return makers.slice(startIndex, endIndex);
  };

  const handleGroupSelection = (group) => {
    setPagination((prevState) => ({
      ...prevState,
      currentGroupPage: group,
    }));
  };

  return (
    <div className="tire-selection-container">
      <h3>Your Tire Selection:</h3>

      <div className="pagination-controls">
      

        <button
          onClick={() => handleGroupPageChange(-1)}
          disabled={pagination.currentGroupPage === 1}
          className="prev-next-button"
        >
          &larr;
        </button>

        {Object.keys(orders).length > 0 && (
          <select
            onChange={(e) => handleGroupSelection(Number(e.target.value))}
            value={pagination.currentGroupPage}
            className="group-dropdown"
          >
            {Object.keys(orders).map((maker, index) => (
              <option key={index} value={index + 1}>
                {maker}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => handleGroupPageChange(1)}
          disabled={pagination.currentGroupPage === calculateTotalGroupPages()}
          className="prev-next-button"
        >
           &rarr;
        </button>
      </div>

      {getCurrentGroupMakers().map((maker) => {
        const makerOrders = orders[maker];
        const totalPages = calculateTotalPages(makerOrders);
        const currentPageOrders = makerOrders
          ? makerOrders.slice(
              (pagination.currentOrderPage[maker] - 1) * ordersPerPage,
              pagination.currentOrderPage[maker] * ordersPerPage
            )
          : [];

        return (
          <div key={maker} className="maker-section">
            {currentPageOrders.length > 0 ? (
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
                  {currentPageOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.maker}</td>
                      <td>{`${order.width}/${order.aspectRatio}R${order.rimDiameter}`}</td>                      
                      <td>{order.quantity}</td>
                      <td>{order.type}</td>
                      <td>
                        <div className='table-btns'>
                        <button
                          onClick={() => handleEditOrder(maker, index)}
                          className="action-button edit-button"
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(maker, index)}
                          className="action-button delete-button"
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders available for {maker}.</p>
            )}

            <div className="pagination-controls">
              <button
                onClick={() => handleOrderPageChange(maker, -1)}
                disabled={pagination.currentOrderPage[maker] === 1}
                className="prev-next-button"
              >
                Prev
              </button>
              <span>
                Page {pagination.currentOrderPage[maker]} of {totalPages}
              </span>
              <button
                onClick={() => handleOrderPageChange(maker, 1)}
                disabled={pagination.currentOrderPage[maker] === totalPages}
                className="prev-next-button"
              >
                Next
              </button>
            </div>
          </div>
        );
      })}

      <div className="confirmation-message">{confirmationMessage}</div>

      <div className="total-order">
        <p>
          <strong>Total Order:</strong> {totalUnits} units
        </p>
        <p>{message}</p>
      </div>

      <button
        className="continue-selection-btn"
        onClick={() => {
          setConfirmationMessage("Order saved successfully.");
          handleNewCategory();
        }}
      >
        Continue to a New Selection
      </button>
    </div>
  );
};

export default TireSelection;