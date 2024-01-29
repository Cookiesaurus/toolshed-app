'use client'

import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faMagnifyingGlass, faBars, faCheckToSlot, faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import CatOverlay from '../CatOverlay/CatOverlay';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar' role='Navigation' aria-label='Main'>
    <Link href={'/'}>
        <p className='navbar-logo'>Home</p>
    </Link>
        <div className='category-hover'>
            <button className='navbar-category'><Link href={'/Categories'}>Category</Link></button>
            {/* Do we want the categories to be hardcoded? */}
            <CatOverlay/>
        </div>
        <form className='navbar-search'>
            <input type="text" name="search"/>
            <button type="submit" className='navbar-searchIcon'><FontAwesomeIcon icon={faMagnifyingGlass} size='sm' style={{color: 'white'}}/></button>
        </form>
        <p className='navbar-cart'><Link href={'/Cart'}><FontAwesomeIcon icon={faCartShopping} size='lg'/></Link></p>
        <div className='account-hover'>
            <p className='navbar-account'><Link href={'/Account/Profile'}><FontAwesomeIcon icon={faUser} size='lg'/></Link></p>
            <div className='dropdown-content'>
                <div className='account'><p>Account</p><p style={{color: '#FF0101'}}>Login</p></div> {/* This is going to have to be conditional based on if the user is logged in or not and will have to be styled inline */}
                <Link href={'/Account/Profile'}><FontAwesomeIcon icon={faUser} inverse style={{color: '#6C757D', paddingRight: '10px'}}/><p>Profile</p></Link>
                <Link href={'/Account/Rentals'}><FontAwesomeIcon icon={faCheckToSlot} inverse style={{color: '#6C757D', paddingRight: '10px'}}/><p>My rental items</p></Link>
                <Link href={'/Account/Favorites'}><FontAwesomeIcon icon={faHeart} inverse style={{color: '#6C757D', paddingRight: '10px'}}/><p>Favorites</p> </Link>
                <Link href={'/Account/Address'}><FontAwesomeIcon icon={faLocationDot} inverse style={{color: '#6C757D', paddingRight: '10px'}}/><p>Address Book</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
