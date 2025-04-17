import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import nav_logo from '../../assets/nav-logo.png';
import { FaUserCog } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left navigation links */}
      <div className="navbar-left">
        <ul className="nav-links">
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/currentevents'>Current Events</Link></li>
        </ul>
      </div>
      
      {/* Centered logo */}
      <div className="navbar-logo">
          <img src={nav_logo} alt="Guardians Logo" className="logo-image" />
      </div>
      
      {/* Right navigation links */}
      <div className="navbar-right">
        <ul className="nav-links">
          <li><Link to='/dataanalysis'>Data Analysis Tool</Link></li>
          <li><Link to='/news'>News Feed</Link></li>
        </ul>
        
        {/* User icon and login button */}
        <div className="navbar-controls">
          <div className="user-icon"><Link to = '/UserSettings'><FaUserCog size={20} /></Link></div>
          <button className="login-btn"><Link to='/login'>LOGIN</Link></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;