'use client'
import React from 'react'
import Toast from '../Toast'
import ErrorToast from '../ErrorToast'
import { useState } from 'react'
import Image from 'next/image'
import { processCheckIn } from '@/actions/adminActions'
const CheckInItem = ({customerName, toolInfo, transactionID, locations}) => {
    const [showToast, setShowToast] = useState(false);
    const [showlocationToast, setErrorLocationToast] = useState(false);
    function RoundToHun(decimal) {
        const roundedDecimal = parseFloat(decimal).toFixed(2);
        const roundedNum = parseFloat(roundedDecimal);
        return roundedNum;
      }
    const floatingStatus = toolInfo?.Is_Floating === 1 ? true : false
    console.log(floatingStatus)
    function handleCheckIn(formData){
        processCheckIn(customerName?.Account_ID, transactionID, toolInfo?.Tool_ID, floatingStatus, formData)
        .then((response)=>{
            if(response.status === 'location'){
                setErrorLocationToast(true)
            }else if(response.status === 'success'){
                setShowToast(true)
            }
        })
    }
  return (
    <>
        {showlocationToast && <ErrorToast message="This tool cannot be dropped off at this location!"/>}
      {showToast && <Toast message="Tool has successfully been checked back in!" />}
      <h1>Check In Tool for {customerName?.First_Name + " " + customerName?.Last_Name}</h1>
      <form method='POST'>
      <div className='new-user-cont'>
        <div className='new-user-right'>
            <label htmlFor='toolName'>Tool Name</label>
            <input type='text' id='toolName' name='toolName' defaultValue={toolInfo?.Tool_Name}/>

            <label htmlFor='returnLoc'> Return Location </label>
            <select className="formInput" id='returnLoc' name='returnLoc' defaultValue={toolInfo?.Home_Location}>
              <option value={toolInfo?.Home_Location}>{toolInfo?.Home_Location}</option>
              {locations.map((place) => (
                <option key={place.Tool_Location} value={place.Location_Name}>
                  {place.Location_Name}
                </option>
              ))}
            </select>
            <br/>
            <label className="form-label" htmlFor="curLoc">
              Drop Off Location
            </label>
            <select className="formInput" name="curLoc" id="curLoc" defaultValue={toolInfo?.Current_Location}>
              <option value={toolInfo?.Current_Location}>{toolInfo?.Current_Location}</option>
              {locations.map((place) => (
                <option key={place.Tool_Location} value={place.Location_Name}>
                  {place.Location_Name}
                </option>
              ))}
            </select>
            <br/>
            <label htmlFor="status" className="form-input">
            Select a tool status
            </label>
            <select
              id="status"
              name="tool-status"
              className="input"
              defaultValue={toolInfo?.Tool_Status_Details}
            >
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Disabled">Disabled</option>
              <option value="Checked Out">Checked Out</option>
            </select>
            <label
                htmlFor='cleanFee'
                className="checkbox-container"
                >
                Add Cleaning Fee
                <input
                    type="checkbox"
                    className="checkbox"
                    id='cleanFee'
                    name="cleanFee"
                    value='apply-clean'
                />
                <span className="checkmark"></span>
                </label>
                <label
                htmlFor='replaceFee'
                className="checkbox-container"
                >
                Add Replacement Cost
                <input
                    type="checkbox"
                    className="checkbox"
                    id='replaceFee'
                    name="replaceFee"
                    value={RoundToHun(toolInfo?.Tool_Replacement_Cost)}
                />
                <span className="checkmark"></span>
                </label>
            <p>{floatingStatus ? 'This tool can be returned at any of our current locations' : "This tool can only be returned to the location specifed in the return location above" }</p>
        </div>
        <div className='new-user-left'>
        <h2>Tool Information</h2>
            <p>Tool ID: {toolInfo?.Tool_ID}</p>
            <p>Name: {toolInfo?.Tool_Name}</p>
            {toolInfo && toolInfo?.Tool_Description ? <p>Description: {toolInfo?.Tool_Description}</p> : <></>}
            <p>Replacement Cost: ${RoundToHun(toolInfo?.Tool_Replacement_Cost)}</p>
            <Image src={toolInfo?.Tool_Link} alt='Tool Image' width={300} height={300} priority={true}/>
        </div>
      </div>
      <div className="create-button-cont">
          <button className="createNewUserButton" type="submit" id="create-item" formAction={handleCheckIn}>
            Process Check In
          </button>
        </div>
      </form>
    </>
  )
}

export default CheckInItem
