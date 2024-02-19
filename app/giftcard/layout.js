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
            <Giftcards/>
          </div>
        </div>
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }