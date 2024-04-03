import React from 'react'

const CheckOutTool = () => {
  return (
    <>
    <div className='checkout-header-container'>
        <div className='checkout'>
            <h1>Check Out</h1>
            <p>for</p>
            <div className='customer-info'>
                <p>Customer Name</p>
                <p>Membership Level</p>
            </div>
        </div>
    </div>

    <div className='checkout-item-container'>
        <div>
            <label htmlFor='item id'>Item ID</label>
            <input type='text' id='item id'/>

            <label htmlFor='due date'>Due Date</label>
            <input type='date' id='due date'/>
        </div>
    </div>
    </>
  )
}

export default CheckOutTool
