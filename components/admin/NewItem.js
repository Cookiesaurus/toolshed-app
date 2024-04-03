"use client"
import React, {useState} from "react";
const NewItem = () => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
    };
    
  return (
    <>
      <h2>Add new item</h2>
        <form>
        <div className="new-item-container">

            <div className="new-item-left white">
            <h3 className="white">Item Information</h3>

            <div className="item-info white">
                <label htmlFor="item-id" className="white"> Item ID </label>
                <input type="text" name="item-id" />

                <label htmlFor="item-name" className="white"> Item Name </label>
                <input type="text" name="item-name" />
            </div>
            <div className="item-info white">
                <p className="white">Status</p>
                <label
                htmlFor="status-maintance"
                className="checkbox-container white"
                >
                In Maintance
                <input
                    type="checkbox"
                    className="checkbox"
                    id="status-maintance"
                    name="category"
                />
                <span className="checkmark"></span>
                </label>
                <label
                htmlFor="status-disabled"
                className="checkbox-container white"
                >
                Disabled
                <input
                    type="checkbox"
                    className="checkbox"
                    id="status-disabled"
                    name="category"
                />
                <span className="checkmark"></span>
                </label>
            </div>
            
            <div className="item-info white">
                <label htmlFor="item-brand" className="white"> Brand </label>
                <input type="text" name="item-brand" />

                <label htmlFor="item-type" className="white"> Type </label>
                <input type="text" name="item-type" />
                
                <label htmlFor="item-weight" className="white"> Weight </label>
                <input type="text" name="item-weight" />
            </div>
                <div className="item-info white">
                    <label htmlFor="item-main-location" className="white">Home Location</label>
                    <select name="item-main-location" id="item-location" >
                        <option value="volvo">Home</option>
                    </select>
                    
                    <label htmlFor="item-current-location" className="white">Home Location</label>
                    <select name="item-location" id="item-location">
                        <option value="volvo">Home</option>
                    </select> 

                    <label
                htmlFor="status-floating"
                className="checkbox-container white"
                >
                Floating
                <input
                    type="checkbox"
                    className="checkbox"
                    id="status-floating"
                    name="category"
                />
                <span className="checkmark"></span>
                </label>
                <label
                htmlFor="status-home"
                className="checkbox-container white"
                >
                Goes Home
                <input
                    type="checkbox"
                    className="checkbox"
                    id="status-home"
                    name="category"
                />
                <span className="checkmark"></span>
                </label>
                </div>
            </div>

            <div className="new-item-right">
                <div className="item-info">
                    <p>Additional Item Information</p>
                    <label htmlFor="item-image">Item image</label>
                    <input type="file" name="item-image" onChange={handleFileChange} />

                    <label htmlFor="item-attachements">Additional Attachements</label>
                    <input type="file" name="item-attachements" onChange={handleFileChange} />
                </div>
                <div className="item-info">
                    <label htmlFor="Item Description">Item Description</label>
                    <textarea id="story" name="story" rows="5" cols="33">
                       
                    </textarea>
                </div>
                <div className="item-info">
                    <label htmlFor="item-category">Category</label>
                    <label
                htmlFor="status-floating"
                className="checkbox-container"
                >
                Category - To Do: pull this from DB
                <input
                    type="checkbox"
                    className="checkbox"
                    id="status-floating"
                    name="category"
                />
                <span className="checkmark"></span>
                </label>
                </div>
            </div>
            </div>
        </form>
    </>
  );
};

export default NewItem;
