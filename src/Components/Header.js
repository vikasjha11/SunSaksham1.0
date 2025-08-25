import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header-wrapper">
      <header className="site-header">
        <div className="logo">
          <div className="logo-icon-wrapper" aria-label="logo" role="img">
            S
          </div>
          <div className="logo-text">
            <span className="brand-name">SunSakhsham Live</span>
            <span className="subtitle">Real-time ISL Translation</span>
          </div>
        </div>
        <nav className="navbar">
          <a href="/features">Features</a>
          <a href="/community">Community</a>
          <a href="/avatar">Avatar</a>
        </nav>
        <div className="nav-actions">
          {/* Remove any login button or link like this: */}
          {/* <Link to="/login" className="nav-link">Login</Link> */}
        </div>
      </header>
    </div>
  );
}

export default Header;