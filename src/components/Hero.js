import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <h1 className="hero-title">
            Hi, I'm <span className="name-highlight">Raj Chauhan</span>
          </h1>
          <h2 className="hero-subtitle">
            Full Stack Developer & Problem Solver
          </h2>
          <p className="hero-description">
            I create exceptional digital experiences with clean, efficient code
            and thoughtful user interfaces.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hero-cta"
        >
          <a href="#portfolio" className="cta-button">
            View My Work
          </a>
          <a href="#contact" className="cta-button secondary">
            Contact Me
          </a>
        </motion.div>
      </div>
      
      <div className="scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="scroll-icon"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;