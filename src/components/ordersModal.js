import React from 'react';
//import './Modal.css'; // Create a CSS file for modal styles

const Modal = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-content');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Orders</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td {text-align:center; border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Your Orders</h2>
          <div>${printContent.innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content orders">
        <button className="close-btn" onClick={onClose}>&minus;</button>
        <div id="printable-content">
          <table className='orders-table'>
            <thead>
              <tr>
                <th>Make</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.maker}</td>
                  <td>{`${order.width}/${order.aspectRatio}R${order.rimDiameter}`}</td>
                  <td>{order.quantity}</td>
                  <td>{order.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handlePrint}>Print Orders</button>
      </div>
    </div>
  );
};

export default Modal;