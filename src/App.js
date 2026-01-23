import React, { useState, useEffect, useRef } from 'react'; 
import './App.css'; 
import jsPDF from 'jspdf'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import emailjs from '@emailjs/browser';

// ==================== Loading Screen Component ==================== 
const LoadingScreen = ({ isLoading }) => { 
  if (!isLoading) return null; 

  return ( 
    <div className="loading-screen"> 
      <div className="loading-container"> 
        <div className="neon-spinner"></div> 
        <h2 className="loading-text">Initializing Portfolio</h2> 
        <div className="loading-progress"> 
          <div className="progress-bar"></div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

// ==================== Video Background Component ==================== 
const VideoBackground = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="video-background-container">
      {!videoError ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="portfolio-background-video"
          onError={() => setVideoError(true)}
        >
          <source src="/videos/PV1.mp4" type="video/mp4" />
          <source src="./videos/PV1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="video-fallback">
          <div className="fallback-animation"></div>
        </div>
      )}
      <div className="video-background-overlay"></div>
    </div>
  );
};

// ==================== Navigation Component ==================== 
const Navigation = ({ activeSection, isMenuOpen, onNavClick, onMenuToggle, onDownloadCV }) => { 
  
  const handleNavClick = (section, e) => {
    if (e) e.preventDefault();
    onNavClick(section);
    
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    
    if (window.innerWidth <= 768) {
      onMenuToggle();
    }
  };

  const handleLogoClick = () => {
    handleNavClick('home');
  };

  return ( 
    <nav className={`navbar ${isMenuOpen ? 'nav-open' : ''}`}> 
      <div className="nav-container"> 
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}> 
          <span className="logo-text">Mithila</span> 
          <span className="logo-dot"></span> 
        </div> 
        
        <div className="nav-toggle" onClick={onMenuToggle}> 
          <span className={`toggle-line ${isMenuOpen ? 'active' : ''}`}></span> 
          <span className={`toggle-line ${isMenuOpen ? 'active' : ''}`}></span> 
          <span className={`toggle-line ${isMenuOpen ? 'active' : ''}`}></span> 
        </div> 
        
        <ul className={`nav-menu ${isMenuOpen ? 'nav-open' : ''}`}> 
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => ( 
            <li key={section}> 
              <a 
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={(e) => handleNavClick(section, e)}
              > 
                <span className="link-text">{section.charAt(0).toUpperCase() + section.slice(1)}</span> 
                <span className="link-underline"></span> 
              </a> 
            </li> 
          ))} 
          
          <li className="nav-download">
           
          </li>
        </ul> 
      </div> 
    </nav> 
  ); 
}; 





























// ==================== Hero Section ==================== 
const HeroSection = ({ onDownloadCV }) => { 
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFirstNameComplete, setIsFirstNameComplete] = useState(false);
  
  const fullName = "Mithila Medhavi";
  const firstName = "Mithila";
  const lastName = "Medhavi";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 1500;

  useEffect(() => {
    let timer;
    
    if (!isFirstNameComplete) {
      if (currentIndex < firstName.length && !isDeleting) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev + firstName[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, typingSpeed);
      } else if (currentIndex === firstName.length && !isDeleting) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else if (isDeleting && currentIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        }, deletingSpeed);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setIsFirstNameComplete(true);
        setCurrentIndex(0);
      }
    } else {
      if (currentIndex < fullName.length && !isDeleting) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev + fullName[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, typingSpeed);
      } else if (currentIndex === fullName.length && !isDeleting) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration * 2);
      } else if (isDeleting && currentIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        }, deletingSpeed);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setIsFirstNameComplete(false);
        setCurrentIndex(0);
      }
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, isFirstNameComplete, firstName, fullName, typingSpeed, deletingSpeed, pauseDuration]);

  return ( 
    <section id="home" className="hero"> 
      <div className="hero-content"> 
        <div className="hero-text"> 
          <div className="greeting">Hello, I'm</div> 
          <h1 className="hero-title"> 
            <span className="title-main typing-text">
              {displayText}
              <span className="typing-cursor-main">|</span>
            </span>
          </h1> 
          <div className="hero-subtitle"> 
            <span className="subtitle-text">Software Engineer Undergraduate</span> 
          </div> 
         
          <div className="hero-buttons"> 
            <button className="btn btn-download" onClick={onDownloadCV}> 
              <span className="btn-icon">📥</span> 
              Download CV 
            </button> 
          </div> 
        </div> 
        <div className="hero-visual"> 
          <div className="profile-container"> 
            <div className="profile-card"> 
              <div className="profile-image"> 
                <div className="image-glow"></div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </section> 
  ); 
};






// ==================== About Section ==================== 
const AboutSection = ({ onDownloadCV }) => { 
  return ( 
    <section id="about" className="about"> 
      <div className="container"> 
        <div className="section-header"> 
          <h2 className="section-title"> 
            <span className="title-number"></span> 
            About Me 
          </h2> 
        </div> 
        <div className="about-content"> 
          <div className="about-text"> 
            <div className="about-intro"> 
              <h3>Software Engineering Undergraduate</h3> 
              <p> 
                <p>
  I am a <span className="highlight">dedicated third-year BSc (Hons) Software Engineering student</span>     
   at the Faculty of Computing, CinEC Campus, where I am cultivating both theoretical 
  understanding and practical development expertise. My academic progression is 
  strategically complemented by hands-on project implementation, allowing me to 
  transform conceptual knowledge into functional software solutions. I am actively 
  pursuing internship opportunities to further develop my professional competencies 
  and contribute to innovative software engineering initiatives within the industry.
</p>
              </p> 
            </div> 
            
            <div className="about-details"> 
              <div className="detail-item"> 
                <h4>🎯 Technical Focus</h4> 
                <p> Modern JavaScript, Responsive Web Design, Database Systems,UI/UX desing ,MobileDevelopment</p> 
              </div> 
              <div className="detail-item"> 
                <h4>💡 Development Approach</h4> 
                <p>Clean code practices, problem-solving mindset, agile methodologies, collaborative teamwork</p> 
              </div> 
              <div className="detail-item"> 
                <h4>🚀 Career Goal</h4> 
                <p>To contribute to innovative projects and grow as a professional software engineer</p> 
              </div> 
            </div> 
          </div> 
          
          <div className="about-visual"> 
            <div className="experience-card"> 
              <div className="card-header"> 
                <h3>Education & Experience</h3> 
              </div> 
              <div className="card-content"> 
                <div className="timeline"> 
                  {/* Updated Timeline for Fresh Graduate */}
                  <div className="timeline-item"> 
                    <div className="timeline-year">2024</div> 
                    <div className="timeline-content"> 
                      <h4>BSc (Hons) Computer Science</h4> 
                      <p>University of Colombo | GPA: 3.5/4.0</p>
                      <p className="timeline-note">Specialized in Software Engineering</p>
                    </div> 
                  </div> 
                  
                  <div className="timeline-item"> 
                    <div className="timeline-year">2023</div> 
                    <div className="timeline-content"> 
                      <h4>Final Year Project</h4> 
                      <p>"Smart Campus Management System"</p>
                      <p className="timeline-note">Full-stack web application</p>
                    </div> 
                  </div> 
                  
                  <div className="timeline-item"> 
                    <div className="timeline-year">2022</div> 
                    <div className="timeline-content"> 
                      <h4>Software Development Intern</h4> 
                      <p>Tech Solutions Lanka (3 months)</p>
                      <p className="timeline-note">Worked on frontend development</p>
                    </div> 
                  </div> 
                  
                  <div className="timeline-item"> 
                    <div className="timeline-year">2020 - 2024</div> 
                    <div className="timeline-content"> 
                      <h4>University Activities</h4> 
                      <p>Computer Society Member</p>
                      <p className="timeline-note">Hackathon participant, Tech workshops</p>
                    </div> 
                  </div> 
                </div> 
              </div> 
              
              {/* New: Achievement/Highlight Section */}
            
            </div> 
          </div> 
        </div> 
        
     
      </div> 
    </section>
  );
}; 











// ==================== Skills Section ==================== 
const SkillsSection = () => { 
  const skills = [ 
    { id: 1, name: "HTML", image: "/icons/html.png", color: "#e34f26" }, 
    { id: 2, name: "CSS", image: "/icons/css.png", color: "#1572b6" }, 
    { id: 3, name: "JavaScript", image: "/icons/js.png", color: "#f7df1e" }, 
    { id: 4, name: "React", image: "/icons/react.png", color: "#61dafb" }, 
    { id: 5, name: "Node.js", image: "/icons/node.png", color: "#339933" }, 
    { id: 6, name: "Python", image: "/icons/python.png", color: "#3776ab",  }, 
    { id: 7, name: "Android", image: "/icons/android-studio.png", color: "#3ac230"},
    { id: 8, name: "Flutter", image: "/icons/flutter.png", color: "#02569B"},
       { id: 9, name: "MongoDB", image: "/icons/mongodb.png", color: "#47A248" },
    { id: 10, name: "MySQL", image: "/icons/mysql.png", color: "#4479A1"},
    { id: 11, name: "Firebase", image: "/icons/firebase.png", color: "#FFCA28"},
     { id: 13, name: "Figma", image: "/icons/figma.png", color: "#F24E1E" },
      { id: 17, name: "GitHub", image: "/icons/github.png", color: "#181717" },

  ]; 

  return ( 
    <section id="skills" className="skills-3d-section"> 
      <div className="container">
        <div className="section-header"> 
          <h2 className="section-title"> 
            <span className="title-number">03</span> 
            Technical Skills
          </h2> 
         
        </div> 
        <div className="skills-3d-container"> 
          <div className="skills-row"> 
            {skills.map((skill) => ( 
              <div 
                key={skill.id}
                className="hexagon-3d-item"
                style={{ "--skill-color": skill.color }}
              > 
                <div className="hexagon-3d"> 
                  <div className="hexagon-3d-front"> 
                    <div className="skill-circle"> 
                      <img 
                        src={skill.image} 
                        alt={skill.name} 
                        className="skill-icon-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = skill.name.charAt(0);
                        }}
                      /> 
                    </div> 
                  </div> 
                  <div className="hexagon-3d-back">
                    {/* Skill Info on Hover */}
                    <div className="skill-hover-info">
                      <h4 className="skill-hover-name">{skill.name}</h4>
                      <span className="skill-hover-level">{skill.level}</span>
                    </div>
                  </div> 
                </div>
              </div> 
            ))} 
          </div> 
        </div>
        
        {/* Skill Legend */}
     
      </div>
    </section> 
  ); 
};













// ==================== Projects Section ==================== 
const ProjectsSection = () => { 
  const projects = [ 
  
  { 
    id: 1, 
    title: "Eventry-Ticket-Booking", 
    description: "Productivity application with real-time collaboration", 
    tech: ['React', 'Firebase', 'Material UI'], 
    githubUrl: "https://github.com/mithilamedhavi02-byte/Eventry-Ticket-Booking", 
    liveDemoUrl: "#", 
    image: "/images/eventry.jpg", // ඔබගේ image එකක් තිබේනම්
    imageAlt: "Eventry Ticket Booking System",
    featured: false 
  }, 
  { 
    id: 2, 
    title: "Suwa Sevana Health Care App", 
    description: "Productivity application with real-time collaboration", 
    tech: ['React', 'Firebase', 'Material UI'], 
    githubUrl: "https://github.com/mithilamedhavi02-byte/Eventry-Ticket-Booking", 
    liveDemoUrl: "#", 
    image: "/images/eventry.jpg", // ඔබගේ image එකක් තිබේනම්
    imageAlt: "Suwa Sevana Health Care Application",
    featured: false 
  }, 
 
  {
    id: 3,
    title: "Smart Parking Mobile System",
    description: "Mobile application for smart parking management with real-time slot availability, reservation system, and digital payment integration. Developed as a 3rd year group project.",
    tech: ['Flutter', 'Dart', 'Google Maps API', 'Firebase'],
    githubUrl: "#", // ඔබගේ GitHub URL එක
    liveDemoUrl: "#",
    image: "/images/parking-system.jpg", // ඔබගේ image එකක් තිබේනම්
    imageAlt: "Smart Parking Mobile System",
    featured: false
  },
  {
    id: 4,
    title: "Computer Repair Shop Management System",
    description: "Desktop application for managing computer repair shop operations including customer management, repair tracking, inventory management, and billing.",
    tech: ['Java', 'JavaFX', 'MySQL', 'Scene Builder'],
    githubUrl: "#", // ඔබගේ GitHub URL එක
    liveDemoUrl: "#",
    image: "/images/computer-repair.jpg", // ඔබගේ image එකක් තිබේනම්
    imageAlt: "Computer Repair Shop Management System",
    featured: false
  },
  {
    id: 5,
    title: "Hotel Management System",
    description: "A complete hotel management solution for room booking, guest management, billing, and inventory control. Features include reservation system and reporting dashboard.",
    tech: ['Java', 'Swing', 'MySQL', 'JDBC'],
    githubUrl: "#", // ඔබගේ GitHub URL එක
    liveDemoUrl: "#",
    image: "/images/hotel-management.jpg", // ඔබගේ image එකක් තිබේනම්
    imageAlt: "Hotel Management System",
    featured: false
  },
  {
    id: 6,
    title: "Class Attendance Management System (CAMS)",
    description: "A database-focused system to record, monitor, and manage student attendance over a 10-week period. Provides separate interfaces for students and lecturers.",
    tech: ['MySQL', 'JavaScript', 'HTML/CSS'],
    githubUrl: "https://github.com/mithilamedhavi02-byte/Class-Attendance-Managements",
    liveDemoUrl: "#",
    image: "/images/car.jpg",   
    imageAlt: "Class Attendance Management System Dashboard",
    featured: false
  },
  {
    id: 7,
    title: "AURORA CEYLON",
    description: "A modern handmade jewellery website featuring elegant UI design, smooth animations, and interactive user experiences. Built to showcase jewellery collections with a clean layout and dynamic visual effects.",
    tech: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: "https://github.com/mithilamedhavi02-byte/AURORA-CEYLON-",
    liveDemoUrl: "#",
    image: "/images/aurora.jpg", // ඔබගේ image එකක් තිබේනම්
    imageAlt: "AURORA CEYLON Jewellery Website",
    featured: false
  }
];
  

  return ( 
    <section id="projects" className="projects"> 
      <div className="container"> 
        <div className="section-header"> 
          <h2 className="section-title"> 
            <span className="title-number"></span> 
            My Projects 
          </h2> 
          <div className="section-subtitle">Some of my recent work</div> 
        </div> 
        <div className="projects-showcase"> 
          <div className="project-grid"> 
            {projects.map(project => ( 
              <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}> 
                <div className="project-image"> 
                  <div className="image-overlay"> 
                    <div className="project-links"> 
                      <a 
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-btn"
                      > 
                        Live Demo 
                      </a> 
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-btn secondary"
                      > 
                        Source Code 
                      </a> 
                    </div> 
                  </div> 
                  <div className="image-placeholder"> 
                    <span>{project.title}</span> 
                  </div> 
                </div> 
                <div className="project-info"> 
                  {project.featured && ( 
                    <span className="project-badge">Featured Project</span> 
                  )} 
                  <h3>{project.title}</h3> 
                  <p>{project.description}</p> 
                  <div className="project-tech"> 
                    {project.tech.map((tech, index) => ( 
                      <span key={index} className="tech-tag">{tech}</span> 
                    ))} 
                  </div> 
                </div> 
              </div> 
            ))} 
          </div> 
        </div> 
      </div> 
    </section> 
  ); 
}; 
























// App.js එකේම ContactSection component එක තියෙනවනම්:

// ==================== Contact Section ==================== 
const ContactSection = ({ form, formLoading, isSubmitted, onChange, onSubmit }) => { 
  const formRef = useRef(); // useRef already exists in App.js imports
  const [localLoading, setLocalLoading] = useState(false);
  const [localSubmitted, setLocalSubmitted] = useState(false);
  
  // EmailJS send function
  const sendEmail = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    
    try {
      // 🔴 ඔබගේ EmailJS IDs මේකට දාන්න:
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';  
      const publicKey = 'YOUR_PUBLIC_KEY';
      
      // EmailJS එකට data send කරනවා
      const result = await emailjs.send(
        serviceID,
        templateID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          to_email: 'mithilamedhavi02@gmail.com',
          reply_to: form.email
        },
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      setLocalSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setLocalSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Email send failed:', error);
      alert(`Message sending failed. Error: ${error.text || error.message}`);
    } finally {
      setLocalLoading(false);
    }
  };

  const isLoading = formLoading || localLoading;
  const isSuccess = isSubmitted || localSubmitted;

  return ( 
    <section id="contact" className="contact-simple"> 
      <div className="container"> 
        <motion.div 
          className="contact-simple-header"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        > 
          <h2 className="contact-simple-subtitle">GET IN TOUCH</h2> 
          <h1 className="contact-simple-title">Contact Me</h1> 
        </motion.div> 

        <div className="contact-container"> 
          {/* Contact Info Column - Same as before */}
          <motion.div 
            className="contact-left-column"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          > 
            {/* ... Same contact info content ... */}
          </motion.div> 

          {/* Contact Form Column */}
          <motion.div 
            className="contact-right-column"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          > 
            <div className="contact-simple-form-card"> 
              <h3 className="form-title">Send Me a Message</h3>
              <p className="form-description">
                Have a project in mind or want to collaborate? Feel free to reach out!
              </p>
              
              <AnimatePresence> 
                {isSuccess && ( 
                  <motion.div 
                    className="success-message-simple"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  > 
                    <motion.span 
                      className="success-icon-simple"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    > 
                      ✅ 
                    </motion.span> 
                    <span>Thank you! Your message has been sent successfully.</span> 
                  </motion.div> 
                )} 
              </AnimatePresence> 

              <form 
                ref={formRef}
                onSubmit={sendEmail}
                className="contact-simple-form"
              > 
                {/* Form fields - Same as before */}
                <motion.div 
                  className="form-group-simple"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                > 
                  <label htmlFor="name" className="form-label-simple"> 
                    Your Name 
                  </label> 
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="form-input-simple"
                    placeholder="What's your name?"
                    required 
                  /> 
                </motion.div> 

                <motion.div 
                  className="form-group-simple"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                > 
                  <label htmlFor="email" className="form-label-simple"> 
                    Your Email 
                  </label> 
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="form-input-simple"
                    placeholder="What's your email?"
                    required 
                  /> 
                </motion.div> 

                <motion.div 
                  className="form-group-simple"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                > 
                  <label htmlFor="message" className="form-label-simple"> 
                    Your Message 
                  </label> 
                  <textarea 
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    className="form-textarea-simple"
                    rows="5"
                    placeholder="What do you want to say?"
                    required 
                  /> 
                </motion.div> 

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                > 
                  <button 
                    type="submit"
                    className={`submit-btn-simple ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  > 
                    {isLoading ? ( 
                      <> 
                        <span className="loading-spinner-simple"></span> 
                        Sending... 
                      </> 
                    ) : ( 
                      'Send Message'
                    )} 
                  </button> 
                </motion.div> 
              </form> 
            </div> 
          </motion.div> 
        </div> 
      </div> 
    </section> 
  ); 
}; 








// ==================== Footer Component ==================== 
const Footer = () => { 
  return ( 
    <footer className="footer"> 
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">Mithila Medhavi</span>
            <span className="logo-dot"></span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer> 
  ); 
}; 

// ==================== Background Elements ==================== 
const BackgroundElements = ({ mousePosition, scrollProgress }) => { 
  return ( 
    <> 
      <div className="animated-bg"> 
        <div className="floating-shapes"> 
          <div className="shape shape-1"></div> 
          <div className="shape shape-2"></div> 
          <div className="shape shape-3"></div> 
          <div className="shape shape-4"></div> 
        </div> 
      </div> 

      <div 
        className="mouse-follower"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div> 

      <div className="scroll-progress"> 
        <div 
          className="progress-fill"
          style={{ width: `${scrollProgress}%` }}
        ></div> 
      </div> 
    </> 
  ); 
}; 

// ==================== MAIN APP COMPONENT ==================== 
const App = () => { 
  const [activeSection, setActiveSection] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); 
  const [scrollProgress, setScrollProgress] = useState(0); 

  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    message: "", 
  }); 
  const [formLoading, setFormLoading] = useState(false); 
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const portfolioRef = useRef(); 

  useEffect(() => { 
    const timer = setTimeout(() => { 
      setIsLoading(false); 
    }, 2500); 

    return () => clearTimeout(timer); 
  }, []); 

  useEffect(() => { 
    const handleMouseMove = (e) => { 
      setMousePosition({ 
        x: e.clientX, 
        y: e.clientY 
      }); 
    }; 

    const handleScroll = () => { 
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    }; 

    window.addEventListener('mousemove', handleMouseMove); 
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => { 
      window.removeEventListener('mousemove', handleMouseMove); 
      window.removeEventListener('scroll', handleScroll); 
    }; 
  }, []); 

  const handleNavClick = (section) => { 
    setActiveSection(section); 
    setIsMenuOpen(false); 
  }; 

  const handleFormChange = (e) => { 
    const { name, value } = e.target; 
    setForm({ 
      ...form, 
      [name]: value, 
    }); 
  }; 

  const handleFormSubmit = (e) => { 
    e.preventDefault(); 
    setFormLoading(true); 

    setTimeout(() => { 
      setFormLoading(false); 
      setIsSubmitted(true); 
      console.log('Contact form submitted:', form); 

      setForm({ 
        name: "", 
        email: "", 
        message: "", 
      }); 

      setTimeout(() => { 
        setIsSubmitted(false); 
      }, 5000); 
    }, 2000); 
  }; 

  const downloadSimplePDF = () => { 
    try {
      const pdf = new jsPDF();
      
      pdf.setFontSize(24);
      pdf.setTextColor(108, 99, 255);
      pdf.text('Mithila Medhavi', 105, 20, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Frontend Developer | React Specialist', 105, 30, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text('Contact Information:', 20, 50);
      pdf.text('Email: mithilamedhavi02@gmail.com', 20, 60);
      pdf.text('Phone: +94 767100617', 20, 70);
      pdf.text('Location: 3/C Palugama, Dompe, Sri Lanka', 20, 80);
      
      pdf.text('Technical Skills:', 20, 100);
      const skills = [
        'React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3',
        'Node.js', 'Git', 'Webpack', 'Python', 'MySQL'
      ];
      skills.forEach((skill, index) => {
        pdf.text(`• ${skill}`, 25, 110 + (index * 7));
      });
      
      pdf.text('Professional Experience:', 20, 180);
      pdf.text('• Frontend Developer (2021 - Present)', 25, 190);
      pdf.text('  Freelance & Contract Projects', 30, 197);
      pdf.text('• Web Development Intern (2020 - 2021)', 25, 207);
      pdf.text('  Tech Startup Colombo', 30, 214);
      
      pdf.text('Education:', 20, 230);
      pdf.text('• BSc Computer Science (2016 - 2020)', 25, 240);
      pdf.text('  University of Colombo', 30, 247);
      
      pdf.text('Projects:', 20, 260);
      pdf.text('• Class Attendance Management System (CAMS)', 25, 270);
      pdf.text('• Eventry Ticket Booking System', 25, 277);
      pdf.text('• Aurora Ceylon Jewelry Website', 25, 284);
      
      pdf.save('Mithila_Medhavi_Portfolio.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  }; 

  return ( 
    <div className="portfolio" ref={portfolioRef}> 
      <LoadingScreen isLoading={isLoading} /> 
      
      <VideoBackground />
      
      <BackgroundElements 
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
      /> 
      
      <Navigation 
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        onNavClick={handleNavClick}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onDownloadCV={downloadSimplePDF}
      /> 
      
      <HeroSection 
        onDownloadCV={downloadSimplePDF}
      /> 
      
      <AboutSection 
        onDownloadCV={downloadSimplePDF}
      /> 
      
      <SkillsSection /> 
      
      <ProjectsSection /> 
      
      <ContactSection 
        form={form}
        formLoading={formLoading}
        isSubmitted={isSubmitted}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      /> 
      
      <Footer /> 
    </div> 
  ); 
}; 

export default App;