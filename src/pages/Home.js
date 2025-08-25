// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Features from '../Components/Features';
import Impact from '../Components/Impact';
import Footer from '../Components/Footer';
import './Home.css';

function Home() {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <h1>
            Breaking <span className="highlight">Communication</span> Barriers
          </h1>
          <p className="hero-pitchline">
            Real-time translation between spoken language and Indian Sign Language.<br />
            <span className="highlight-blue">Every voice heard, every sign understood.</span>
          </p>
          <div className="hero-buttons">
            <Link to="/avatar" className="btn btn-primary">Try Live Translation</Link>
            <Link to="/learn-sign" className="btn btn-secondary">Learn ISL</Link>
          </div>
        </section>
        <Features />
        <Impact />
      </main>
      <Footer />
    </div>
  );
}

export default Home;