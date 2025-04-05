import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">EARLY WARNING</div>
      <ul className="navbar-links">
        <li><Link style={{ textDecoration: 'none'}} to='/'>Home</Link></li>
        <li>About</li>
        <li>Teams</li>
        <li>Content</li>
        <li>My Profile</li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-btn"><Link style={{ textDecoration: 'none'}} to='/login'>LOGIN</Link></button>
        <button className="signup-btn"><Link style={{ textDecoration: 'none'}} to='/signup'>Sign UP</Link></button>
      </div>
    </nav>
  )
}

export default Navbar