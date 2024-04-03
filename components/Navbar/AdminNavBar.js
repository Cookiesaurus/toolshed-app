'use client'

import './navbar_admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faMagnifyingGlass, faFileInvoice} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { formHandler } from '@/lib/actions/formHandler';


const AdminNavBar = () => {
  return (
    <div className='navbar' role='Navigation' aria-label='Website Navigation'>
        <Link href={'/'} aria-label='Go to home' className='navbar-link' >
            <p className='navbar-logo'>SEAC Tool Shed</p>
        </Link>
        <p className='navbar-account'><Link href={'/'} aria-label='Go to home' className='navbar-link'>Return to Main site</Link></p>
        <form className='navbar-search' action={formHandler}>
            <label htmlFor='navbar-search' className='sr-only'>Find User</label>
            <input type="text" name="search" id='navbar-search' aria-label='find user' placeholder='Find user'/>
            <button type="submit" className='navbar-searchIcon' aria-hidden={true} tabIndex={-1}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' style={{color: 'white', backgroundColor: 'black'}}/>
            </button>
        </form>
        <form className='navbar-search' action={formHandler}>
            <label htmlFor='navbar-search' className='sr-only'>Search products</label>
            <input type="text" name="search" id='navbar-search' aria-label='search inventory' placeholder='Search inventory'/>
            <button type="submit" className='navbar-searchIcon' aria-hidden={true} tabIndex={-1}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' style={{color: 'white', backgroundColor: 'black'}}/>
            </button>
        </form>
        <p className='navbar-account'><Link href={'/login'} className='navbar-link'>Example Admin</Link></p>
    </div>
  )
}

export default AdminNavBar
