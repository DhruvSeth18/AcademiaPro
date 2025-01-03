import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from "./components/Login/login";
import Management from "./components/Management/Management";
import Student from "./components/Class/Class";
import Attendence from "./components/Attendence/Attendence";
import Performance from "./components/Performance/Performance";
import Section from "./components/Class/Section";
import ClassData from "./components/Class/ClassData";
import Teachers from "./components/Teachers/Teachers";
import StudentData from "./components/Students/StudentData";
import { UserContext } from "./components/context/userContext";
import { useContext } from "react";
import HomePage from './components/navbar/Homepage';
import AboutUs from './components/navbar/Aboutus'
import Contact from './components/navbar/ContactPage';
import StudentProfile  from "./components/Profile/studentProfile";
import SignUp from "./components/SignUp/signUp";
import bgImage from './bgImage.png';
import Profile from "./components/Profile/Profile";
import Resources from "./components/Resources/Resources";


const Home = () => {
  const { isUser } = useContext(UserContext);

  // Private route for Teachers
  const PrivateTeacherRoute = () => {
    return localStorage.getItem("role") === "Teacher" ? (
      <Outlet />
    ) : (
      <Navigate replace to="/login" />
    );
  };

  // Private route for Heads
  const PrivateHeadRoute = () => {
    return localStorage.getItem("isUser") === "true" && localStorage.getItem("role") === "Head" || localStorage.getItem("role") === "Management"
      ? (
      <Outlet />
    ) : (
      <Navigate replace to="/login" />
    );
  };

  // Private route for Students
  const PrivateStudentRoute = () => {
    return localStorage.getItem("role") === "Student" ? (
      <Outlet />
    ) : (
      <Navigate replace to="/login" />
    );
  };

  // Public route accessible only if not logged in
  const PublicRoute = () => {
    return localStorage.getItem("isUser") === "true" ? (
      <Navigate replace to="/" />
    ) : (
      <Outlet />
    );
  };

  return (
    <BrowserRouter>
      <div className="bg-black">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Routes>
          <Route element={<PrivateHeadRoute />}>
            <Route path="/addManagement" element={<Management />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/class" element={<Student />} />
            <Route path="/class/:className" element={<Section />} />
            <Route path="/class/:className/:sectionName" element={<ClassData />} />
          </Route>

          <Route element={<PrivateTeacherRoute />}>
            <Route path="/performance" element={<Performance />} />
            <Route path="/attendence" element={<Attendence />} />
            <Route path="/teacher/resources" element={<Resources />} />
            <Route path="/students" element={<StudentData />} />
          </Route>

          <Route element={<PrivateStudentRoute />}>
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/student/resources" element={<Resources />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Home;