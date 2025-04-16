import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/nav-logo.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={footer_logo} alt="The Commonwealth" className="footer-logo" />
      </div>
      <div className="footer-links">
        <ul>
          <li>Accounts and internal reports</li>
          <li>Cookie policy</li>
          <li>Cookie settings</li>
          <li>Privacy</li>
        </ul>
        <ul>
          <li>Terms & Conditions</li>
          <li>Work with us</li>
          <li>Contact us</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer