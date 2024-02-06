'use client'

import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faMagnifyingGlass, faFileInvoice} from '@fortawesome/free-solid-svg-icons';
import CatOverlay from '../CatOverlay/CatOverlay';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar' role='Navigation' aria-label='Main'>
    <Link href={'/'}>
        <p className='navbar-logo'>SEAC’s Tool Shed</p>
    </Link>
    <div className='giftcard-inventory'>
    <Link href={'/giftcard'}>
        <p>Gift Card</p>
    </Link>
    <Link href={'/Inventory'}>
        <p>View All Tools</p>
    </Link>
    </div>
        <form className='navbar-search'>
            <input type="text" name="search" id='navbar-search'/>
            <button type="submit" className='navbar-searchIcon'><FontAwesomeIcon icon={faMagnifyingGlass} size='sm' style={{color: 'white'}}/></button>
        </form>
        <p className='navbar-cart'><Link href={'/Cart'}><FontAwesomeIcon icon={faCartShopping} size='lg'/></Link></p>
        <div className='account-hover'>
            <p className='navbar-account'><Link href={'/Account/Profile'}><FontAwesomeIcon icon={faUser} size='lg'/></Link></p>
            <div className='dropdown-content'>
                <div className='account'><p><Link href={'/settings'}>Account</Link></p><p><Link style={{color: '#FF0101'}} href={'/Login'}>Login</Link></p></div> {/* This is going to have to be conditional based on if the user is logged in or not and will have to be styled inline */}
                <Link href={'/Account/Profile'}><FontAwesomeIcon icon={faUser} inverse style={{color: '#6C757D', paddingRight: '10px'}}/><p>Account Settings</p></Link>
                <Link href={'/Account/Rentals'}><FontAwesomeIcon icon={faFileInvoice} inverse style={{color: '#6C757D', paddingRight: '10px'}}/><p>My transactions</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
