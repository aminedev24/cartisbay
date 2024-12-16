import React from 'react';

const Modal = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-content');
    const logoSrc = `${process.env.PUBLIC_URL}/images/logo.png`;
    const bgImage = `${process.env.PUBLIC_URL}/images/orderlistprintbackground.jpeg`;
    const printWindow = window.open('', '_blank');
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Orders</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header img {
              width: 100px;
              height: auto;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              background-image: url('${bgImage}');
            
            }
              @media print {
              table {
              
                background-image: url('${bgImage}');
                -webkit-print-color-adjust: exact !important;                 
                color-adjust: exact !important;   
                print-color-adjust: exact !important;
                background-repeat: no-repeat;
                background-position: center;
                }
              }
            th, td {
              text-align: center;
              border: 1px solid #ddd;
              padding: 8px;
              font-weight: bold;
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
              position: relative;
              color: #333;
              z-index: 1;
            }
            th {
              background-color: rgba(29, 161, 242, 0.7);
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logoSrc}" alt="Company Logo" />
          </div>
          <h2>Your Orders</h2>
          <div>${printContent.innerHTML}</div>
        
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.focus(); // Focus on the new window
    printWindow.print();
    printWindow.close(); // Close the window after printing
  };
  
  // Flatten the orders object into an array
  const allOrders = Object.values(orders).flat();
  const totalQuantity = allOrders.reduce((total, order) => total + order.quantity, 0);


  return (
    <div className="modal-overlay">
      <div className="modal-content orders">
        <button className="close-btn" onClick={onClose}>&minus;</button>
        <div id="printable-content">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Make</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.make}</td>
                  <td>{`${order.width}/${order.aspect_ratio}R${order.rim_diameter}`}</td>
                  <td>{order.quantity}</td>
                  <td>{order.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">Total Quantity: {totalQuantity}</div>

        </div>
        <button className='print-button' onClick={handlePrint}>Print Orders</button>
      </div>
    </div>
  );
};

export default Modal;
