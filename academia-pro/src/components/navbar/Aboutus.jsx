import React, { useEffect } from 'react';
import './AboutUs.css'; // Ensure this matches the styles used in the HTML
import missionImage from './ourmission.jpeg';
import visionImage from './ourvision.jpeg';
import Navbar from './Navbar';
import "@fortawesome/fontawesome-free/css/all.min.css";

const AboutUs = () => {
  useEffect(() => {

    document.title = "About Us - AcademiaPro";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.content =
        "Discover AcademiaPro - A platform designed to empower education through technology, innovation, and inclusivity.";
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Discover AcademiaPro - A platform designed to empower education through technology, innovation, and inclusivity.";
      document.head.appendChild(meta);
    }


    const gridItems = document.querySelectorAll('.grid-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px 100px 0px' }
    );

    gridItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      gridItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div>
      <section className="hero" style={{marginTop:"65.3px",color:"white",height:"350px",padding:"105px"}}>
        <h1 style={{color:"white"}}><strong>Welcome to AcademiaPro</strong></h1>
        <p style={{color:"white"}}>Empowering education through technology and innovation. Learn about our mission and values.</p>
      </section>

      <section className="section container" style={{ backgroundColor: '#f0f0f0' ,width:"100%",maxWidth:"1690px",padding:"80px",height:"100%"}}>
        <h2 style={{fontSize:"40px"}}><strong>Who We Are</strong></h2>
        <p>
        AcademiaPro is your trusted partner in education, bridging the gap between traditional learning and modern technology.
        We aim to make education more accessible, efficient, and impactful through innovative tools and features.
        Our platform empowers students and educators alike to unlock their full potential, fostering an environment of continuous learning.
        By integrating advanced technologies, we strive to enhance the educational experience and prepare future leaders for success.
        With user-friendly interfaces and personalized learning paths, we are revolutionizing how knowledge is shared and acquired globally.
        </p>
        <p>
        AcademiaPro offers a seamless learning experience, where users can access a wealth of resources at their fingertips.
        Our tools cater to diverse learning styles, ensuring that every learner can thrive in a way that suits them best.
        By fostering collaboration between educators, students, and institutions, we aim to build a vibrant global learning community.
        Together, we are shaping the future of education, one innovative solution at a time.
        </p>
      </section>

      <section className="section container" style={{margin:"0px",width:"100%",maxWidth:"1690px",height:"100%",padding:"80px"}}>
        <h2 style={{fontSize:"40px"}}><strong>Our Mission & Vision</strong></h2>
        <div className="grid">
          <div className="grid-item">
            <img src={missionImage} alt="Our Mission"  style={{marginLeft:"60px"}}/>
            <h3>Our Mission</h3>
            <p>To empower students, educators, and institutions by providing cutting-edge tools for enhanced learning and growth.</p>
          </div>
          <div className="grid-item">
            <img src={visionImage} alt="Our Vision" style={{marginLeft:"76px"}}/>
            <h3>Our Vision</h3>
            <p>To build a global community where knowledge is shared seamlessly, and education is accessible to all.</p>
          </div>
        </div>
      </section>

      <section className="section container" style={{ backgroundColor: '#f0f0f0',height:"100%",margin:"0px",width:"100%",maxWidth:"1690px",padding:"80px" ,marginTop:"20px"}}>
        <h2 style={{padding:"40px",fontSize:"40px"}}><strong>Our Core Values</strong></h2>
        <div className="grid">
          <div className="grid-item">
            <h3>Innovation</h3>
            <p>Pioneering solutions to revolutionize education through technology.</p>
          </div>
          <div className="grid-item">
            <h3>Collaboration</h3>
            <p>Fostering a community where students and educators thrive together.</p>
          </div>
          <div className="grid-item">
            <h3>Integrity</h3>
            <p>Upholding the highest standards of trust and transparency in our work.</p>
          </div>
        </div>
      </section>

      <section className="section container" style={{ backgroundColor: '#f0f0f0',margin:"0px",width:"100%",maxWidth:"1690px",padding:"60px" ,marginTop:"20px" }}>
        <h2 style={{fontSize:"40px"}}><strong>What People Say About Us</strong></h2>
        <div className="testimonial" style={{backgroundColor:"#f0f0f0"}}>
          <p>"AcademiaPro has truly changed how I approach my studies. The resources are phenomenal!"</p>
          <h4><strong>- Dhruv Kapoor</strong></h4>
        </div>
        <div className="testimonial" style={{backgroundColor:"#f0f0f0"}}>
          <p>"An amazing platform for both students and educators. Highly recommend it!"</p>
          <h4><strong>- Preenu Mittan</strong></h4>
        </div>
        <div className="testimonial" style={{backgroundColor:"#f0f0f0"}}>
          <p>"Streamlined and efficient, AcademiaPro has everything I need as a student."</p>
          <h4><strong>- Deepankar Garg</strong></h4>
        </div>
      </section>

      <footer style={{marginTop:"0px"}}>
        <p style={{color:"white"}}>&copy; 2024 AcademiaPro. All rights reserved.</p>
        <div className="social-icons" >
          <a href="#" ><i className="fab fa-facebook" style={{color:"white"}}></i></a>
          <a href="#"><i className="fab fa-twitter" style={{color:"white"}}></i></a>
          <a href="#"><i className="fab fa-linkedin" style={{color:"white"}}></i></a>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
