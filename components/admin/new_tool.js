const New_Tool = () =>{
    return(
        <>
            <div className="right-section">
                <h1 className="section-title-big">Add New Item</h1>
                <form className="newItem">
                    <div className="section">
                        <label className="form-label" for="itemID">Item ID</label>
                        <input className="formInput" type="text" id="itemID" name="itemID" placeholder="1234567890"/>
                        <label className="form-label" for="itemName">Item Name</label>
                        <input className="formInput" type="text" id="itemName" name="itemName" placeholder="Tooly McToolface"/>
                        <div className="sub-section">
                            <p className="section-title-small">Select a tool status</p>
                            <input className="form-checkbox" type="checkbox" id="available" name="available" value="available"/>
                            <label className="form-label" for="available">Available</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="maintenance" name="maintenance" value="maintenance"/>
                            <label className="form-label" for="maintenance">Maintenance</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="disabled" name="disabled" value="disabled"/>
                            <label className="form-label" for="disabled">Disabled</label>
                        </div>
                        <label className="form-label" for="manufacturer">Manufacturer</label>
                        <input className="formInput" type="text" id="manufacturer" name="manufacturer" placeholder="manufacturer name"/>
                        <label className="form-label" for="model">Model</label>
                        <input className="formInput" type="text" id="model" name="model" placeholder="model name"/>
                        <label className="form-label" for="productCode">Product Code/UPC</label>
                        <input className="formInput" type="text" id="productCode" name="productCode" placeholder="1234567890"/>
                        <label className="form-label" for="serialNum">Serial Number</label>
                        <input className="formInput" type="text" id="serialNum" name="serialNum" placeholder="1234567890"/>
                        <label className="form-label" for="size">Size</label>
                        <input className="formInput" type="text" id="size" name="size" placeholder="input size"/>
                        <label className="form-label" for="mainLoc">Main Location</label>
                        <select className="formInput" name="mainLoc" id="mainLoc">
                            <option value="main">Main Location</option>
                            <option value="truck">Mobile Truck</option>
                        </select>
                        <label className="form-label" for="currentLoc">Current Location</label>
                        <select className="formInput" name="currentLoc" id="currentLoc">
                            <option value="main">Main Location</option>
                            <option value="truck">Mobile Truck</option>
                        </select>
                    </div>
                    <div className="section">
                        <label className="form-label" for='image'>Upload an image</label>
                        <input className="form-input" type="file" id="image" name="image"/>
                        <label className="form-label" for='additionalFile'>Upload a file</label>
                        <input className="form-input" type="file" id="additionalFile" name="additionalFile"/>
                        <label className="form-label" for='description'>Description</label>
                        <textarea id="description" name="description" rows="4" cols="50"/>
                        <label className="form-label" for="locationCode">Location Code</label>
                        <input className="formInput" type="text" id="locationCode" name="locationCode"/>
                        <div className="sub-section">
                            <p className="section-title-small">Categories</p>
                            <input className="form-checkbox" type="checkbox" id="crafting" name="crafting" value="crafting"/>
                            <label className="form-label" for="crafting">Crating</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="drillExtension" name="drillExtension" value="drill_extension"/>
                            <label className="form-label" for="drillExtension">Drill Extension</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="drywallTools" name="drywallTools" value="drywall_tools"/>
                            <label className="form-label" for="drywallTools">Drywall Tools</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="electrical" name="electrical" value="electrical"/>
                            <label className="form-label" for="electrical">Electrical</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="flooring" name="flooring" value="flooring"/>
                            <label className="form-label" for="flooring">Flooring</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="masonry" name="masonry" value="masonry"/>
                            <label className="form-label" for="masonry">Masonry</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="misc" name="misc" value="misc"/>
                            <label className="form-label" for="misc">Misc</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="painting" name="painting" value="painting"/>
                            <label className="form-label" for="painting">Painting</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="plumbing" name="plumbing" value="plumbing"/>
                            <label className="form-label" for="plumbing">Plumbing</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="roofing" name="roofing" value="roofing"/>
                            <label className="form-label" for="roofing">Roofing</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="sawBlades" name="sawBlades" value="saw_blades"/>
                            <label className="form-label" for="sawBlades">Saw Blades</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="welding" name="welding" value="welding"/>
                            <label className="form-label" for="welding">Welding</label>
                            <br/>
                            <input className="form-checkbox" type="checkbox" id="woodworking" name="woodworking" value="woodworking"/>
                            <label className="form-label" for="woodworking">Woodwoorking</label>
                        </div>
                        <label className="form-label" for="keyWords">Key Words</label>
                        <input className="formInput" type="text" id="keyWords" name="keyWords"/>
                        <label className="form-label" for='adminNotes'>Admin Notes</label>
                        <textarea id="adminNotes" name="adminNotes" rows="4" cols="50"/>
                        <label className="form-label" for="condition">Condition</label>
                        <select className="formInput" name="condition" id="condition">
                            <option value="new">New</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="bad">Bad</option>
                        </select>
                        <label className="form-label" for="signOff">Form needs to be signed off before checking out</label>
                        <select className="formInput" name="signOff" id="signOff">
                            <option value="yes">Yes</option>
                            <option value="no">no</option>
                        </select>
                        <label className="form-label" for="weight">Weight</label>
                        <input className="formInput" type="text" id="weight" name="weight"/>
                        <label className="form-label" for="ecoRating">ecoRating</label>
                        <input className="formInput" type="text" id="ecoRating" name="ecoRating"/>
                        <label className="form-label" for="embodiedCarbon">Embodied Carbon</label>
                        <input className="formInput" type="text" id="embodiedCarbon" name="embodiedCarbon"/>
                        <label className="form-label" for="emmsionFactor">Emmision Factor</label>
                        <input className="formInput" type="text" id="emmisionFactor" name="emmisionFactor"/>
                    </div>
                </form>
                <button type="submit">Add item</button>
            </div>
        </>
    )
}

export default New_Tool