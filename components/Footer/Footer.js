'use client'

import './footer.css';

const Footer = () => {
  return (
    <>
    <div className='footer'>
       <div className='column-one'>
        <p className='footer-title'> Title</p>
        <p className='footer-content'> Content</p>
        <p className='footer-content'> Content</p>
        <p className='footer-content'> Content</p>
        <p className='footer-content'> Content</p>
       </div>
       <div className='column-two'>
        <p className='footer-title'> Title</p>
        <p className='footer-content'> Content</p>
        <p className='footer-content'> Content</p>
        <p className='footer-content'> Content</p>
        <p className='footer-content'> Content</p>
        <p className='footer-content'> Content</p>
       </div>
       <div className='column-three'>
        <p className='footer-title'>Title</p>
        <p className='footer-content'> Catalog </p>
        <p className='footer-content'> Catalog</p>
        <p className='footer-content'> Catalog</p>
        <p className='footer-content'> Catalog</p>
        <p className='footer-content'> Catalog</p>
        <p className='footer-content'> Catalog</p>
       </div>
       <div className='column-four'>
        <p className='footer-title'> Contact</p>
        <p className='footer-content'> contact.@email.com </p>
        <p className='footer-content'>222-222-2222  333-333-3333</p>
        <p className='footer-content'>123 Address Dr, Rochester, NY, 14623</p>
        <div className='footer-logo'>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
       </div>
    </div>
    <hr/>
    <div className='footer-end'>
      <p className='footer-content' style={{marginTop: '15px'}}>2023  SEAC Tool Shed</p>
      <p className='footer-content' style={{marginTop: '15px'}}>Powered by </p>
    </div>
    </>
  )
}

export default Footer
