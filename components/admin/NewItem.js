"use client"
import React, {useState} from "react";
const NewItem = () => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
    };
    
    return(
        <>
            <div className="right-section">
                <h1 className="section-title-big">Add New Item</h1>
                <form className="newItem">
                    <div className="section">
                        <label className="form-label" htmlFor="itemName">Item Name</label>
                        <input className="formInput" type="text" id="itemName" name="itemName"/>
                        <div className="sub-section">
                            <p className="section-title-small">Select a tool status</p>
                            <input className="form-checkbox" type="checkbox" id="available" name="available" value="available"/>
                            <label className="form-label" htmlFor="available">Available</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="maintenance" name="maintenance" value="maintenance"/>
                            <label className="form-label" htmlFor="maintenance">Maintenance</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="disabled" name="disabled" value="disabled"/>
                            <label className="form-label" htmlFor="disabled">Disabled</label>
                        </div>
                        <div className="sub-section">
                            <p className="section-title-small">Categories</p>
                            <input className="form-checkbox" type="checkbox" id="option1" name="option1" value="option1"/>
                            <label className="form-label" htmlFor="option1">Pull categories from database</label>
                        </div>
                        <div className="sub-section">
                            <p className="section-title-small">Tool type</p>
                            <input className="form-checkbox" type="checkbox" id="option2" name="option2" value="option2"/>
                            <label className="form-label" htmlFor="option2">Pull tool types from database</label>
                        </div>
                        <label className="form-label" htmlFor="brand-name">Brand Name</label>
                        <select className="formInput" id="brand-name" name="brand-name">
                            <option>Insert brands from database</option>
                        </select>
                        <label className="form-label" htmlFor="weight">Weight in lbs</label>
                        <input className="formInput" type="text" id="weight" name="weight"/>
                        <label className="form-label" htmlFor="size">Size in inches</label>
                        <input className="formInput" type="text" id="size" name="size"/>                        
                    </div>
                    <div className="section">
                        <label className="form-label" htmlFor='image'>Upload tool picture</label>
                        <input className="form-input" type="file" id="image" name="image"/>
                        <label className="form-label" htmlFor='additionalFile'>Upload tool manual/other docs</label>
                        <input className="form-input" type="file" id="additionalFile" name="additionalFile"/>
                        <label className="form-label" htmlFor="loanFee">Additional Loan fee htmlFor tool in $</label>
                        <input className="form-input" type="text" id="loanFee" name="loanFee" defaultValue={"0"}></input>
                        <label className="form-label" htmlFor="lateFee">Late fee htmlFor tool per dayin $</label>
                        <input className="form-input" type="text" id="lateFee" name="lateFee" defaultValue={"1"}></input>
                        <label className="form-label" htmlFor="loanLength">Length of Loan</label>
                        <input className="form-input" type="text" id="loanLength" name="loanLength" defaultValue={"7"}></input>
                        <label className="form-label" htmlFor="loanRenew">Number of times that a customer can renew loan</label>
                        <input className="form-input" type="text" id="loanRenew" name="loanRenew" defaultValue={"1"}></input>
                        <label className="form-label" htmlFor="replaceCost">Replacement Cost</label>
                        <input className="form-input" type="text" id="replaceCost" name="replaceCost" ></input>
                        <label className="form-label" htmlFor="dropOffLoc">Can be dropped off at any location</label>
                        <select className="formInput" name="dropOffLoc" id="dropOffLoc">
                            <option value={"1"}>Yes</option>
                            <option value={"0"}>No</option>
                        </select>
                        <label className="form-label" htmlFor="featured">Featured on the home page</label>
                        <select className="formInput" name="featured" id="featured">
                            <option value={"1"}>Yes</option>
                            <option value={"0"}>No</option>
                        </select>
                        <label className="form-label" htmlFor="homeLoc">Home Location</label>
                        <select className="formInput" name="homeLoc" id="homeLoc">
                            <option value="main">Insert locations from database</option>
                        </select>
                    </div>
                </form>
                <button className="createNewItemButton" type="submit">Add item</button>
            </div>
        </>
    )
};

export default NewItem;
