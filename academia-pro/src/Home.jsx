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


const Home = () => {
  const {isUser} = useContext(UserContext);
  const PrivateTeacherRoute = () => {
    return localStorage.getItem("role") === "Teacher" ?
      <>
        <Outlet />
      </> :
      <Navigate replace to="/" />
  }
  const PrivateHeadRoute = () => {
    return localStorage.getItem("isUser") && localStorage.getItem("role") === "Head" ?
      <>
        <Outlet />
      </> :
      <Navigate replace to="/" />
  }


  const PrivateRoute = () => {
    return localStorage.getItem('isUser')==="true" ?
      <Navigate replace to="/" />
      :
      <>
        <Outlet />
      </>
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateHeadRoute />}>
            <Route path='/addManagement' element={<Management />} />
            <Route path='/teachers' element={<Teachers />} />
            <Route path='/class' element={<Student />} />
            <Route path='/class/:className' element={<Section />} />
            <Route path='/class/:className/:sectionName' element={<ClassData />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route element={<PrivateTeacherRoute />} >
            <Route path='/performance' element={<Performance />} />
            <Route path='/attendence' element={<Attendence />} />
            <Route path='/students' element={<StudentData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Home;