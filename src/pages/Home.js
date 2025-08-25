// src/pages/HomePage.js
import React from 'react';
import Header from '../Components/Header';
import './Home.css'; // Create this for custom homepage styles
import Features from '../Components/Features';
import Impact from '../Components/Impact';
import Footer from '../Components/Footer';

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
            <a href="/avatar" className="btn btn-primary">Try Live Translation</a>
            <a href="/learn" className="btn btn-secondary">Learn ISL</a>
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