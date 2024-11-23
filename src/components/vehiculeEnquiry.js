import React from "react";
import "../css/vehiculeEquiry.css";

const InquiryForm = () => {
  return (
    <div className="enquiryContainer">
      <div className="form-section">
        <h2>Your Information</h2>
        <div className="form-group">
          <div className="half-width">
            <label htmlFor="name">
              Your Name<span className="required-star">*</span>
            </label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="half-width">
            <label htmlFor="address">
              Your Address<span className="required-star">*</span>
            </label>
            <input type="text" id="address" name="address" />
          </div>
        </div>
        <div className="form-group">
          <div className="half-width">
            <label htmlFor="email">
              Email<span className="required-star">*</span>
            </label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="half-width">
            <label htmlFor="country">
              Destination Country<span className="required-star">*</span>
            </label>
            <select id="country" name="country">
              <option>Select</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="half-width">
            <label htmlFor="tel">
              Tel<span className="required-star">*</span>
            </label>
            <input type="tel" id="tel" name="tel" />
          </div>
          <div className="half-width">
            <label htmlFor="port">Destination Port</label>
            <select id="port" name="port">
              <option>Select</option>
            </select>
          </div>
        </div>
        <div className="form-group" style={{ flexDirection: "column" }}>
          <label htmlFor="message">
            Message<span className="required-star">*</span>
          </label>
          <textarea id="message" name="message"></textarea>
        </div>
      </div>
      <div className="form-section">
        <h2>Vehicle Information</h2>
        <div className="form-group">
          <div className="quarter-width">
            <label htmlFor="make">Make</label>
            <select id="make" name="make">
              <option>Make (all)</option>
            </select>
            <i className="fas fa-info-circle info-icon"></i>
          </div>
          <div className="quarter-width">
            <label htmlFor="year-from">Registration Year</label>
            <div className="form-group" style={{ flexDirection: "row" }}>
              <input
                type="text"
                id="year-from"
                name="year-from"
                placeholder="From"
                className="small-width"
              />
              <input
                type="text"
                id="year-to"
                name="year-to"
                placeholder="To"
                className="small-width"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="quarter-width">
            <label htmlFor="model">Model</label>
            <select id="model" name="model">
              <option>Model (all)</option>
            </select>
            <i className="fas fa-info-circle info-icon"></i>
          </div>
          <div className="quarter-width">
            <label htmlFor="price-from">Price (FOB)</label>
            <div className="form-group" style={{ flexDirection: "row" }}>
              <input
                type="text"
                id="price-from"
                name="price-from"
                placeholder="From"
                className="small-width"
              />
              <input
                type="text"
                id="price-to"
                name="price-to"
                placeholder="To"
                className="small-width"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="quarter-width">
            <label htmlFor="body-type">Body type</label>
            <select id="body-type" name="body-type">
              <option>Body type (all)</option>
            </select>
            <i className="fas fa-info-circle info-icon"></i>
          </div>
          <div className="quarter-width">
            <label htmlFor="mileage-from">Mileage</label>
            <div className="form-group" style={{ flexDirection: "row" }}>
              <input
                type="text"
                id="mileage-from"
                name="mileage-from"
                placeholder="From"
                className="small-width"
              />
              <input
                type="text"
                id="mileage-to"
                name="mileage-to"
                placeholder="To"
                className="small-width"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="quarter-width">
            <label htmlFor="transmission">Transmission</label>
            <select id="transmission" name="transmission">
              <option>AT</option>
            </select>
          </div>
          <div className="quarter-width">
            <label htmlFor="steering">Steering</label>
            <select id="steering" name="steering">
              <option>Any</option>
            </select>
          </div>
        </div>
      </div>
      <div className="submit-section">
        <button type="submit">
          <i className="fas fa-envelope"></i> INQUIRY
        </button>
      </div>
      <div className="checkbox-section">
        <input type="checkbox" id="receive-news" name="receive-news" />
        <label htmlFor="receive-news">
          Receive news
        </label>
      </div>
    </div>
  );
};

export default InquiryForm;
