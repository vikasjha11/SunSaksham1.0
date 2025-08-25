import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: "🗣",
      title: "Real-Time Audio → ISL",
      description:
        "Spoken words instantly converted into 3D animated avatars performing ISL with emotional accuracy.",
      details: ["Multiple language support", "3D avatar animation", "Emotion recognition"],
    },
    {
      icon: "👋",
      title: "Sign Language → Voice/Text",
      description:
        "Camera captures ISL gestures and converts them into clear speech and text for seamless communication.",
      details: ["Real-time gesture recognition", "Voice synthesis", "Text output"],
    },
    {
      icon: "📢",
      title: "Public Space Integration",
      description:
        "Transform public announcements in railways, airports, and hospitals into accessible ISL displays.",
      details: [
        "Railway announcements",
        "Airport notifications",
        "Hospital communications",
        "Government services",
      ],
    },
    {
      icon: "🎓",
      title: "Educational & Community",
      description: "Interactive learning platform with gamified ISL lessons.",
    },
    {
      icon: "🚨",
      title: "Emergency SOS",
      description: "One-tap emergency alerts with live location tracking.",
    },
    {
      icon: "♿",
      title: "Accessibility First",
      description: "Large icons and intuitive design crafted for accessibility needs.",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="text-center mb-14">
        <h2 className="section-title">
          Powerful{" "}
          <span className="bg-connection-gradient bg-clip-text text-transparent">
            Features
          </span>
        </h2>
        <p className="section-subtitle">
          Comprehensive tools designed to bridge communication gaps and create
          an inclusive world for everyone.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.details && (
              <ul className="feature-details">
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