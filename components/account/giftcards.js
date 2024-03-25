'use client'
import React from 'react'
import { useState } from 'react'

const PaymentButton = ({paymentAmount}) =>{
  return (
    <button  type='submit'> {paymentAmount} </button>
  )
}

const RecipientModal = () =>{
  return (
    <>
      <label htmlFor='first name'>First Name </label>
      <input type='text' required name='first name' />
      <label htmlFor='last name'>Last Name </label>
      <input type='text' name='last name'/>
      <label htmlFor='email'>Email </label>
      <input type='email' name='email' />
      <label htmlFor='message'>Message </label>
      <textarea name='message' rows={4} cols={50}></textarea>
    </>
  )
}

const FromModal = () =>{
  return (
    <>
      <label htmlFor='first name'>First Name </label>
      <input type='text' required name='first name' />
      <label htmlFor='last name'>Last Name </label>
      <input type='text' name='last name'/>
      <label htmlFor='email'>Email </label>
      <input type='email' name='email' />
    </>
  )
}

const GiftCardOptions = ()=>{
  const [paymentAmount, setPaymentAmount] = useState('$0.00')
  const handleButtonClick = (event) =>{
    setPaymentAmount(event.target.textContent)
  }

  return (<>
    <div className="redeem-card">
      <h2 className='section-title'>Redeem a gift card</h2>
      <form className='redeem-card'>
        <label className='' for="code">Enter gift card code</label>
        <input type='text' id='code' name='code' ></input>
        <button className="redeem-button" type="submit" id="card-redeem-button">Redeem gift card</button>
      </form>
    </div>
    <div className='buy-card'>
      <h2 className='section-title'>Buy a gift card</h2>
      <RecipientModal/>
      <FromModal/>
      <PaymentButton paymentAmount={paymentAmount} />
    </div>
    <div className="gift-card-ranks">
      <div className="rank">
        <h3>Tinker Level <br/> Gift Certificate</h3>
        <p>This is a gift certificate for one McGuyver Level Membership (normally $35 per year).
        <br/>
        With this membership, the member can rent up to five tools at a time*</p>
        <button className="redeem-button" id="gift-redeem-button-25" onClick={handleButtonClick}>$25.00</button>
      </div>
      <div className="rank">
        <h3>MacGyver Level<br/> Gift Certificate</h3>
        <p>This is a gift certificate for one Tinkerer Level Membership (normally $25 per year).
        <br/>
        With this membership, the member can rent up to 10 tools at a time*</p>
        <button className="redeem-button" id="gift-redeem-button-35" onClick={handleButtonClick} >$35.00</button>
      </div>
      <div className="rank">
        <h3>Builder Level <br/>Gift Certificate</h3>
        <p>This is a gift certificate for one Builder Level Membership (normally $50 per year).
        <br/>
        With this membership, the member can rent up to 25 tools at a time*</p>
        <button className="redeem-button" id="gift-redeem-button-50" onClick={handleButtonClick} >$50.00</button>
      </div>
      <div className="rank">
        <h3>Contractor Level <br/> Gift Certificate</h3>
        <p>This is a gift certificate for one Contractor Level Membership (normally $100 per year).
        <br/>
        With this membership, the member can rent up to 50 tools at a time*. This membership allows two users on the account.</p>
        <button className="redeem-button"  id="gift-redeem-button-100" onClick={handleButtonClick} >$100.00</button>
      </div>
    </div>
    <div className="discalimer">
      <p>*Note: Rented tools must be returned within 5 days. After that, a $1 fee per day will be incurred. Any tool not returned after 30 days will result in the renter being charged for the value of a new replacement tool (market value).</p>
    </div>
  </>)
}

const Giftcards = () => {
  return (
    <>
        <h1>Gift Card</h1>
        <form>
          <GiftCardOptions />
        </form>
    </>
  )
}

export default Giftcards
