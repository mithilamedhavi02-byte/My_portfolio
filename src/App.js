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
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
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
        timer = setTimeout(() => setIsDeleting(true), pauseDuration * 2);
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
  }, [currentIndex, isDeleting, isFirstNameComplete]);

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
                <img src="/profile.jpg" alt="Mithila Medhavi" className="profile-img" />
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
  I am a dedicated third-year{" "}
  <span className="highlight">BSc (Hons) Software Engineering undergraduate</span>{" "}
  at the Faculty of Computing, CINEC Campus, with a strong foundation in both
  theoretical concepts and practical software development. My academic journey
  is complemented by hands-on project experience, enabling me to transform
  complex ideas into efficient, real-world software solutions. I am actively
  seeking internship opportunities to further enhance my technical skills, gain
  industry exposure, and contribute to innovative and impactful software
  engineering initiatives.
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
      <h3>Education </h3> 
    </div> 
    <div className="card-content"> 
      <div className="timeline"> 
        {/* Education Section */}
        <div className="timeline-item section-title">
          
        </div>

        <div className="timeline-item"> 
          <div className="timeline-year">2023 - 2027</div> 
          <div className="timeline-content"> 
            <h4>BSc (Hons) Software Engineering</h4> 
            <p>CINEC Campus Malabe | Current GPA: 3.46</p>
            <p className="timeline-note">Reading</p>
          </div> 
        </div> 

        <div className="timeline-item"> 
          <div className="timeline-year">2023</div> 
          <div className="timeline-content"> 
            <h4>Assured Diploma in Information Technology (DITEC)</h4> 
            <p>Pearson Assured | ESOFT Metro Campus</p>
            <p className="timeline-note">Completed</p>
          </div> 
        </div>

        {/* Experience Section */}
        <div className="timeline-item section-title">
          <h6>Experience & Activities</h6>
        </div>

        <div className="timeline-item"> 
          <div className="timeline-year">2026</div> 
          <div className="timeline-content"> 
            <h4>Predictive income and repair time analytics and forecasting system</h4> 
            <p>3 rd Year Group Project (on going)</p>
            <p className="timeline-note">Worked on frontend development</p>
          </div> 
        </div> 

        <div className="timeline-item"> 
          <div className="timeline-year">2025</div> 
          <div className="timeline-content"> 
            <h4>Eventrya – Real-Time University Event Booking System</h4> 
            <p>2 nd Year Group Project</p>
            <p className="timeline-note">Worked on frontend development & UI/UX Desing</p>
          </div> 
        </div> 

        <div className="timeline-item"> 
          <div className="timeline-year">2024</div> 
          <div className="timeline-content"> 
            <h4>Class-Attendance-Managements</h4> 
            <p>1 st Year Group Project</p>
            <p className="timeline-note">Worked on frontend development & UI/UX Desing</p>
          </div> 
        </div> 
      </div> 
    </div> 
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
      description: "Real-time web platform for university event registration. Replaces manual processes with automated booking, seat management, and digital tickets.", 
      tech:  ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'], 
      githubUrl: "https://github.com/mithilamedhavi02-byte/Eventry-Ticket-Booking", 
      
      image: "/images/eventry.png",
      imageAlt: "Eventry Ticket Booking System",
      featured: false 
    }, 
    { 
      id: 2, 
      title: "Suwa Sevana Health Care App", 
      description: "Suwasewana is an AI-powered system for booking doctor appointments, making online payments, and managing healthcare services easily.", 
      tech: ['React', 'Tailwind CSS', 'Node.js','Express.js','MongoDB'], 
      githubUrl: "https://github.com/mithilamedhavi02-byte/suwasewana.git", 
      
      image: "/images/suwa-sevana.png", 
      imageAlt: "Suwa Sevana Health Care Application",
      featured: false 
    }, 
  
  
    {
      id: 4,
      title: "Hotel Management System",
      description:"Java desktop application for hotel operations with guest management, room booking, billing, and MySQL database integration. Features Swing GUI and follows OOP principles.",
      tech: ['Java', 'Swing', 'MySQL', 'JDBC', 'OOP'],
      githubUrl: "https://github.com/mithilamedhavi02-byte/hotel_management_system-in-java.git",
      
      image: "/images/hotel-management.png", 
      imageAlt: "Hotel Management System",
      featured: false
    },
    {
      id: 5,
      title: "Class Attendance Management System (CAMS)",
        description: "Web-based attendance tracking system for students and lecturers. Tracks student attendance over 10-week periods with separate interfaces for viewing and updating records.",
       tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      githubUrl: "https://github.com/mithilamedhavi02-byte/Class-Attendance-Managements",
    
      image: "/images/cams.png",  
      imageAlt: "Class Attendance Management System Dashboard",
      featured: false
    },
    {
      id: 6,
      title: "AURORA CEYLON",
       description: "A full-stack e-commerce website for handmade jewellery featuring dynamic content management with PHP and MySQL database. Showcases jewellery collections with elegant UI design and smooth animations.",
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'XAMPP'],
      githubUrl: "https://github.com/mithilamedhavi02-byte/AURORA-CEYLON-",
      
      image: "/images/aurora.jpg", 
      imageAlt: "AURORA CEYLON Jewellery Website",
      featured: false
    },
        {
      id: 8,
      title: "melody_masters",
       description: "A professional E-commerce web application for a musical instrument shop built with PHP, MySQL, and Bootstrap 5, featuring a dynamic typewriter hero section and AJAX-based product management.",
      tech: [  'PHP', 'MySQL', 'XAMPP','Bootstrap 5'],
      githubUrl: "https://github.com/mithilamedhavi02-byte/musical-instrument-store.git",
      
      image: "/images/melody.png", 
      imageAlt: "AURORA CEYLON Jewellery Website",
      featured: false
    },
   {
  id: 9,
  title: "Park-Pro",
  description: "A high-end Smart Parking Management System featuring a cinematic video background and a sleek glassmorphic UI. It enables real-time hub discovery, automated 15-minute booking expirations, and live duration tracking for parked vehicles.",
  tech: ['Flutter', 'Firebase', 'Cloud Firestore', 'Dart'],
  githubUrl: "https://github.com/mithilamedhavi02-byte/smart_parking_app.git",
  image: "/images/park_pro.jpeg", 
  imageAlt: "Park-Pro Mobile App Preview",
  featured: false // මෙය 'true' කිරීමෙන් බොහෝ Portfolio වල කාඩ් එක මැදට හෝ ඉහළට පැමිණේ
}

  ];
  

  return ( 
    <section id="projects" className="projects"> 
      <div className="container"> 
        <div className="section-header"> 
        <h2 
  className="section-title" 
  style={{ color: 'var(--text-color)' }}
> 
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
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-btn secondary"
                      > 
                        Source Code 
                      </a> 
                    </div> 
                  </div> 
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.imageAlt || project.title}
                      className="project-img"
                      onError={(e) => {
                       
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="image-placeholder" style={{ display: project.image ? 'none' : 'flex' }}> 
                    <span>{project.title}</span> 
                  </div> 
                </div> 
                <div className="project-info"> 
                  {project.featured && ( 
                    <span className="project-badge">Featur Project</span> 
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




   

// ==================== Contact Section ==================== 


const ContactSection = ({
  onChange,  
}) => {
  const formRef = useRef();
  
 
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [formLoading, setFormLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ==================== ANIMATION VARIANTS ====================
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.4,
      },
    }),
  };

  // ==================== FORM CHANGE HANDLER ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (onChange) {
      onChange(e);
    }
  };

  // ==================== SUBMIT HANDLER (EMAILJS) ====================
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert('Please fill all fields');
      return;
    }
    
    setFormLoading(true);

    emailjs
      .send(
        "service_f0ysn3b",           // ✅ ඔබගේ Service ID
        "template_gq0ya4m",          // ✅ ඔබගේ Template ID
        {
          name: form.name,           // ✅ Template එකේ {{name}} සඳහා
          email: form.email,         // ✅ Template එකේ {{email}} සඳහා
          message: form.message,     // ✅ Template එකේ {{message}} සඳහා
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          to_email: 'mithilamedhavi02@gmail.com',
          reply_to: form.email
        },
        "wMurm0u3DfTAJ1lEV"          // ✅ ඔබගේ Public Key
      )
      .then(
        (response) => {
          console.log('✅ Email sent successfully:', response.text);
          
          setIsSubmitted(true);
          setFormLoading(false);
          
          // Form reset කරන්න
          setForm({ 
            name: "", 
            email: "", 
            message: "" 
          });

          // Success message auto hide
          setTimeout(() => {
            setIsSubmitted(false);
          }, 4000);
        },
        (error) => {
          console.error('❌ EmailJS Error:', error);
          alert('Sorry, failed to send message. Please try again or email me directly at mithilamedhavi02@gmail.com');
          setFormLoading(false);
        }
      );
  };

  // ==================== JSX ====================
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
          {/* LEFT COLUMN - CONTACT INFO */}
          <motion.div
            className="contact-left-column"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-info-card">
              <div className="contact-info-header">
                <h3>Contact Information</h3>
              </div>
              
              <div className="contact-info-content">
                {/* Phone */}
                <motion.div 
                  className="contact-info-item"
                  custom={0}
                  variants={contactInfoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="contact-info-icon">
                    <span role="img" aria-label="phone">📱</span>
                  </div>
                  <div className="contact-info-details">
                    <h4>Phone</h4>
                    <p>+94 767100617</p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  className="contact-info-item"
                  custom={1}
                  variants={contactInfoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="contact-info-icon">
                    <span role="img" aria-label="email">📧</span>
                  </div>
                  <div className="contact-info-details">
                    <h4>Email</h4>
                    <p>mithilamedhavi02@gmail.com</p>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div 
                  className="contact-info-item"
                  custom={2}
                  variants={contactInfoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="contact-info-icon">
                    <span role="img" aria-label="address">📍</span>
                  </div>
                  <div className="contact-info-details">
                    <h4>Location</h4>
                    <p>3/C Palugama, Dompe</p>
                  </div>
                </motion.div>

                {/* Social Media */}
                <motion.div 
                  className="contact-info-item"
                  custom={3}
                  variants={contactInfoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="contact-info-icon">
                    <span role="img" aria-label="social">💼</span>
                  </div>
                  <div className="contact-info-details">
                    <h4>Social Media</h4>
                    <div className="social-links">
                      <a 
                        href="https://www.linkedin.com/in/mithila-medhavi-17a615296/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://github.com/mithilamedhavi02-byte" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - CONTACT FORM */}
          <motion.div
            className="contact-right-column"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="contact-simple-form-card">
              <h3 className="form-title">Send Me a Message</h3>
              <p className="form-description">
                Have a project in mind or want to collaborate? Feel free to reach out!
              </p>
              
              <AnimatePresence>
                {isSubmitted && (
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
                onSubmit={handleSubmit}
                className="contact-simple-form"
              >
                {/* Name Input */}
                <motion.div 
                  className="form-group-simple"
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="form-label-simple">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input-simple"
                    placeholder="What's your name?"
                    required
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div 
                  className="form-group-simple"
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="form-label-simple">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input-simple"
                    placeholder="What's your email?"
                    required
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div 
                  className="form-group-simple"
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="form-label-simple">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="form-textarea-simple"
                    rows="5"
                    placeholder="What do you want to say?"
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                  custom={3}
                  variants={inputVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <button 
                    type="submit" 
                    className={`submit-btn-simple ${formLoading ? 'loading' : ''}`}
                    disabled={formLoading}
                  >
                    {formLoading ? (
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
      setMousePosition({ x: e.clientX, y: e.clientY }); 
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
    setForm({ ...form, [name]: value }); 
  }; 

  const handleFormSubmit = (e) => { 
    e.preventDefault(); 
    setFormLoading(true); 
    setTimeout(() => { 
      setFormLoading(false); 
      setIsSubmitted(true); 
      setForm({ name: "", email: "", message: "" }); 
      setTimeout(() => setIsSubmitted(false), 5000); 
    }, 2000); 
  }; 

  // --- අලුතින් සකස් කළ CV Download Function එක ---
  const handleCVDownload = () => { 
    const link = document.createElement('a');
    link.href = '/cv_1.pdf'; // ඔබ public folder එකට දැමූ නම
    link.setAttribute('download', 'Mithila_Medhavi_CV.pdf'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; 

  return ( 
    <div className="portfolio" ref={portfolioRef}> 
      <LoadingScreen isLoading={isLoading} /> 
      <VideoBackground />
      <BackgroundElements mousePosition={mousePosition} scrollProgress={scrollProgress} /> 
      
      <Navigation 
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        onNavClick={handleNavClick}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onDownloadCV={handleCVDownload}
      /> 
      
      <HeroSection onDownloadCV={handleCVDownload} /> 
      
      <AboutSection onDownloadCV={handleCVDownload} /> 
      
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