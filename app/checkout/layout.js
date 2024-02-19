import Link from "next/link";
import './checkout.css';
import Image from "next/image";
import visa from '../public/images/visa.png'
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
    <>
        <div className='bread-crumb'>
        <p className='crumb-init'>
          <Link href={'/'}>SEAC Tool Shed /</Link>
        </p>
        <p className='crumb-extra'>Check out</p>
      </div>
      <h1 id="billing">Billing Details</h1>

      <div className="checkout-container">
          <div className="billing-form">
            <form method="post" className="billing-info">
                <label htmlFor="billing-firstName" >First Name</label>
                <input className="input" required id="billing-firstName"/>
                
                <label htmlFor="billing-company" >Company Name</label>
                <input className="input" id="billing-company"/>
                
                <label htmlFor="billing-streetAddress" >Address Line One</label>
                <input className="input" required id="billing-addressOne"/>
                
                <label htmlFor="billing-streetAddress" >Address Line Two</label>
                <input className="input" id="billing-addressTwo"/>

                <label htmlFor="billing-addressTown" >Town/City</label>
                <input className="input" required id="billing-addressTown"/>
                
                <label htmlFor="billing-email" >Email</label>
                <input className="input" required type="email" id="billing-email"/>
                
                <label htmlFor="billing-phoneNumber" >Phone number</label>
                <input className="input" type="email" required id="billing-phoneNumber"/>

                <div className="save-info">
                  <label htmlFor='save-billInfo' className='checkbox-container' >
                      Save this address for future check-out
                  <input type="checkbox" className='checkbox' id='save-billInfo' />
                  <span className="checkmark"></span>
                </label>
                </div>
            </form>
          </div> 
          <div className="checkout-info">
          <div className="checkout-total">
              <div className="cart-items">
                <p>Pickup Items</p>
                <p></p>
              </div>
              <div className="cart-items">
                <p>Item One</p>
                <p></p>
              </div>
              <div className="cart-items">
                <p>Total: </p>
                <p>items</p>
              </div>
              <br/>
              <br/>
            </div>
            <form className="checkout-form" method="post">
                <div className="billing">
                    <div className="billing-options">
                      <div className="credit-debit">
                        <input type="radio" id="billing-selection" name="billing-option"/>
                        <label htmlFor="billing-selection">Credit/Debit</label>
                      </div>
                      <div className="cash">
                        <input type="radio" id="billing-cash" name="billing-option"/>
                        <label htmlFor="billing-cash">Cash on pickup</label>
                      </div>
                    </div>
                  </div>
                    <div className="billing-giftcard">
                        <label htmlFor="billing-giftcard" className="sr-only">Gift card code</label>
                        <input type="text" placeholder="Gift Card" id="billing-giftcard"></input>
                        <button type="submit" id="apply-giftcard">Apply Gift Card</button>
                    </div>
              <div className="place-order">
                <button type="submit" id="place-order">Place Order</button>
              </div>
            </form>
          </div> 
      </div>
    </>
    )
  }