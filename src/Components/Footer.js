import React from 'react';
import './Footer.css'; // Assuming a CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="logo-icon-wrapper">S</span>
        <span>SunSakhsham Live</span>
        <p>Breaking communication barriers through real-time ISL translation technology.</p>
      </div>
      <div className="footer-links">
        <div>
          <h4>Product</h4>
          <a href="/features">Features</a>
          <a href="/pricing">Pricing</a>
          <a href="/demo">Demo</a>
          <a href="/api">API</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="/help">Help Center</a>
          <a href="/community">Community</a>
          <a href="/contact">Contact</a>
          <a href="/accessibility">Accessibility</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/mission">Mission</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
