<div class="container">
  <div class="header">
    <h2>Request A Quote</h2>
  </div>
  <div class="container-inner">
    <div class="form-container">
      <form action="#" onSubmit={handleSubmit}>
        <div class="form-row">
          <div class="form-group">
            <label>
              Maker:<span class="star">*</span>
              <select name="maker" value={formData.maker} onChange={handleChange}>
                <option value="Make">Make</option>
                <option value="Yokohama">Yokohama</option>
                <option value="Bridgestone">Bridgestone</option>
                <option value="Michelin">Michelin</option>
                <option value="Continental">Continental</option>
              </select>
            </label>
          </div>
          <div class="form-group">
            <label>
              Type:<span class="star">*</span>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="type">type</option>
                <option value="All-Season">All-Season</option>
                <option value="Winter">Winter</option>
                <option value="Summer">Summer</option>
                <option value="Off-Road">Off-Road</option>
              </select>
            </label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>
              Width:<span class="star">*</span>
              <input type="number" name="width" value={formData.width} onChange={handleChange} required />
            </label>
          </div>
          <div class="form-group">
            <label>
              Aspect Ratio:
              <input type="number" name="aspectRatio" value={formData.aspectRatio} onChange={handleChange} placeholder="optional" />
            </label>
          </div>
          <div class="form-group">
            <label>
              Rim Diameter:<span class="star">*</span>
              <input type="number" name="rimDiameter" value={formData.rimDiameter} onChange={handleChange} required />
            </label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>
              Load index:
              <input type="number" name="loadIndex" value={formData.loadIndex} onChange={handleChange} placeholder="optional" />
            </label>
          </div>
          <div class="form-group">
            <label>
              Speed Rating:
              <input type="text" name="speedRating" value={formData.speedRating} onChange={handleChange} placeholder="optional" />
            </label>
          </div>
          <div class="form-group">
            <label>
              Quantity:<span class="star">*</span>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </label>
          </div>
        </div>
        <button type="submit">
          {editingOrder !== null ? "Update Order" : "Save Order"}
        </button>
      </form>
    </div>
    <div class="promo">
        <h2>Take your career to the next level</h2>
        <button>Apply Now</button>
      </div>
  </div>
</div>


   {/* Show order details if there are saved orders */}
   {Object.keys(orders).length > 0 && (
      
    <div className="tire-selection-container">
      <h3>Your Tire Selection:</h3>
      {Object.keys(orders).map((maker) => (
        <div key={maker}>
          <h4>{maker}:</h4>
          {orders[maker].map((order, index) => (
            <div key={index} className="order-item">
              <p>
                <strong>Size: </strong>{order.width} / {order.aspectRatio} R{" "}
                {order.rimDiameter}
              </p>
              <p>
                <strong>Quantity: </strong>{order.quantity}
              </p>
              <p>
                <strong>Type: </strong> {order.type}
              </p>
              <div className="button-container">
                <button
                  onClick={() => handleEditOrder(maker, index)}
                  className="small-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOrder(maker, index)}
                  className="small-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <p>
        <strong>Total Order:</strong> {totalUnits} units
      </p>

      <p>{message}</p>
      <button onClick={handleNewCategory}>
        Continue to a New Selection
      </button>
    </div>
  )}

    {/* Popup with slide-up effect */}
    {showForm &&
        <div
        className={`popup ${Object.keys(orders).length > 1 ?'visible' : 'hidden'}`}
        onClick={closePopup}
      >
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <img
            src={`${process.env.PUBLIC_URL}/images/tire-size-ilustration2.png`}
            alt="Tire"
            className="popup-image"
          />
        </div>
      </div>
    }


         {/* Real-Time Preview */}
           
         <div className="output">
         <h3>Order Preview:</h3>
         <p>
           {`${formData.maker ? formData.maker : ''}: size ${formData.width}${formData.aspectRatio ? ` / ${formData.aspectRatio}` : ''} R ${formData.rimDiameter}${formData.loadIndex ? ` - ${formData.loadIndex}` : ''}${formData.speedRating ? ` ${formData.speedRating}` : ''}${formData.type ? ` - ${formData.type}` : ''}${formData.quantity ? ` - quantity: ${formData.quantity} units` : ''}`}
         </p>

         
       
       </div>