import jsPDF from 'jspdf';

export const downloadSimplePDF = () => {
  const pdf = new jsPDF();
  
  // Header
  pdf.setFontSize(20);
  pdf.setTextColor(108, 99, 255);
  pdf.text('SANDEEPA PERERA', 105, 20, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Frontend Developer | React Specialist', 105, 30, { align: 'center' });
  
  // Contact Info
  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Contact Information:', 20, 50);
  pdf.text('📍 Colombo, Sri Lanka', 30, 60);
  pdf.text('📧 sandeepa.perera@example.com', 30, 70);
  pdf.text('📱 +94 77 123 4567', 30, 80);
  pdf.text('🔗 linkedin.com/in/sandeepa', 30, 90);
  
  // Summary
  pdf.text('Professional Summary:', 20, 110);
  pdf.setFontSize(10);
  pdf.text('Passionate Frontend Developer with 3+ years of experience building responsive', 30, 120);
  pdf.text('web applications using modern technologies. Specialized in React.js, JavaScript,', 30, 127);
  pdf.text('and creating exceptional user experiences. Completed 25+ projects for 15+ clients.', 30, 134);
  
  // Technical Skills
  pdf.setFontSize(11);
  pdf.text('Technical Skills:', 20, 150);
  
  pdf.setFontSize(10);
  const skills = [
    'Frontend: React.js, JavaScript, TypeScript, HTML5, CSS3, SASS, Tailwind',
    'Tools: Git, Webpack, VS Code, Figma, Chrome DevTools, Jest',
    'Backend: Node.js, Express.js, MongoDB, Firebase, MySQL',
    'Other: REST APIs, Responsive Design, Performance Optimization'
  ];
  
  skills.forEach((skill, index) => {
    pdf.text(skill, 30, 160 + (index * 7));
  });
  
  // Experience
  pdf.setFontSize(11);
  pdf.text('Professional Experience:', 20, 190);
  
  pdf.setFontSize(10);
  const experiences = [
    'Frontend Developer (Freelance) | 2021 - Present',
    '- Built 25+ responsive web applications for various clients',
    '- Developed e-commerce platforms, dashboards, and portfolio websites',
    '- Collaborated with designers to implement pixel-perfect UIs',
    '',
    'Web Development Intern | Tech Startup Colombo | 2020 - 2021',
    '- Assisted in developing and maintaining company websites',
    '- Implemented responsive designs and optimized performance',
    '- Participated in code reviews and team meetings'
  ];
  
  experiences.forEach((exp, index) => {
    pdf.text(exp, 30, 200 + (index * 7));
  });
  
  // Education
  pdf.setFontSize(11);
  pdf.text('Education:', 20, 260);
  
  pdf.setFontSize(10);
  pdf.text('BSc in Computer Science | University of Colombo | 2016 - 2020', 30, 270);
  pdf.text('GPA: 3.8/4.0 | Relevant Coursework: Web Development, Algorithms, Databases', 30, 277);
  
  // Projects
  pdf.setFontSize(11);
  pdf.text('Notable Projects:', 20, 295);
  
  pdf.setFontSize(10);
  const projects = [
    'E-Commerce Platform: Full-stack solution with React, Node.js, MongoDB',
    'Task Management App: Real-time collaboration with Firebase',
    'Portfolio Website: Advanced animations and responsive design'
  ];
  
  projects.forEach((project, index) => {
    pdf.text(`- ${project}`, 30, 305 + (index * 7));
  });
  
  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  pdf.text('Portfolio: sandeepa-portfolio.com | Last Updated: ' + new Date().toLocaleDateString(), 105, 290, { align: 'center' });
  
  // Save PDF
  pdf.save('Sandeepa_Perera_CV.pdf');
};