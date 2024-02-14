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
            <p><Link href={'/account/profile'}>Profile</Link></p>
            <p><Link href={'/account/profile'}>Security</Link></p>
            <p><Link href={'/account/profile'}>Membership</Link></p>
            <p><Link href={'/account/profile'}>Profile</Link></p>
            <h3>Payment</h3>
            <p><Link href={'/account/profile'}>Saved Cards</Link></p>
            <p><Link href={'/account/profile'}>Transaction History</Link></p>
            <p><Link href={'/account/profile'}>Gift Card</Link></p>
            <p><Link href={'/account/profile'}>Profile</Link></p>
          </div>
          <div className="right-account">
            <h1>Gift Card</h1>
            <div className="redeem-card">
              <p>Please enter your code below</p>
              <form className="redeem-giftcard" method="post">
                <label htmlFor="card-redeem" className="sr-only">Redeem Gift Card</label>
                <input type="text" id="card-redeem" required></input>
                <button className="redeem-button" type="submit" id="card-redeem-button">Redeem gift card</button>
              </form>
            </div>
            <div className="gift-card-ranks">
              <div className="rank">
                <h3>Tinker Level <br/> Gift Certificate</h3>
                  <p>This is a gift certificate for one McGuyver Level Membership (normally $35 per year).
                  <br/>
                  With this membership, the member can rent up to five tools at a time*</p>
                <button className="redeem-button" type="submit" id="gift-redeem-button-25">$25.00</button>
              </div>
              <div className="rank">
                <h3>MacGyver Level Gift Certificate</h3>
                  <p>This is a gift certificate for one Tinkerer Level Membership (normally $25 per year).
                  <br/>
                  With this membership, the member can rent up to 10 tools at a time*</p>
                  <button className="redeem-button" type="submit" id="gift-redeem-button-35">$35.00</button>
              </div>
              <div className="rank">
                <h3>Builder Level <br/>Gift Certificate</h3>
                  <p>This is a gift certificate for one Builder Level Membership (normally $50 per year).
                  <br/>
                  With this membership, the member can rent up to 25 tools at a time*</p>
                  <button className="redeem-button" type="submit" id="gift-redeem-button-50">$50.00</button>
              </div>
              <div className="rank">
                <h3>Contractor Level Gift Certificate</h3>
                  <p>This is a gift certificate for one Contractor Level Membership (normally $100 per year).
                  <br/>
                  With this membership, the member can rent up to 50 tools at a time*. This membership allows two users on the account.</p>
                  <button className="redeem-button" type="submit" id="gift-redeem-button-100">$100.00</button>
              </div>
          </div>
          <div className="discalimer">
            <p>*Note: Rented tools must be returned within 5 days. After that, a $1 fee per day will be incurred. Any tool not returned after 30 days will result in the renter being charged for the value of a new replacement tool (market value).</p>
          </div>
          </div>
          
        </div>
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }