import React from 'react';
import { motion } from 'framer-motion';

const VideoCV = () => {
  return (
    <section id="video-cv" className="video-cv-section">
      <div className="video-cv-container">
        <div className="video-cv-content">
          <h2>My Video CV</h2>
          <p>Watch my professional introduction to learn more about my skills and experience</p>
          <a 
            href="/assets/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cv-download-button"
          >
            Download Full CV
          </a>
        </div>
        
        <div className="video-player-wrapper">
          <div className="video-player">
            <video width="100%" height="100%" controls>
              <source src="/assets/videocv.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCV;
