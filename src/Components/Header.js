import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <div className="logo-icon-wrapper">
          <span role="img" aria-label="logo">S</span>
        </div>
        <span>SunSakhsham Live</span>
        <span className="subtitle">Real-time ISL Translation</span>
      </div>
      <nav className="navbar">
        <a href="/translate">Translate</a>
        <a href="/learn">Learn</a>
        <a href="/community">Community</a>
        <a href="/dashboard">Dashboard</a>
      </nav>
      <div className="nav-actions">
        <a href="/dashboard" className="nav-login">Dashboard</a>
        <a href="/get-started" className="btn btn-primary">Get Started</a>
      </div>
    </header>
  );
}

export default Header;
