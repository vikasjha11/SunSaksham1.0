// src/pages/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlay, FiUsers } from 'react-icons/fi';
import { FaArrowRight, FaHandSparkles, FaQuoteLeft, FaRegSmile } from 'react-icons/fa';
import { BsCameraVideoFill } from 'react-icons/bs';
import { VscBook } from 'react-icons/vsc';
import { IoIosMegaphone } from "react-icons/io";
import { MdSos } from "react-icons/md";
import { RiTranslate2 } from "react-icons/ri";
import '../App.css';
import Header from '../Components/Header';
import Features from '../Components/Features';
import Impact from '../Components/Impact';
import Footer from '../Components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CoreFeaturesSection />
        <TestimonialsSection />
      </main>
      <CtaSection />
      <Footer />
    </>
  );
};

// --- Child Components ---

const SloganBanner = () => {
  return ( <motion.div className="slogan-banner" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} > <span className="slogan-badge">DEAF 2.0</span> Where Silence Meets Innovation. </motion.div> );
}

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="navbar"
    >
      <Link to="/" className="logo">
        <div className="logo-icon-wrapper">
          <FaHandSparkles style={{ color: '#2563eb', fontSize: '1.25rem' }} />
        </div>
        <span>Deaf Learning</span>
      </Link>
      <div className="nav-links">
        <a href="#features">Features</a>
        <Link to="/avatar">Avatar</Link>
        <a href="#community">Community</a>
        <Link to="/browse">Courses</Link>
      </div>
      <Link to="/browse" className="nav-login">
        Explore
      </Link>
    </motion.nav>
  );
};

const HeroSection = () => {
  return (
    <section id="avatar" className="hero-section content-wrapper">
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }} initial="hidden" animate="visible" className="hero-content">
        <motion.h1 variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } }}>Communicate with Confidence</motion.h1>
        <motion.p variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } }} className="hero-pitchline">Your bridge to a world of conversation. Master sign language with our revolutionary 3D avatar and real-time feedback.</motion.p>
        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } }} className="hero-buttons">
          <Link to="/browse" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="btn btn-primary">
              Start Learning Free <FaArrowRight style={{ marginLeft: '8px' }} />
            </motion.button>
          </Link>
          <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="btn btn-secondary">How it Works</motion.button>
        </motion.div>
      </motion.div>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }} className="hero-avatar">
        <div className="avatar-bg-glow"></div>
        <motion.img src="/images/avatar.png" alt="3D Avatar" className="avatar-image" animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
    </section>
  );
};
const FeaturesSection = () => {
  const featureData = [{ icon: <FiPlay />, title: "Immersive Lessons" }, { icon: <FaHandSparkles />, title: "Guided Practice" }, { icon: <FiUsers />, title: "Global Community" },];
  return (<section id="features" className="features-section content-wrapper"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.2 }} className="features-grid">{featureData.map((feature, index) => (<FeatureCard key={index} icon={feature.icon} title={feature.title} />))}</motion.div></section>);
};
const FeatureCard = ({ icon, title }) => {
  const cardVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };
  return (<motion.div variants={cardVariants} className="feature-card"><div className="feature-card-icon">{icon}</div><h3>{title}</h3></motion.div>);
};
const HowItWorksSection = () => {
  const steps = [{ icon: <BsCameraVideoFill />, title: 'Instant Motion Feedback', description: 'Our smart technology analyzes your signs through your camera, guiding you to perfection like a personal tutor.', }, { icon: <VscBook />, title: 'Personalized Learning Path', description: 'From your first sign to complex conversations, follow a curriculum that adapts to your unique pace and style.', }, { icon: <FiUsers />, title: 'Connect & Converse', description: 'Join a thriving global community. Practice your skills, make new friends, and immerse yourself in the culture.', },];
  return (<section className="how-it-works-section content-wrapper"><h2 className="section-title">Experience the Future of Communication</h2><motion.div className="how-it-works-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.2 }}>{steps.map((step, index) => (<motion.div key={index} className="how-it-works-card" variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}><div className="how-it-works-icon">{step.icon}</div><h3>{step.title}</h3><p>{step.description}</p></motion.div>))}</motion.div></section>);
};
const CoreFeaturesSection = () => {
  const leftFeatures = [{ icon: <RiTranslate2 />, title: 'Voice & Text to ISL', description: 'Instantly translate spoken words or text into accurate Indian Sign Language.' }, { icon: <FaRegSmile />, title: 'Vocal Emotion Cues', description: 'Understand the full picture. Our system detects and displays vocal emotions for richer context.' }];
  const rightFeatures = [{ icon: <MdSos />, title: 'One-Tap Emergency SOS', description: 'In critical situations, instantly alert emergency contacts with your precise location.' }, { icon: <IoIosMegaphone />, title: 'Public Alert System', description: 'Stay informed and safe by receiving crucial public announcements visually on your device.' }];
  return (<section className="core-features-section"><div className="core-features-content content-wrapper"><h2 className="section-title">Technology That Truly Connects</h2><p className="section-subtitle-dark">We build tools not just for learning, but for living.</p><div className="core-features-grid"><motion.div className="features-column" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.2 }}>{leftFeatures.map((feature, index) => (<motion.div key={index} className="feature-item" ><div className="feature-item-icon">{feature.icon}</div><div><h4>{feature.title}</h4><p>{feature.description}</p></div></motion.div>))}</motion.div><motion.div className="features-center-image" initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}><div className="phone-glow"></div><img src="/images/mockup.png" alt="App Feature Mockup" /></motion.div><motion.div className="features-column" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.2 }}>{rightFeatures.map((feature, index) => (<motion.div key={index} className="feature-item-right"><div><h4>{feature.title}</h4><p>{feature.description}</p></div><div className="feature-item-icon">{feature.icon}</div></motion.div>))}</motion.div></div></div></section>);
};
const TestimonialsSection = () => {
  const testimonials = [{ name: 'Priya Sharma', quote: "The live feedback is a game-changer! It's like having a personal tutor 24/7. I finally feel confident in my signing.", }, { name: 'Alex Chen', quote: "I was always lost trying to learn from videos. Deaf 2.0 provides a clear, structured path that actually makes sense.", }, { name: 'Ben Carter', quote: "The community is the best part. Practicing with others from around the world has been incredibly motivating and fun.", },];
  return (<section id="community" className="testimonials-section content-wrapper"><h2 className="section-title">Join Our Thriving Community</h2><div className="testimonials-grid">{testimonials.map((testimonial, index) => (<motion.div key={index} className="testimonial-card" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}><FaQuoteLeft className="testimonial-quote-icon" /><p className="testimonial-quote">{testimonial.quote}</p><p className="testimonial-name">- {testimonial.name}</p></motion.div>))}</div></section>);
};
const CtaSection = () => {
  return (<section className="cta-section"><div className="cta-content content-wrapper"><h2>Ready to Bridge the Gap?</h2><p>Your journey into the world of sign language starts here. No credit card required. Get instant access to our core features for free.</p><Link to="/browse" style={{ textDecoration: 'none' }}><motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="btn btn-primary cta-button">Start for Free Now</motion.button></Link></div></section>);
};


export default HomePage;