import Navbar from "./components/navbar/Navbar";
import {BrowserRouter,Routes,Route,Outlet,Navigate} from 'react-router-dom';
import Login from "./components/Login/login";
import Management from "./components/Management/Management";
import Student from "./components/Class/Class";
import Attendence from "./components/Attendence/Attendence";
import Performance from "./components/Performance/Performance";
import Section from "./components/Class/Section";
import ClassData from "./components/Class/ClassData";
const PrivateRouteBlog = ()=>{
  return localStorage.getItem("userId") ?
  <>
      <Outlet/>
  </>:
  <Navigate replace to="/"/>
}

const PrivateRoute = ()=>{
  return localStorage.getItem("userId") ?
  <Navigate replace to="/"/>
  :
  <>
      <Outlet/>
  </>
}   

const Home = ()=>{
  return (
    <>
      <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/addManagement' element={<Management/>} />
              <Route path='/attendence' element={<Attendence/>} />
              <Route path='/class' element={<Student/>} />
              <Route path='/class/:classSection' element={<Section/>} />
              <Route path='/class/:clas/:classSection' element={<ClassData/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/performance' element={<Performance/>} />

                {/* <Route path='/' element={<Intro/>} /> */}
                {/* <Route element={<PrivateRoute/>} >
                </Route> */}
                
                {/*<Route element={<PrivateRouteBlog/>} >
                    <Route path='/student' element={<Student/>} />
                    <Route path='/student/:class' element={<Class/>} /> */}
                    {/* <Route path='/createblog' element={<CreateBlog/>} />
                    <Route path='/editblog/:blogId' element={<EditBlog/>} />
                    <Route path='/user' element={<User/>} /> */}
                {/* </Route> */}
                {/* <Route path='*' element={<Navigate replace to="/"/>}  />
                <Route path='/about' element={<About/>}/> */}
            </Routes>
        </BrowserRouter>
    </>
  )
}
export default Home;