"use client"
import React from "react";
import { useState } from "react";
import { addCustomTransaction } from "@/actions/adminActions";
import Toast from "@/components/Toast";
import ErrorToast from "@/components/ErrorToast";
const AddTransaction = ({customerData, admin, transactionTypes}) => {
  const [formError, setFormError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  function handleFormSubmit(formData){
    addCustomTransaction(customerData?.Account_ID, formData)
      .then((response)=>{
        if(response.status === 'error'){
          console.error('there was an error')
        }else if(response.status === 'NaN'){
          setFormError(true)
        }else if(response.status === 'success'){
          setShowToast(true)
        }
      })
  }
  return (
    <>
      <h1>Add Transaction</h1>
      {showToast && <Toast message="Transaction created successfully!" />}
      {formError && <ErrorToast message="Error creating transaction: Please input a number value in the transaction amount field. Transaction Start Date cannot be empty" />}
      <form action={handleFormSubmit}>
        <div className="new-user-cont">
          <div className="new-user-left">
            <div className="accountInfo">
              <div className="primaryInfo">
                <h2>Account Info</h2>
                <label htmlFor="first_Name">First Name</label>
                <input type="text" id="first_Name" name="firstName" defaultValue={customerData?.First_Name} />

                <label htmlFor="last_Name">Last Name</label>
                <input type="text" id="last_Name" name="lastName" defaultValue={customerData?.Last_Name} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue={customerData?.Email}/>

              </div>
            </div>
          </div>
          <div className="new-user-right">
            <h2>Transaction Info</h2>
                <label htmlFor="transaction-id">Transaction ID</label>
                <input type="text" id="transaction-id" name="transactionID" />

                <label htmlFor="transaction-type">Transaction Type</label>
                <br/>
                <select id="transaction-type" name="transactionType" className="select">
                  {transactionTypes.map((option, index) => (
                    <option key={index} value={option.Transaction_Type}>
                      {option.Transaction_Details}
                    </option>
                  ))}
                </select>
                    <br/>
                <label htmlFor="transaction-start">Transaction Start Date: When an admin starts the transaction</label>
                <input type="date" id="transaction-start" name="transactionStart" />

                <label htmlFor="transaction-end">Transaction End Date</label>
                <input type="date" id="transaction-end" name="transactionEnd" />

                <label htmlFor="transaction-amount">Transaction Amount</label>
                <input type="text" id="transaction-amount" name="transactionAmount" />
          </div>
        </div>
        <div className="create-button-cont">
          <button className="createNewUserButton" type="submit">
            Create Transaction
          </button>
        </div>
      </form>
    </>
  )
}

export default AddTransaction
