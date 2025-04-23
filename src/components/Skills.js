// components/Skills.js
import React from 'react';

const Skills = () => {
  const skills = [
    'JavaScript (ES6+)', 'React.js', 'Node.js', 'Express', 'MongoDB',
    'HTML5 & CSS3', 'RESTful APIs', 'Git & GitHub', 'Responsive Design',
    'Python', 'SQL', 'AWS Basics'
  ];

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">{skill}</div>
        ))}
      </div>
    </section>
  );
};

export default Skills;