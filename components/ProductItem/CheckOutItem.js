import React from 'react'
import Image from 'next/image'
const CheckOutItem = ({customerName, toolInfo}) => {
  return (
    <>
      <h1>Check Out Tool for {customerName?.First_Name + " " + customerName?.Last_Name}</h1>

      <form>
      <div className='new-user-cont'>
        <div className='new-user-right'>
            <label htmlFor='toolName'>Tool Name</label>
            <input type='text' id='toolName' name='toolName' defaultValue={toolInfo?.Tool_Name}/>

            <label htmlFor='returnDate'> Return Date </label>
            <input type='date' id='returnDate' name='returnDate' defaultValue={''}/>

            <label htmlFor='loanLength'> Loan Length </label>
            <input type='text' id='loanLength' name='loanLength' defaultValue={''}/>

            <label htmlFor='loanFee'> Loan Fee </label>
            <input type='text' id='loanFee' name='loanFee' defaultValue={''}/>
        </div>
        <div className='new-user-left'>
        <h2>Tool Information</h2>
            <p>Name: {toolInfo?.Tool_Name}</p>
            <p>Description: {toolInfo?.Tool_Description}</p>
            <Image src={toolInfo?.Tool_Link} alt='Tool Image' width={300} height={300} priority={true}/>
        </div>
      </div>
      <div className="create-button-cont">
          <button className="createNewUserButton" type="submit" id="create-item">
            Process Check Out
          </button>
        </div>
      </form>
    </>
  )
}

export default CheckOutItem
