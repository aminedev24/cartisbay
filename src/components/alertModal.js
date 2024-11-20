// Modal.js
import React from 'react';
//import './Modal.css'; // You can style your modal here

const Modal = ({ message, onClose }) => {
  return (
    <div className="alert-modal-overlay">
      <div className="alert-modal-content">
        <h2>Alert</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;