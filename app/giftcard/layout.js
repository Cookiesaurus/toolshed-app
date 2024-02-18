import Link from "next/link";
import './giftcard.css';
import Giftcards from "@/components/account/giftcards";
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
            <Giftcards/>
          </div>
        </div>
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }