import Link from "next/link";
import './giftcard.css';
import Giftcards from "@/components/account/giftcards";
import Accountnav from "@/components/account/accountnav";
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
        <div className="cart-cont">
        <div className='bread-crumb'>
        <p className='crumb-init'>
          <Link href={'/'}>SEAC Tool Shed /</Link>
        </p>
        <p className='crumb-extra'>
          <Link href={'/giftcard'}>Gift Cards</Link>
        </p>
      </div>
        </div>
        <div className="giftcard-cont">
          <div className="left-account">
          </div>
          <div className="right-account">
          <div className="gift-card-ranks">
              <div className="rank">
                <h3>Tinker Level <br/> Gift Certificate</h3>
                  <p>This is a gift certificate for one McGuyver Level Membership (normally $35 per year).
                  <br/>
                  With this membership, the member can rent up to five tools at a time*</p>
                <button className="redeem-button" type="submit" id="gift-redeem-button-25">$25.00</button>
              </div>
              <div className="rank">
                <h3>MacGyver Level<br/> Gift Certificate</h3>
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
                <h3>Contractor Level <br/> Gift Certificate</h3>
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