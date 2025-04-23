// import React from 'react';
// import { motion } from 'framer-motion';

// const Home = () => {
//   return (
//     <section id="home" className="home-section">
//       <div className="home-content">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hero-text"
//         >
//           <h1 className="hero-title">
//             Hi, I'm <span className="name-highlight">Raj Chauhan</span>
//           </h1>
//           <h2 className="hero-subtitle">
//             Full Stack Developer & Problem Solver
//           </h2>
//           <p className="hero-description">
//             I create exceptional digital experiences with clean, efficient code
//             and thoughtful user interfaces.
//           </p>
//         </motion.div>
        
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="hero-cta"
//         >
//           <a href="#portfolio" className="cta-button">
//             View My Work
//           </a>
//           <a href="#contact" className="cta-button secondary">
//             Contact Me
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import developerGif from '../assets/developer.gif'; // Import your GIF file

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        {/* Left side - Text content */}
        <div className="hero-text-container">
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

        {/* Right side - GIF animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-gif-container"
        >
          <img 
            src={developerGif} 
            alt="Developer working animation" 
            className="developer-gif"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="floating-circle"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;