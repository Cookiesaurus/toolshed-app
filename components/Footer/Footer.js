'use client'

import Image from "next/image";
import logo from '../../app/public/images/toolshed_logo.png';

const Footer = () => {
  return (
    <>
    <footer>
    <div className='footer' role='Footer' aria-label='Footer'>
       <div className='columns'>
          <Image src={logo} alt="toolshed logo" width={100} height={100}></Image>
          <a className='footer-hyperlink' href="https://seacrochester.us7.list-manage.com/subscribe?u=4e6323076979fa4ccfd3482b1&id=d27b6d7269&fbclid=IwAR3A2RKlb1YPaRhrbdtjL1_qkUKhrKMnAgwLbN0iWyiwe3N8fav4Mlqpkqk">Subscribe to our newsletter</a>
          
       </div>
       <div className='columns'>
          <p className='footer-title'>Contact Us</p>
          <p className="footer-content">Address: <br/><a className="footer-hyperlink" href="http://maps.google.com/?q=Lower Level, 1255 University Ave, Rochester, NY 14607">The Tool Shed 1255 University Ave <br/> C010 (Lower Level) <br/>Rochester, NY 14607</a></p>
          <p className='footer-content'><a className="footer-hyperlink" href="https://www.google.com/maps/dir/?api=1&destination=Lower Level, 1255 University Ave, Rochester, NY 14607">Get Directions</a></p>
          <p className='footer-content'>Email: <a className="footer-hyperlink" href="mailto:toolshed@seacrochester.org">toolshed@seacrochester.org</a></p>
          <p className='footer-content'>Phone: <a className="footer-hyperlink" href="tel:5852718665">585-271-TOOL (8665)</a></p>
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
          <a className='footer-hyperlink' href="https://seactoolshed.org/tool-renting-rules/">Tool Renting Rules</a>
          <a className='footer-hyperlink' href="https://seactoolshed.org/community-project-tool-reservation/">Community Project Tool Reservation</a>
          <a className="footer-hyperlink" href="https://www.flipcause.com/secure/cause_pdetails/MTEzODM2">Monetary Donations</a>
          <a className="footer-hyperlink" href="https://seactoolshed.org/tool-donations/">Donate a tool</a>
          <a className="footer-hyperlink" href="https://seactoolshed.org/wishlist/">Tool Wishlist</a>
          <a className='footer-hyperlink' href="https://seactoolshed.org/faq/">FAQ</a>
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
