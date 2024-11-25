import React, { useEffect } from 'react';
import './styles.css'; // Assuming your CSS is in a separate file
import Navbar from './Navbar';
import missionImage from './ourmission.jpeg'; // Import images
import visionImage from './ourvision.jpeg';
import result from './results.jpeg'
import timetablemanagement from './TimeTableManagement.jpg'
import attendancetracking from './attendance.jpeg'
import attendance from './AttendanceTracking.jpg'
import examnotification from './examnotification.jpeg'
import "@fortawesome/fontawesome-free/css/all.min.css";

const Homepage = () => {
  useEffect(() => {
    // Select all service cards
    const serviceCards = document.querySelectorAll('.service-card');

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
    
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show'); 
        }
      });
    }, {
      threshold: 0.5,  
      rootMargin: "0px 0px 100px 0px"  
    });

    serviceCards.forEach(card => {
      observer.observe(card);
    });


    return () => {
      serviceCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div>
     
      
        <Navbar/>
      {/* Hero Section */}
      <section id="home" className="hero-section" style={{marginTop:"65.32px",height:"708px"}}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="welcome" style={{color:"white"}}>
            Welcome to <span className="academ">AcademiaPro</span>
          </h1>
          <p style={{color:"white"}}>
            Your ultimate destination for academic excellence, mentorship, and tools designed to empower your academic journey.
          </p>
          <a href="#services" className="cta-button">
            Get Started Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
        <div className="features" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Feature Cards */}
          {[
            { title: 'Track Attendance', description: 'Monitor your monthly and yearly attendance effortlessly.' },
            { title: 'Check Results', description: 'Access your academic results in just a few clicks.' },
            { title: 'Event Calendar', description: 'Stay updated with important academic events and schedules.' },
            { title: 'Community Support', description: 'Engage with peers and mentors for academic assistance.' }
          ].map((feature, index) => (
            <div key={index} className="feature-card" style={{ flex: 1, minWidth: '250px', maxWidth: '300px', background: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ color: '#555' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>
            At <strong>AcademiaPro</strong>, we are committed to revolutionizing education through cutting-edge resources, personalized mentorship, and an inclusive community for learners and educators worldwide.
          </p>
          <p>
            Our mission is to bridge the gap between traditional learning and modern education technology, making high-quality learning experiences accessible to everyone.
          </p>
          <p>
            For educators, AcademiaPro offers innovative teaching resources, collaborative platforms, and data-driven insights to enhance their impact.
          </p>
          <p>
            At the core of AcademiaPro is a belief in the transformative power of education. We strive to create an ecosystem where learning knows no boundaries and growth opportunities are endless.
          </p>
          <div className="about-grid">
            <div className="about-item">
              <img src={missionImage} alt="Our Mission" />
              <h3>Our Mission</h3>
              <p>Empowering individuals to achieve academic and personal growth by bridging the gap between traditional education and modern technology.</p>
            </div>
            <div className="about-item">
              <img src={visionImage} alt="Vision" style={{ height: '235px' }} />
              <h3>Our Vision</h3>
              <p>Creating a global network where knowledge is accessible, mentorship is impactful, and growth is unlimited.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-grid">
            {/* Service Cards */}
            {[
              { img: result, title: "Result Checking", description: "View and download your academic results easily through our portal." },
              { img: attendance, title: "Attendance Tracking", description: "Track your attendance percentage and stay updated on your progress." },
              { img: timetablemanagement, title: "Timetable Management", description: "Access your class schedules and stay organized for the semester." },
              { img: examnotification, title: "Exam Notifications", description: "Receive instant updates about upcoming exams and deadlines." },
              { img: attendancetracking, title: "Monthly/Yearly Attendance Overview", description: "Analyze your monthly or yearly attendance in a detailed and visual format." },
              { img: "https://www.shutterstock.com/image-vector/growth-education-development-book-reading-600nw-2173097197.jpg", title: "Academic Resources", description: "Access a repository of study materials, e-books, and lecture notes." }
            ].map((service, index) => (
              <div key={index} className="service-card" id="serv">
                <img src={service.img} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container" >
          <h2 style={{ marginBottom: '50px',color:"white" }}>What People Say</h2>
          <div className="testimonial-slider" >
            {/* Testimonials */}
            {[
              { quote: "Checking my results and tracking attendance has never been easier. AcademiaPro is a game-changer for students like me!", name: "Dhruv Seth, College Student" },
              { quote: "With AcademiaPro's event calendar, I never miss important campus events or exam dates. It's an invaluable resource.", name: "Deepankar Garg, Graduate Student" },
              { quote: "As a faculty member, the ability to share resources with students efficiently has made my job much easier.", name: "Preenu Mittan, Professor" },
              { quote: "AcademiaPro's attendance tracking feature has helped me stay on top of my progress and plan better for the semester.", name: "Dhruv Kapoor, Undergraduate Student" }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial" style={{color:"white"}}>
                <p style={{color:"white"}}>"{testimonial.quote}"</p>
                <strong style={{color:"white"}}>- {testimonial.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Get In Touch</h2>
          <form>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" rows="4" placeholder="Your Message" required></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container" >
          <p style={{color:"white"}}>&copy; 2024 AcademiaPro. All rights reserved.</p>
          <div className="social-links" >
          <a href="#" ><i className="fab fa-facebook" style={{color:"white"}}></i></a>
          <a href="#"><i className="fab fa-twitter" style={{color:"white"}}></i></a>
          <a href="#"><i className="fab fa-linkedin" style={{color:"white"}}></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
