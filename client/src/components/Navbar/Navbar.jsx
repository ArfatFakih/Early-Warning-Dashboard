import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import guardians_image from '../../assets/guardians_logo.png';
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
        <Link to="/">
          <img src={guardians_image} alt="Guardians Logo" className="logo-image" />
        </Link>
      </div>
      
      {/* Right navigation links */}
      <div className="navbar-right">
        <ul className="nav-links">
          <li><Link to='/dataanalysis'>Data Analysis Tool</Link></li>
          <li><Link to='/news'>News Feed</Link></li>
        </ul>
        
        {/* User icon and login button */}
        <div className="navbar-controls">
          <div className="user-icon"><FaUserCog size={20} /></div>
          <button className="login-btn"><Link to='/login'>LOGIN</Link></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;