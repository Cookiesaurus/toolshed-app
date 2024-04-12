import React from 'react'

const CheckOutTool = () => {
  return (
    <>
    <div className='checkout-header-container'>
        <div className='checkout'>
            <h1>Check Out</h1>
            <p>for</p>
            <div className='customer-info'>
                <label>This will act as a search for the table below</label>
                <input type='text' placeholder='Find User'></input>
                <label>This will act as a filter for the table below</label>
                <select>
                    <option>Memebership Level</option>
                    <option>Memebership Level</option>
                    <option>Memebership Level</option>
                    <option>Memebership Level</option>
                </select>
            </div>
        </div>
    </div>

    <div className='checkout-item-container'>
        <div>
            <label htmlFor='item id'>Item ID: This will be auto populated based on the info that comes from inventory </label>
            <input type='text' id='item id'/>

            <label htmlFor='due date'>Due Date</label>
            <input type='date' id='due date'/>
        </div>
    </div>
    </>
  )
}

export default CheckOutTool
