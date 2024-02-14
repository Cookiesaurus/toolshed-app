'use client'

import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faMagnifyingGlass, faFileInvoice} from '@fortawesome/free-solid-svg-icons';
import CatOverlay from '../CatOverlay/CatOverlay';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar' role='Navigation' aria-label='Website Navigation'>
    <Link href={'/'} aria-label='Go to home' className='navbar-link' >
        <p className='navbar-logo'>SEAC’s Tool Shed</p>
    </Link>
    <div className='giftcard-inventory'>
    <Link href={'/giftcard'} aria-label='Go to gift cards' className='navbar-link'>
        <p>Gift Card</p>
    </Link>
    <Link href={'/inventory'} aria-label='Go to inventory' className='navbar-link'>
        <p>View All Tools</p>
    </Link>
    </div>
        <form className='navbar-search' method='get'>
            <label htmlFor='navbar-search' className='sr-only'>Search products</label>
            <input type="text" name="search" id='navbar-search' aria-label='search products'/>
            <button type="submit" className='navbar-searchIcon' aria-hidden={true} tabIndex={-1}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' style={{color: 'white', backgroundColor: '#555555'}}/>
            </button>
        </form>
        <p className='navbar-cart'><Link href={'/cart'} className='navbar-link'><FontAwesomeIcon icon={faCartShopping} size='lg' aria-label='Go to cart' style={{backgroundColor: 'white'}}/></Link></p>
        <div className='account-hover'>
            <p className='navbar-account'><Link href={'/account/profile'} className='navbar-link'><FontAwesomeIcon icon={faUser} size='lg' aria-label='Go to account profile' style={{color: 'black', paddingRight: '10px' , backgroundColor: 'white'}} /></Link></p>
            <div className='dropdown-content'>
                <div className='account'>
                    <p className='navbar-link'><Link href={'/account'} className='navbar-link'>Account</Link></p>
                    <p><Link style={{color: '#FF0101'}} href={'/login'} aria-label='Go to login' className='navbar-link'>Login</Link></p>
                    </div> {/* This is going to have to be conditional based on if the user is logged in or not and will have to be styled inline */}
                <Link href={'/account/profile'}><FontAwesomeIcon icon={faUser} style={{color: 'black', paddingRight: '10px', backgroundColor: 'white'}} aria-label='Go to  account settings'/><p>Account Settings</p></Link>
                <Link href={'/account/profile'}><FontAwesomeIcon icon={faFileInvoice} style={{color: 'black', paddingRight: '10px' , backgroundColor: 'white'}} aria-label='Go to account transaction' /><p>My transactions</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
