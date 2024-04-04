'use client'
import React from 'react'
import { useState, useEffect } from 'react'

const PaymentButton = ({paymentAmount}) =>{
  return (
    <h2 type='submit' className='white'> {paymentAmount} </h2>
  )
}

const RecipientModal = () =>{
  return (
    <>
    <div className='form-section'>
      <h3 className='white'>Recipient Info</h3>
      <form className="form-section">
        <label className="giftcard-label" htmlFor='first name'>First Name </label>
        <input className="giftcard-input" type='text' required name='first name' />
        <label className="giftcard-label" htmlFor='last name'>Last Name </label>
        <input className="giftcard-input" type='text' name='last name'/>
        <label className="giftcard-label" htmlFor='email'>Email </label>
        <input className="giftcard-input" type='email' name='email' />
        <label className="giftcard-label" htmlFor='message'>Message </label>
        <textarea name='message' rows={4} cols={30}></textarea>
      </form>
    </div>
    
    </>
  )
}

const FromModal = () =>{
  return (
    <>
    <div className='form-section'>
      <h3 className='white'>Sender Info</h3>
      <form className="form-section">
        <label className="giftcard-label" htmlFor='first name'>First Name </label>
        <input className="giftcard-input" type='text' required name='first name' />
        <label className="giftcard-label" htmlFor='last name'>Last Name </label>
        <input className="giftcard-input" type='text' name='last name'/>
        <label className="giftcard-label" htmlFor='email'>Email </label>
        <input className="giftcard-input" type='email' name='email' />
      </form>
    </div>
    </>
  )
}

const RedeemGiftCard = () =>{
  return (
    <>
      <div className="redeem-card">
      <h2 className='section-title white'>Redeem a gift card</h2>
      <form className='giftcard-form'>
        <label className='giftcard-label' for="code">Enter gift card code</label>
        <input className="giftcard-input" type='text' id='code' name='code' ></input>
        <button className="redeem-button" type="submit" id="card-redeem-button">Redeem gift card</button>
      </form>
    </div>
    </>
  )
}

const GiftCardOptions = ()=>{
  const [paymentAmount, setPaymentAmount] = useState('$0.00')
  const handleButtonClick = (event) =>{
    setPaymentAmount(event.target.textContent)
  }

  const [session, setSession] = useState(null);
  useEffect(() => {
      fetch("/api/me", { cache: "no-cache" })
          .then((response) => response.json())
          .then((data) => {
              setSession({
                  user: data.user,
                  isLoggedIn: data.isLoggedIn,
              });
          });
  }, []);



  return (<>
    {session && session.isLoggedIn ? <RedeemGiftCard /> : null}
    <div className='buy-card'>
      <h2 className='section-title white'>Buy a gift card</h2>
      
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
      <div className='giftcard-form-bottom'>
        <RecipientModal/>
        <FromModal/>
        <div className="form-section">
          <h3 className='white'>Total Due: </h3>
          <PaymentButton paymentAmount={paymentAmount} />
        </div>
        
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
          <GiftCardOptions />
    </>
  )
}

export default Giftcards
