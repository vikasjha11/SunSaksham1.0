import React from 'react';
import './Header.css';

function Header() {
  const scrollToFeatures = (e) => {
    e.preventDefault(); // stop page reload
    const section = document.getElementById("features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header-wrapper">
      <header className="site-header">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon-wrapper" aria-label="logo" role="img">
            S
          </div>
          <div className="logo-text">
            <span className="brand-name">SunSakhsham Live</span>
            <span className="subtitle">Real-time ISL Translation</span>
          </div>
        </div>

        {/* Curved rectangle container for tagline */}
        <div className="tagline-container">
          <p className="tagline-text">
            No voice left unheard, no signs left unseen
          </p>
        </div>

        {/* Navigation */}
        <nav
          className="navbar"
          style={{
            background: "rgba(243,244,246,0.95)",
            borderRadius: "18px",
            padding: "10px 28px",
            boxShadow: "0 2px 12px rgba(99,102,241,0.08)",
            display: "flex",
            gap: "18px",
            alignItems: "center"
          }}
        >
          <a href="#features" onClick={scrollToFeatures}>Features</a>
          <a
            href="#chatbot"
            className="chatbot-highlight"
            style={{
              background: "linear-gradient(90deg, #6366f1, #a78bfa, #f472b6)",
              color: "#fff",
              padding: "8px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(99,102,241,0.15)",
              animation: "bounce 2s infinite",
            }}
          >
            🚀 Try Our Chatbot
          </a>
        </nav>

        <div className="nav-actions"></div>
      </header>
    </div>
  );
}

export default Header;