import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Special case for home section (top of page)
      if (scrollPosition < 100) {
        setActiveSection('home');
        window.history.replaceState(null, '', '#home');
        return;
      }

      const sections = ['about', 'skills', 'portfolio', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            window.history.replaceState(null, '', `#${section}`);
            break;
          }
        }
      }
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Work' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-bracket">{"</"}</span>
          <span className="logo-name">Raj</span>
          <span className="logo-bracket">{">"}</span>
        </div>
        
        <nav className="nav">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  className="nav-underline"
                  layoutId="nav-underline"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;