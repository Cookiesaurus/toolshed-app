"use client";
import React, { useState } from "react";
const EditItem = ({ categories, brands, types, locations }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  return (
    <>
      <h1 className="section-title-big">Edit Item</h1>
      <form>
        <div className="new-user-cont">
          <div className="new-user-right">
            <label className="form-label" htmlFor="itemName">
              Item Name
            </label>
            <input
              className="formInput"
              type="text"
              id="itemName"
              name="itemName"
            />
            <p className="section-title-small">Select a tool status</p>
            <div className="section-status">
              <label
                      htmlFor="avaliable-status"
                      className="checkbox-container"
                    >
                      Available
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="avaliable-status"
                        name="category"
                        value="disabled"
                      />
                      <span className="checkmark"></span>
                    </label>
              <label
                      htmlFor="maintenance-status"
                      className="checkbox-container"
                    >
                      Maintenance
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="maintenance-status"
                        name="category"
                        value="disabled"
                      />
                      <span className="checkmark"></span>
                    </label>
              <label
                      htmlFor="disabled-status"
                      className="checkbox-container"
                    >
                      Disabled
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="disabled-status"
                        name="category"
                        value="disabled"
                      />
                      <span className="checkmark"></span>
                    </label>
            </div>
            <div className="sub-section">
              <p className="section-title-small">Categories</p>
              <div className="long-section">
                {categories.map((category) => (
                  <React.Fragment key={category.Category_ID}>
                    <label
                      htmlFor={category.Category_Name}
                      className="checkbox-container"
                    >
                      {category.Category_Name}
                      <input
                        type="checkbox"
                        className="checkbox"
                        id={category.Category_Name}
                        name="category"
                        value={category.Category_Name}
                        onChange={(e) => {
                          handleCategoryChange(e);
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <p className="section-title-small">Tool type</p>
            <div className="long-section">
              {types.map((type) => (
                <React.Fragment key={type.Type_Name}>
                  <label
                    htmlFor={type.Type_Name}
                    className="checkbox-container"
                  >
                    {type.Type_Name}
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={type.Type_Name}
                      name="brand"
                      value={type.Type_Name}
                      onChange={(e) => {
                        handleTypeChange(e);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="new-user-left">
            <label className="form-label" htmlFor="brand-name">
              Brand Name
            </label>
            <br />
            <select className="formInput" id="brand-name" name="brand-name">
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.Brand_Name} value={brand.Brand_Name}>
                  {brand.Brand_Name}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label className="form-label" htmlFor="weight">
              Weight in lbs
            </label>
            <input
              className="formInput"
              type="text"
              id="weight"
              name="weight"
            />
            <label className="form-label" htmlFor="size">
              Size in inches
            </label>
            <input className="formInput" type="text" id="size" name="size" />

            <label className="form-label" htmlFor="image">
              Upload tool picture
            </label>
            <input className="form-input" type="file" id="image" name="image" />
            <label className="form-label" htmlFor="additionalFile">
              Upload tool manual/other docs
            </label>
            <input
              className="form-input"
              type="file"
              id="additionalFile"
              name="additionalFile"
            />
            <label className="form-label" htmlFor="loanFee">
              Additional Loan fee for tool in $
            </label>
            <input
              className="form-input"
              type="text"
              id="loanFee"
              name="loanFee"
              defaultValue={"0"}
            ></input>
            <label className="form-label" htmlFor="lateFee">
              Late fee for tool per dayin $
            </label>
            <input
              className="form-input"
              type="text"
              id="lateFee"
              name="lateFee"
              defaultValue={"1"}
            ></input>
            <label className="form-label" htmlFor="loanLength">
              Length of Loan
            </label>
            <input
              className="form-input"
              type="text"
              id="loanLength"
              name="loanLength"
              defaultValue={"7"}
            ></input>
            <label className="form-label" htmlFor="loanRenew">
              Number of times that a customer can renew loan
            </label>
            <input
              className="form-input"
              type="text"
              id="loanRenew"
              name="loanRenew"
              defaultValue={"1"}
            ></input>
            <label className="form-label" htmlFor="replaceCost">
              Replacement Cost
            </label>
            <input
              className="form-input"
              type="text"
              id="replaceCost"
              name="replaceCost"
            ></input>
            <label className="form-label" htmlFor="dropOffLoc">
              Can be dropped off at any location
            </label>
            <select className="formInput" name="dropOffLoc" id="dropOffLoc">
              <option value={"1"}>Yes</option>
              <option value={"0"}>No</option>
            </select>
            <br />
            <label className="form-label" htmlFor="featured">
              Featured on the home page
            </label>
            <select className="formInput" name="featured" id="featured">
              <option value={"1"}>Yes</option>
              <option value={"0"}>No</option>
            </select>
            <br />
            <br />
            <label className="form-label" htmlFor="homeLoc">
              Home Location
            </label>
            <select className="formInput" name="homeLoc" id="homeLoc">
              <option value="">Select Location</option>
              {locations.map((place) => (
                <option key={place.Tool_Location} value={place.Location_Name}>
                  {place.Location_Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="create-button-cont">
          <button className="createNewUserButton" type="submit" id="create-item">
            Update Item
          </button>
          <button className="createNewUserButton" type="submit" id="delete-item">
           Delete Item
          </button>
        </div>
      </form>
    </>
  );
};

export default EditItem;
