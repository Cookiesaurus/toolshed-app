'use client'

import Image from "next/image";
import logo from '../../app/public/images/toolshed_logo.png';
import './footer.css';

const Footer = () => {
  return (
    <>
    <footer>
    <div className='footer' role='Footer' aria-label='Footer'>
       <div className='column-one'>
          <Image src={logo} alt="toolshed logo" width={100} height={100}></Image>
          <p className='footer-content'>Subscribe to our newsletter</p>
          <form method="post" className="footer-form">
            <label htmlFor="newsletter-input" className="sr-only">Subscribe to our newsletter</label>
            <input type="email" placeholder={"Enter your email"} style={{height: '40px'}} id="newsletter-input" aria-hidden={true}/>
          </form>
       </div>
       <div className='column-two'>
          <p className='footer-title'> Contact</p>
          <p className='footer-content'> The Tool Shed 1255 University Ave, C010 (Lower Level) Rochester, NY 14607</p>
          <p className='footer-content'> Email: toolshed@seacrochester.org</p>
          <p className='footer-content'> Phone: 585-271-8665</p>
       </div>
       <div className='column-three'>
          <p className='footer-title'>Pickup Hours</p>
          <p className='footer-content'> Monday: Closed </p>
          <p className='footer-content'> Tuesday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Wednesday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Thursday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Friday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Saturday: 10:00 AM to 2:00PM</p>
          <p className='footer-content'> Sunday: Closed</p>
       </div>
       <div className='column-four'>
          <p className='footer-title'> Account</p>
          <p className='footer-content'> My Account</p>
          <p className='footer-content'> Login/Register</p>
          <p className='footer-content'> Cart</p>
       </div>
       <div className='column-five'>
          <p className='footer-title'> Quick Links</p>
          <p className='footer-content'> Privacy Policy</p>
          <p className='footer-content'> Terms of Use</p>
          <p className='footer-content'> FAQ</p>
       </div>
    </div>
    <div className='footer-end'>
      <p className='footer-content' style={{textAlign: "center"}}>&copy; 2024  SEAC Tool Shed</p>
    </div>
    <hr/>
    </footer>
    </>
  )
}

export default Footer
