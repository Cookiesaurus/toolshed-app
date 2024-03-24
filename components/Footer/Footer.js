'use client'

import Image from "next/image";
import logo from '../../app/public/images/toolshed_logo.png';
import './footer.css';
import { formHandler } from "@/lib/actions/formHandler";

const Footer = () => {
  return (
    <>
    <footer>
    <div className='footer' role='Footer' aria-label='Footer'>
       <div className='columns'>
          <Image src={logo} alt="toolshed logo" width={100} height={100}></Image>
          <a className='footer-hyperlink' href="">Subscribe to our newsletter</a>
          
       </div>
       <div className='columns'>
          <p className='footer-title'>Contact Us</p>
          <p className="footer-content">Address: <br/><a className="footer-hyperlink" href="http://maps.google.com/?q=Lower Level, 1255 University Ave, Rochester, NY 14607">The Tool Shed 1255 University Ave <br/> C010 (Lower Level) <br/>Rochester, NY 14607</a></p>
          <p className='footer-content'><a className="footer-hyperlink" href="https://www.google.com/maps/dir/?api=1&destination=Lower Level, 1255 University Ave, Rochester, NY 14607">Get Directions</a></p>
          <p className='footer-content'>Email: <a className="footer-hyperlink" href="">toolshed@seacrochester.org</a></p>
          <p className='footer-content'>Phone: <a className="footer-hyperlink" href="">585-271-8665</a></p>
       </div>
       <div className='columns'>
          <p className='footer-title'>Pickup Hours</p>
          <p className='footer-content'> Monday: Closed </p>
          <p className='footer-content'> Tuesday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Wednesday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Thursday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Friday: 3:00 PM to 7:00PM</p>
          <p className='footer-content'> Saturday: 10:00 AM to 2:00PM</p>
          <p className='footer-content'> Sunday: Closed</p>
       </div>
       <div className='columns'>
          <p className='footer-title'> Quick Links</p>
          <a className='footer-hyperlink' href="">Privacy Policy</a>
          <a className='footer-hyperlink' href="">Terms of Use</a>
          <a className='footer-hyperlink' href="">FAQ</a>
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
