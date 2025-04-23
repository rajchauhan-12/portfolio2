import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Car Rental Platform",
    description: "A full-stack car rental application with real-time availability checking, booking system, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/rajchauhan-12/CarRental-",
    live: "https://rajchauhan-12.github.io/CarRental-/",
    image: "/carrental.png"
  },
  {
    title: "Tutor Finder App",
    description: "An educational platform connecting students with tutors based on subjects, locations, and availability.",
    technologies: ["React", "Firebase", "Google Maps API"],
    github: "https://github.com/rajchauhan-12/tutor_finder",
    live: "#",
    image: "/tutorfinder.png"
  },
  {
    title: "AAI Trip Planner",
    description: "AI-powered travel assistant that creates optimized itineraries based on user preferences and constraints.",
    technologies: ["Python", "Flask", "React", "OpenAI API"],
    github: "https://github.com/rajchauhan-12/Ai_Trip_Planner",
    live: "#",
    image: "/trip-planner.png"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="section-header">
        <h2>My Projects</h2>
        <p>Here are some of my recent works</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>
              
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <span>Code</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <span>Live Demo</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;