import React from 'react';
// import './Modal.css'; // Create a CSS file for modal styles

const Modal = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-content');
    const logoSrc = `${process.env.PUBLIC_URL}/images/logo.png`;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Orders</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              background-image: url('${logoSrc}');
              background-size: 8%; /* Adjust size for watermark effect */
              background-repeat: repeat;
              background-position: center; /* Center the logo */
            }
            th, td {
              text-align: center; 
              border: 1px solid #ddd; 
              padding: 8px; 
              position: relative; /* Position relative for z-index */
              z-index: 1; /* Ensure text is above background */
              color: #fff; /* Light text color for contrast */
              font-weight: bold; /* Make text bold */
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Add a text shadow for better readability */
            }
            th {
              background-color: rgba(242, 242, 242, 0.9); /* Slightly transparent background for headers */
            }
            .header { 
              text-align: center; 
              margin-bottom: 20px; 
            }
            .header img { 
              width: 100px; 
              height: auto; 
            } /* Adjust logo size */
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logoSrc}" alt="Company Logo" />
            <h1>Artisbay</h1>
          </div>
          <h2>Your Orders</h2>
          <div>${printContent.innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Flatten the orders object into an array
  const allOrders = Object.values(orders).flat();

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
              {allOrders.map((order, index) => (
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