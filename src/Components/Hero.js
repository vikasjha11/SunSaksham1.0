import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css'; // Assuming a CSS file for styling

const Hero = () => {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center bg-feature-gradient overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
          Communicate with Confidence
        </h1>
        <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
          Your bridge to a world of conversation. Master sign language with our revolutionary 3D avatar and real-time feedback.
        </p>
        <div className="hero-buttons">
          <Link to="/browse">
            <motion.button whileHover={{ scale: 1.05 }} className="btn btn-primary">
              Start Learning Free
            </motion.button>
          </Link>
          <motion.button whileHover={{ scale: 1.05 }} className="btn btn-secondary">
            How it Works
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
