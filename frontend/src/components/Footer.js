import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CarRent</h3>
            <p>Your trusted partner for car rental services worldwide.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/search">Search Cars</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@carrent.com</p>
            <p>Phone: +1 (800) CAR-RENT</p>
            <p>Address: 123 Main St, City, State 12345</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CarRent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
