'use client'
import React from 'react'
import Image from 'next/image'
import { processCheckOut, cancelReservation } from '@/actions/adminActions'
import Toast from '../Toast'
import ErrorToast from '../ErrorToast'
import { useState } from 'react'
const CheckOutItem = ({customerName, toolInfo, transactionID}) => {
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setErrorShowToast] = useState(false);
  function handleCheckOut(formData){
    let email = customerName?.Email
    let toolName = toolInfo?.Tool_Name
    processCheckOut(email, toolName, transactionID, formData)
      .then((response)=>{
        if(response.status === 'error'){
          console.log('error')
        }
        else if(response.status === 'date error'){
          console.log('invalid date')
          setErrorShowToast(true)
        }else if (response.status === 'success'){
          setShowToast(true)
        }
        console.log(response)
      })
  }

  function handleCancel(){
    console.log('in cancel')
    cancelReservation(toolInfo?.Tool_ID, transactionID)
      .then((response)=>{
        if(response.status === 'error'){
          console.log('error')
        }else if (response.status === 'success'){
          console.log('canceled')
        }
        console.log(response)
      })
  }

  function RoundToHun(decimal) {
    const roundedDecimal = parseFloat(decimal).toFixed(2);
    const roundedNum = parseFloat(roundedDecimal);
    return roundedNum;
  }


  return (
    <>
      {showErrorToast && <ErrorToast message="Please input a valid date!" />}
      {showToast && <Toast message="Tool has successfully been checked out!" />}
      <h1>Check Out Tool for {customerName?.First_Name + " " + customerName?.Last_Name}</h1>

      <form method='POST'>
      <div className='new-user-cont'>
        <div className='new-user-right'>
            <label htmlFor='toolName'>Tool Name</label>
            <input type='text' id='toolName' name='toolName' defaultValue={toolInfo?.Tool_Name}/>

            <label htmlFor='returnDate'> Return Date </label>
            <input type='date' id='returnDate' name='returnDate' defaultValue={''}/>

            <label htmlFor='loanLength'> Loan Length (In Days) </label>
            <input type='text' id='loanLength' name='loanLength' defaultValue={toolInfo?.Default_Loan_Length}/>

            <label htmlFor='loanFee'> Loan Fee </label>
            <input type='text' id='loanFee' name='loanFee' defaultValue={toolInfo?.Tool_Loan_Fee}/>

            <label htmlFor='returnLoc'> Return Location </label>
            <input type='text' id='returnLoc' name='returnLoc' defaultValue={toolInfo?.Home_Location}/>

            <p>{toolInfo?.Is_Floating === 1 ? 'This tool can be retiurned at any of our current locations' : "This tool can only be returned to the location specifed above" }</p>
        </div>
        <div className='new-user-left'>
        <h2>Tool Information</h2>
            <p>Tool ID: {toolInfo?.Tool_ID}</p>
            <p>Name: {toolInfo?.Tool_Name}</p>
            <p>Description: {toolInfo?.Tool_Description}</p>
            <p>Replacement Cost: ${RoundToHun(toolInfo?.Tool_Replacement_Cost)}</p>
            <Image src={toolInfo?.Tool_Link} alt='Tool Image' width={300} height={300} priority={true}/>
        </div>
      </div>
      <div className="create-button-cont">
          <button className="createNewUserButton" type="submit" id="create-item" formAction={handleCheckOut}>
            Process Check Out
          </button>
          <button className="createNewUserButton" type="submit" id="delete-item" onClick={(e)=>{e.preventDefault(); handleCancel()}}>
            Cancel Reservation
          </button>
        </div>
      </form>
    </>
  )
}

export default CheckOutItem
