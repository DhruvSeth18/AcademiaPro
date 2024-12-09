import React, { useEffect } from 'react';
import './styles.css'; // Assuming your CSS is in a separate file
import missionImage from './ourmission.jpeg'; // Import images
import SchoolImage from './school.avif';
import result from './results.jpeg'
import timetablemanagement from './TimeTableManagement.jpg'
import attendancetracking from './attendance.jpeg';
import attendance from './AttendanceTracking.jpg';
import examnotification from './examnotification.jpeg';
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
      <section id="home" className="hero-section" style={{ height: "100vh" }}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="welcome" style={{ color: "white", fontSize: '50px' }}>
            Welcome to <span className="academ">AcademiaPro</span>
          </h1>
          <p style={{ color: "white" ,maxWidth:"700px"}}>
            Your ultimate destination for academic excellence, mentorship, and tools designed to empower your academic journey.
          </p>
          <a href="#services" className="cta-button">
            Get Started Now
          </a>
        </div>
      </section>

      <section style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
        <div className="features" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Feature Cards */}
          {[
            { title: 'Track Attendance', description: 'Monitor your monthly and yearly attendance effortlessly.' },
            { title: 'Check Results', description: 'Access your academic results in just a few clicks.' },
            { title: 'Event Calendar', description: 'Stay updated with important academic events and schedules.' },
            { title: 'Community Support', description: 'Engage with peers and mentors for academic assistance.' }
          ].map((feature, index) => (
            <div key={index} className="feature-card bg-gray-400" style={{ flex: 1, minWidth: '250px', maxWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <h3 className='text-blue-500 font-medium' style={{ marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ color: '#555' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" style={{padding:'0px',marginTop:"80px",marginBottom:"80px"}} className="about-section">
        <div className="container">
          <h2 className='text-white font-medium'>About Us</h2>
          <div className="flex mt-[80px] flex-col md:flex-row">
            <div className="basis-1/2 w-[100%] p-6">
              <div className='flex justify-center items-center w-[100%] h-[250px] mb-[20px]'>
                <img className='w-[100%] md:w-[90%] h-[100%] rounded-lg' src={missionImage} alt="Our Mission" />
              </div>
              <div className='flex justify-center'>
                <h3 className='text-white mb-2 text-[25px]'>Our Mission</h3>
              </div>
              <p className='text-white text-center'>Empowering individuals to achieve academic and personal growth by bridging the gap between traditional education and modern technology.</p>
            </div>
            <div className="basis-1/2 w-[100%] p-6">
              <div className='flex justify-center items-center w-[100%] h-[250px] mb-[20px]'>
                <img className='w-[100%] md:w-[90%] h-[100%] rounded-lg' src={SchoolImage} alt="Our Mission" />
              </div>
              <div className='flex justify-center'>
                <h3 className='text-white mb-2 text-[25px]'>Our Vision</h3>
              </div>
              <p className='text-white text-center'>Creating a global network where knowledge is accessible, mentorship is impactful, and growth is unlimited.</p>
            </div>
          </div> 
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <h2 className='text-white'>What We Offer</h2>
          <div className="flex justify-center flex-wrap gap-[50px] mt-[60px]">
            {[
              { img: result, title: "Result Checking", description: "View and download your academic results easily through our portal." },
              { img: attendance, title: "Attendance Tracking", description: "Track your attendance percentage and stay updated on your progress." },
              { img: timetablemanagement, title: "Timetable Management", description: "Access your class schedules and stay organized for the semester." },
              { img: examnotification, title: "Exam Notifications", description: "Receive instant updates about upcoming exams and deadlines." },
              { img: attendancetracking, title: "Monthly/Yearly Attendance", description: "Analyze your monthly or yearly attendance in a detailed and visual format." },
              { img: "https://www.shutterstock.com/image-vector/growth-education-development-book-reading-600nw-2173097197.jpg", title: "Academic Resources", description: "Access a repository of study materials, e-books, and lecture notes." }
            ].map((service, index) => (
              <div style={{backgroundColor:"#E1E8EB"}} key={index} className="w-[350px] rounded-md h-[350px] p-4" id="serv">
                <div className='h-[180px] w-[100%] mb-[25px]'>
                  <img className='w-[100%] h-[100%] rounded-md' src={service.img} alt={service.title} />
                </div>
                <h3 className='text-[25px] font-medium text-center'>{service.title}</h3>
                <p className='text-center'>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="container" >
          <p style={{ color: "white" }}>&copy; 2024 AcademiaPro. All rights reserved.</p>
          <div className="social-links" >
            <a href="#" ><i className="fab fa-facebook" style={{ color: "white" }}></i></a>
            <a href="#"><i className="fab fa-twitter" style={{ color: "white" }}></i></a>
            <a href="#"><i className="fab fa-linkedin" style={{ color: "white" }}></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
