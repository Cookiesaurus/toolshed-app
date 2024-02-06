import Link from "next/link";
import './giftcard.css';
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
        <div className="cart-cont">
        <div className='bread-crumb'>
        <p><Link href={'/'} className='crumb-init'>Account /</Link></p><p className='crumb-extra'>Gift Card</p>
      </div>
        </div>
        <div className="giftcard-cont">
          <div className="left-account">
          <h3>Account Settings</h3>
          <p><Link href={'/Account/Profile'}>Profile</Link></p>
          <p><Link href={'/Account/Profile'}>Security</Link></p>
          <p><Link href={'/Account/Profile'}>Membership</Link></p>
          <p><Link href={'/Account/Profile'}>Profile</Link></p>
          <h3>Payment</h3>
          <p><Link href={'/Account/Profile'}>Saved Cards</Link></p>
          <p><Link href={'/Account/Profile'}>Transaction History</Link></p>
          <p><Link href={'/Account/Profile'}>Gift Card</Link></p>
          <p><Link href={'/Account/Profile'}>Profile</Link></p>
            {/* gonna make a componenet for the left side bar  */}
          </div>
          <div className="right-account">
            <h1>Gift Card</h1>
            <div className="redeem-card">
              <p>Please enter your code below</p>
              <input type="text" id="card-redeem"></input>
              <button className="redeem-button" type="submit" id="card-redeem-button">Redeem gift card</button>
            </div>

            <div className="gift-card-ranks">
          <div className="rank">
            <h3>Tinker Level</h3>
            <p>This is a gift certificate for one Tinkerer Level Membership (normally $25 per year).
            <br/>
              With this membership, the member can rent up to five tools at a time*</p>
            <button className="redeem-button" type="submit" id="gift-redeem-button">Price</button>
          </div>
          <div className="rank">
          <h3>Tinker Level</h3>
          <p>This is a gift certificate for one Tinkerer Level Membership (normally $25 per year).
          <br/>
          With this membership, the member can rent up to five tools at a time*</p>
          <button className="redeem-button" type="submit" id="gift-redeem-button">Price</button>
          </div>
          <div className="rank">
          <h3>Tinker Level</h3>
          <p>This is a gift certificate for one Tinkerer Level Membership (normally $25 per year).
          <br/>
            With this membership, the member can rent up to five tools at a time*</p>
          <button className="redeem-button" type="submit" id="gift-redeem-button">Price</button>
          </div>
          <div className="rank">
          <h3>Tinker Level</h3>
          <p>This is a gift certificate for one Tinkerer Level Membership (normally $25 per year).
          <br/>
          With this membership, the member can rent up to five tools at a time*</p>
          <button className="redeem-button" type="submit" id="gift-redeem-button">Price</button>
          </div>
        </div>
          </div>
          
        </div>
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }