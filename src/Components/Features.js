import React from 'react';
import { motion } from 'framer-motion';
import './Features.css'; // Assuming a CSS file for styling

const Features = () => {
  const features = [
    { icon: "🗣", title: "Real-Time Audio → ISL", description: "Spoken words instantly converted into 3D animated avatars performing ISL with emotional accuracy.", details: ["Multiple language support", "3D avatar animation", "Emotion recognition"] },
    { icon: "👋", title: "Sign Language → Voice/Text", description: "Camera captures ISL gestures and converts them into clear speech and text for seamless communication.", details: ["Real-time gesture recognition", "Voice synthesis", "Text output"] },
    { icon: "📢", title: "Public Space Integration", description: "Transform public announcements in railways, airports, and hospitals into accessible ISL displays.", details: ["Railway announcements", "Airport notifications", "Hospital communications", "Government services"] },
    { icon: "🎓", title: "Educational & Community", description: "Interactive learning platform with gamified ISL lessons." },
    { icon: "🚨", title: "Emergency SOS", description: "One-tap emergency alerts with live location tracking." },
    { icon: "♿", title: "Accessibility First", description: "Large icons and intuitive design crafted for accessibility needs." },
  ];

  return (
    <section className="features-section py-20 bg-feature-gradient" id="features">
      <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
        Powerful <span className="bg-connection-gradient bg-clip-text text-transparent">Features</span>
      </h2>
      <p className="section-subtitle mb-8">
        Comprehensive tools designed to bridge communication gaps and create an inclusive world for everyone.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div key={index} className="feature-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.details && (
              <ul className="feature-details list-disc list-inside mt-2">
                {feature.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
