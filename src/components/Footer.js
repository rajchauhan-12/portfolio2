import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="footer-content"
        >
          <div className="footer-logo">
            <span>{"</Raj Chauhan>"}</span>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#portfolio">Work</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com">
              Email
            </a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Raj Chauhan. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;