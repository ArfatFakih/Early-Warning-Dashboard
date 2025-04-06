import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">EARLY WARNING</div>
      <ul className="navbar-links">
        <li><Link style={{ textDecoration: 'none'}} to='/home'>Home</Link></li>
        <li>Current Events</li>
        <li>Data Analysis Tool</li>
        <li>News Feed</li>
        <li>User Settings</li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-btn"><Link style={{ textDecoration: 'none'}} to='/login'>LOGIN</Link></button>
        <button className="signup-btn"><Link style={{ textDecoration: 'none'}} to='/'>Sign UP</Link></button>
      </div>
    </nav>
  )
}

export default Navbar