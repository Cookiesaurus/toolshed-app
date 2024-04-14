"use client";
import { deleteItem, updateItem } from "@/actions/toolActions";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Toast from "@/components/Toast";
const EditItem = ({ categories, brands, types, locations, toolID, tool }) => {
  const [formError, setFormError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleFormSubmit(formData) {
    updateItem(toolID, formData)
      .then((response) => {
        if (response.status === 'error') {
          setFormError(true)
        } else if(response.status === 'success') {
          setShowToast(true);
          console.log("success");
          // alert(response);
        }
      })
      .catch((error) => {
        // Handle other potential errors, e.g., network error
      });
  }


  return (
    <>
      <h1 className="section-title-big">Edit Item</h1>
      {showToast && <Toast message="Tool updated successfully!" />}
      <span style={{ color: "red" }} role="alert">
            {formError ? (
              <>
                Categories and types cannot be empty, they must be reselected upon updating an item.
                <br />
              </>
            ) : (
              <></>
            )}
          </span>
      <form method="POST">
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
              defaultValue={tool?.Tool_Name}
            />
            <label className="form-label" htmlFor="itemDesc">
              Item Description
            </label>
            <input
              className="formInput"
              type="text"
              id="itemDesc"
              name="itemDesc"
              defaultValue={tool?.Tool_Description}
            />
            <div className="section-status">
            <label htmlFor="status" className="form-input">
            Select a tool status
            </label>
            <select
              id="status"
              name="status"
              className="input"
              defaultValue={tool?.Tool_Status_Details}
            >
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Disabled">Disabled</option>
            </select>
            </div>
            <div className="sub-section">
              <p className="section-title-small">Categories</p>
              <div className="edit-columns">
                <div className="current">
                <p>Current Categories:</p>
                   {tool?.Category_Name}
                </div>
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
                        value={category.Category_ID}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </React.Fragment>
                ))}
              </div>
              </div>
            </div>
            <p className="section-title-small">Tool types</p>
            <div className="edit-columns">
            <div className="current">
            <p>Current Types: </p>
              {tool?.Types}
            </div>
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
                      name="type"
                      value={type.Type_ID}
                    />
                    <span className="checkmark"></span>
                  </label>
                </React.Fragment>
              ))}
            </div>
            </div>
          </div>
          <div className="new-user-left">
            <label className="form-label" htmlFor="brand-name">
              Brand Name
            </label>
            <br />
            <select className="formInput" id="brand-name" name="brand-name" defaultValue={tool?.Brand_Name}>
              <option value={tool?.Brand_Name}>{tool?.Brand_Name}</option>
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
              defaultValue={tool?.Tool_Weight}
            />
            <label className="form-label" htmlFor="size">
              Size in inches
            </label>
            <input className="formInput" type="text" id="size" name="size" defaultValue={tool?.Tool_Size}/>
                <div className="edit-column">
                  <p>Current Image: </p>
                  <Image src={tool?.Tool_Link} alt="Tool Image" width={200} height={200}/>
                  <br/>
                  <label className="form-label" htmlFor="image">
                    Upload new tool picture
                  </label>
                  <input className="input" type="file" id="image" name="image" />
                </div>
                <div className="edit-column">
                    {tool?.Tool_Manual && (
                    <div className="produc-manual">
                      <a href={tool.Tool_Manual} target="_blank">Tool Manual</a>
                    </div>
                  )}
                  <br/>
                  <label className="form-label" htmlFor="additionalFile">
                    Upload new tool manual/other docs
                  </label>
                  <input
                    className="form-input"
                    type="file"
                    id="additionalFile"
                    name="additionalFile"
                  />
                </div>
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
              defaultValue={tool?.Tool_Replacement_Cost}
            ></input>
            <label className="form-label" htmlFor="dropOffLoc">
              Can be dropped off at any location
            </label>
            <select className="formInput" name="dropOffLoc" id="dropOffLoc" defaultValue={tool?.Is_Floating}>
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
            <select className="formInput" name="homeLoc" id="homeLoc" defaultValue={tool?.Home_Location}>
              <option value={tool?.Home_Location}>{tool?.Home_Location}</option>
              {locations.map((place) => (
                <option key={place.Tool_Location} value={place.Location_Name}>
                  {place.Location_Name}
                </option>
              ))}
            </select>
            <br/>
            <label className="form-label" htmlFor="curLoc">
              Current Location
            </label>
            <select className="formInput" name="curLoc" id="curLoc" defaultValue={tool?.Current_Location}>
              <option value={tool?.Current_Location}>{tool?.Current_Location}</option>
              {locations.map((place) => (
                <option key={place.Tool_Location} value={place.Location_Name}>
                  {place.Location_Name}
                </option>
              ))}
            </select>
            <br/>
            <label className="form-label" htmlFor="locDesc">
              Location Description
            </label>
            <input
              className="form-input"
              type="text"
              id="locDesc"
              name="locDesc"
              defaultValue={tool?.Location_Code}
            ></input>
          </div>
        </div>
        <div className="create-button-cont">
          <button className="createNewUserButton" type="submit" id="create-item" formAction={handleFormSubmit}>
            Update Item
          </button>
          <button className="createNewUserButton" type="submit" id="delete-item" onClick={(e) => { e.preventDefault(); deleteItem(toolID);}}>
           Delete Item
          </button>
        </div>
      </form>
    </>
  );
};

export default EditItem;
