import Navbar from "./components/navbar/Navbar";
import {BrowserRouter,Routes,Route,Outlet,Navigate} from 'react-router-dom';
import Login from "./components/Login/login";
import Management from "./components/Management/Management";
import Student from "./components/StudentEdit/Student";
import Class from "./components/StudentEdit/Class";

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
                {/* <Route path='/' element={<Intro/>} /> */}
                <Route element={<PrivateRoute/>} >
                    <Route path='/login' element={<Login/>} />
                </Route>
                <Route element={<PrivateRouteBlog/>} >
                    <Route path='/student' element={<Student/>} />
                    <Route path='/student/:class' element={<Class/>} />
                    {/* <Route path='/createblog' element={<CreateBlog/>} />
                    <Route path='/editblog/:blogId' element={<EditBlog/>} />
                    <Route path='/user' element={<User/>} /> */}
                </Route>
                {/* <Route path='*' element={<Navigate replace to="/"/>}  />
                <Route path='/about' element={<About/>}/> */}
            </Routes>
        </BrowserRouter>
    </>
  )
}
export default Home;