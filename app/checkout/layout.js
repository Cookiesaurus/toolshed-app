import Link from "next/link";
import './checkout.css';
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
    <>
        <div className='bread-crumb'>
        <p><Link href={'/'} className='crumb-init'>SEAC Tool Shed /</Link></p><p className='crumb-extra'>Check out</p>
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
                    <label htmlFor="save-billInfo">Save this address for future check-out</label>
                    <input type="checkbox" id="save-billInfo"></input>
                </div>
            </form>
          </div> 
          <div className="checkout-info">
          <div className="cart-total">
              <p>Cart total</p>
              <div className="cart-items">
                <p>Pickup Items</p>
                <p></p>
              </div>
              <div className="cart-items">
                <p>Reserved Items</p>
                <p></p>
              </div>
              <div className="cart-items">
                <p>Total: </p>
                <p> items</p>
              </div>
              <br/>
              <br/>
            </div>
            <form className="checkout-form" method="post">
                <div className="billing">
                    <div className="billing-options">
                        <label htmlFor="billing-selection">Credit/Debit</label>
                        <input type="radio" id="billing-selection" name="billing-option"/>
                        <label htmlFor="billing-cash">Cash pickup</label>
                        <input type="radio" id="billing-cash" name="billing-option"/>
                    </div>
                    <div className="billing-giftcard">
                        <label htmlFor="billing-giftcard" className="sr-only">Gift card code</label>
                        <input type="text" placeholder="Gift Card" id="billing-giftcard"></input>
                        <button type="submit" id="apply-giftcard">Apply Gift Card</button>
                    </div>
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