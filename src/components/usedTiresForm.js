import React, { useState } from 'react';
import '../css/usedTiresForm.css';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        maker: 'Yokohama',
        width: '',
        aspectRatio: '',
        rimDiameter: '',
        loadRating: '',
        speedRating: '',
        quantity: ''
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // Function to open popup
    const openPopup = () => setIsPopupOpen(true);

    // Function to close popup
    const closePopup = () => setIsPopupOpen(false);

    const [orders, setOrders] = useState({});
    const [showForm, setShowForm] = useState(true);
    const [message, setMessage] = useState('');
    const [totalUnits, setTotalUnits] = useState(0);
    const [editingOrder, setEditingOrder] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newOrder = {
          width: formData.width,
          aspectRatio: formData.aspectRatio,
          rimDiameter: formData.rimDiameter,
          loadRating: formData.loadRating,
          speedRating: formData.speedRating,
          quantity: parseInt(formData.quantity, 10)
      };
  
      // Update orders
      if (editingOrder !== null) {
          // Edit existing order
          const maker = formData.maker;
          const updatedOrders = { ...orders };
          const previousQuantity = updatedOrders[maker][editingOrder].quantity; // Get previous quantity
          updatedOrders[maker][editingOrder] = newOrder; // Update the specific order
          setOrders(updatedOrders);
  
          // Update total units: subtract previous quantity and add new quantity
          setTotalUnits(prev => prev - previousQuantity + newOrder.quantity);
          setMessage(`Your order has been updated!`);
      } else {
          // Check for existing orders for the same maker and dimensions
          const maker = formData.maker;
          const updatedOrders = { ...orders };
  
          if (!updatedOrders[maker]) {
              updatedOrders[maker] = [];
          }
  
          // Check if the order already exists
          const existingOrderIndex = updatedOrders[maker].findIndex(order =>
              order.width === newOrder.width &&
              order.aspectRatio === newOrder.aspectRatio &&
              order.rimDiameter === newOrder.rimDiameter
          );
  
          if (existingOrderIndex !== -1) {
              // If the order already exists, update the quantity
              updatedOrders[maker][existingOrderIndex].quantity += newOrder.quantity;
              setOrders(updatedOrders);
              setTotalUnits(prev => prev + newOrder.quantity); // Update total units
              setMessage(`Your existing order has been updated with additional quantity!`);
          } else {
              // If it doesn't exist, add the new order
              updatedOrders[maker].push(newOrder);
              setOrders(updatedOrders);
              setTotalUnits(prev => prev + newOrder.quantity); // Update total units
              setMessage(`Great, your order has been saved!`);
          }
      }
  
      // Reset form data
      setFormData({
          maker: 'Yokohama',
          width: '',
          aspectRatio: '',
          rimDiameter: '',
          loadRating: '',
          speedRating: '',
          quantity: ''
      });
      setEditingOrder(null); // Reset editing state
      setShowForm(false);
  };
  

    const handleEditOrder = (maker, index) => {
        const orderToEdit = orders[maker][index];
        setFormData({
            maker: maker,
            width: orderToEdit.width,
            aspectRatio: orderToEdit.aspectRatio,
            rimDiameter: orderToEdit.rimDiameter,
            loadRating: orderToEdit.loadRating,
            speedRating: orderToEdit.speedRating,
            quantity: orderToEdit.quantity
        });
        setEditingOrder(index); // Set editing state
        setShowForm(true); // Show form for editing
    };

    const handleDeleteOrder = (maker, index) => {
      const updatedOrders = { ...orders };
      const quantityToRemove = updatedOrders[maker][index].quantity;
  
      // Remove order from the list
      updatedOrders[maker].splice(index, 1);
  
      // If the maker's orders array is empty, delete the maker from orders
      if (updatedOrders[maker].length === 0) {
          delete updatedOrders[maker];
      }
  
      setOrders(updatedOrders);
      setTotalUnits(totalUnits - quantityToRemove); // Update total units
      setMessage(`Order has been deleted.`);
  };
  
    const handleNewCategory = () => {
        // Reset the form data for a new category
        setFormData({
            maker: 'Yokohama',
            width: '',
            aspectRatio: '',
            rimDiameter: '',
            loadRating: '',
            speedRating: '',
            quantity: ''
        });
        setShowForm(true);
        setMessage('');
        setEditingOrder(null);
    };

    return (
        <div className="order-form-container">


    {/* Form and Real-Time Preview */}
    <div className="order-form">
        <h2>Wholesale Tires Order</h2>

        
        <button className='popup-btn' onClick={openPopup}>Check the tire size</button>

        {/* Conditional rendering for the popup */}
        {isPopupOpen && (
            <div className="popup" onClick={closePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <span className="close" onClick={closePopup}>&times;</span>
                    <img src={`${process.env.PUBLIC_URL}/images/tire-size-ilustratuion.jpg`} alt="Tire" className="popup-image" />
                </div>
            </div>
        )}

        {showForm ? (
            <>
                <form className="order-form" onSubmit={handleSubmit}>
                    <label>
                        Maker:
                        <select name="maker" value={formData.maker} onChange={handleChange}>
                            <option value="Yokohama">Yokohama</option>
                            <option value="Bridgestone">Bridgestone</option>
                            <option value="Michelin">Michelin</option>
                            <option value="Continental">Continental</option>
                        </select>
                    </label>
                    <label>
                        Width:
                        <input type="number" name="width" value={formData.width} onChange={handleChange} required />
                    </label>
                    <label>
                        Aspect Ratio:
                        <input type="number" name="aspectRatio" value={formData.aspectRatio} onChange={handleChange} required />
                    </label>
                    <label>
                        Rim Diameter:
                        <input type="number" name="rimDiameter" value={formData.rimDiameter} onChange={handleChange} required />
                    </label>
                    <label>
                        Load Rating:
                        <input type="number" name="loadRating" value={formData.loadRating} onChange={handleChange} required />
                    </label>
                    <label>
                        Speed Rating:
                        <input type="text" name="speedRating" value={formData.speedRating} onChange={handleChange} required />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                    </label>
                    <button type="submit">{editingOrder !== null ? 'Update Order' : 'Save Order'}</button>
                </form>

                {/* Real-Time Preview */}
                <div className="output">
                    <h3>Real-Time Preview:</h3>
                    <p>
                        {`${formData.maker}: size ${formData.width} / ${formData.aspectRatio} R ${formData.rimDiameter} - ${formData.loadRating} ${formData.speedRating} - ${formData.quantity} units`}
                    </p>
                </div>
            </>
        ) : (
            <div className="tire-selection-container">
                <h3>Your Tire Selection:</h3>
                {Object.keys(orders).map((maker) => (
                    <div key={maker}>
                        <h4>{maker}:</h4>
                        {orders[maker].map((order, index) => (
                            <div key={index} className="order-item">
                                <p>
                                    Size {order.width} / {order.aspectRatio} R {order.rimDiameter} - {order.quantity} units
                                </p>
                                <div className="button-container">
                                    <button onClick={() => handleEditOrder(maker, index)} className="small-button">Edit</button>
                                    <button onClick={() => handleDeleteOrder(maker, index)} className="small-button">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <p><strong>Total Order:</strong> {totalUnits} units</p>
                <p>{message}</p>
                <button onClick={handleNewCategory}>Continue to a New Selection</button>
            </div>
        )}
    </div>
</div>

    );
};

export default OrderForm;
