import React from 'react';
import './Impact.css'; // Assuming a CSS file for styling

function Impact() {
  return (
    <section className="impact-section py-20 bg-background" id="impact">
      <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
        Creating <span className="bg-hero-gradient bg-clip-text text-transparent">Real Impact</span>
      </h2>
      <div className="impact-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="impact-card">
          <div className="impact-icon">🎓</div>
          <h3>Education</h3>
          <p>Teachers in inclusive classrooms communicate without errors, ensuring every student gets equal learning opportunities.</p>
          <span className="impact-stat highlight-blue">10M+ students</span>
        </div>
        <div className="impact-card">
          <div className="impact-icon">🏥</div>
          <h3>Public Services</h3>
          <p>Railways, hospitals, and government services become fully accessible to the deaf and hard-of-hearing community.</p>
          <span className="impact-stat highlight-blue">5000+ locations</span>
        </div>
        <div className="impact-card">
          <div className="impact-icon">🏢</div>
          <h3>Workplace</h3>
          <p>Corporates foster true inclusivity and equal opportunities, creating diverse and productive work environments.</p>
          <span className="impact-stat highlight-blue">1000+ companies</span>
        </div>
        <div className="impact-card">
          <div className="impact-icon">❤️</div>
          <h3>Community</h3>
          <p>Building emotional connections, safety, and empowerment for deaf individuals through technology and support.</p>
          <span className="impact-stat highlight-blue">50K+ users</span>
        </div>
      </div>
    </section>
  );
}

export default Impact;
