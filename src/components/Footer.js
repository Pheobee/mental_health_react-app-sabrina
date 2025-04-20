import React from 'react';
import '../css/Footer.css';
import { Link } from 'react-router-dom';
import link1 from '../img/instagram.png'
import link2 from '../img/twitter (1).png'
import link3 from '../img/facebook-app-symbol.png'
import link4 from '../img/telegram.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-divs">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className='socialMediaLinks'>
          <img src={link1} alt="pic"></img>
           <img src={link2}></img>
           <img src={link3}></img>
           <img src={link4}></img>
        </div>
      </div>
      
      <p>&copy; 2024 Uplift. All rights reserved.</p>
    </footer>
  );
};

export default Footer;