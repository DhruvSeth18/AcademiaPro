import { useContext, useEffect, useState} from 'react';
import { AppBar, Toolbar, styled, Box, Drawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import LoginButton from './loginSection';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

const drawerWidth = 240;

const EditToolbar = styled(Toolbar)`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const ScrollTrack = styled(Box)`
    height:1.5px;
    position:fixed;
    left:0px;
    width:100%;
    transform-origin:left;
    scale: 0 1;
    background-color:white;
    animation:scroll-watch linear;
    animation-timeline:scroll();
    @keyframes scroll-watch {
        to{
            scale:1 1;
        }
    }
    background: rgb(174,58,180);
    background: linear-gradient(90deg, rgba(174,58,180,1) 0%, rgba(253,64,29,1) 61%, rgba(252,176,69,1) 100%);
`

const NaviButton = styled(NavLink)`
    padding-top:20px;
    padding-bottom:20px;
    color:white;
    text-decoration:none;
    text-align:center;
`;

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { user,isUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };
        console.log("ROle is here : ", getCookie('role'));
    }, []);

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };
    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const homepage = () => {
        navigate('/login', { replace: true }); // Corrected navigation
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}> 
                <AppBar position="fixed" className='backdrop-blur-[5px]' sx={{ width: '100%', margin: "0", padding: "0", backgroundColor:"#00000030"}}  >
                    <EditToolbar position='fixed'  sx={{ height: { xs: '65px' }, backgroundColor: "transparent" }}>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' }, position: 'absolute', left: '5vh', scale: '1.4' }} >
                            <MenuIcon />
                        </IconButton>
                        <div onClick={homepage} className='flex gap-2 sm:block hidden'>
                            <img className='w-[49px] h-[45px] cursor-pointer absolute rounded-full ring-gray-300 dark:ring-white left-[30px] top-[10px]' src={Logo} />
                        </div>
                        <div className='w-[60%] hidden sm:flex justify-around'>
                            <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}> Home</NavLink>
                            {
                                !isUser ? <>
                                    <NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-400 font-bold" : "text-white hover:text-yellow-200 "}> About Us</NavLink>
                                    <NavLink to="/contact" className={({ isActive }) => isActive ? "text-orange-400 font-bold" : "text-white hover:text-yellow-200 "}> Contact </NavLink>
                                    <NavLink to="/working" className={({ isActive }) => isActive ? "text-orange-400 font-bold" : "text-white hover:text-yellow-200 "}> Working </NavLink>
                                </> : <></>
                            }
                            {
                                localStorage.getItem("role") === "Teacher" ? <>
                                    <NavLink to="/performance" className={({ isActive }) => isActive ? "text-orange-400" : "text-white "}>Performance</NavLink>
                                    <NavLink to="/attendence" className={({ isActive }) => isActive ? "text-orange-400" : "text-white"}>Attendence</NavLink>
                                    <NavLink to="/teacher/resources" className={({ isActive }) => isActive ? "text-orange-400" : "text-white"}>Resources</NavLink>
                                    <NavLink to="/students" className={({ isActive }) => isActive ? "text-orange-400" : "text-white"}>Students</NavLink>
                                </> : <></>
                            }
                            {
                                localStorage.getItem("role") === "Head" ? <>
                                    <NavLink to="/addManagement" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Management</NavLink>
                                    <NavLink to="/class" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Class</NavLink>
                                    <NavLink to="/teachers" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Teachers</NavLink>
                                </> : <></>
                            }
                            {
                                localStorage.getItem("role") === "Management" ? <>
                                    <NavLink to="/addManagement" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Management</NavLink>
                                    <NavLink to="/class" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Class</NavLink>
                                    <NavLink to="/teachers" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Teachers</NavLink>
                                </> : <></>
                            }
                            {
                                localStorage.getItem("role") === "Student" ? <>
                                    <NavLink to="/student/resources" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Resources</NavLink>
                                    <NavLink to={`/profile/${user.username}`} className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Profile</NavLink>
                                </> : <></>
                            }
                        </div>
                        <LoginButton />
                    </EditToolbar>
                </AppBar>
                <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                    <Drawer variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd} onClose={handleDrawerClose}
                        ModalProps={{ keepMounted: true }}
                        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'black', }, }}>
                        <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
                            <Box style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <NaviButton to="/" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}> Home</NaviButton>
                                {
                                    !isUser ? <>
                                        <NaviButton to="/about" className={({ isActive }) => isActive ? "text-orange-400 font-bold" : "text-white hover:text-yellow-200 "}> About Us</NaviButton>
                                        <NaviButton to="/contact" className={({ isActive }) => isActive ? "text-orange-400 font-bold" : "text-white hover:text-yellow-200 "}> Contact </NaviButton>
                                        <NaviButton to="/working" className={({ isActive }) => isActive ? "text-orange-400 font-bold" : "text-white hover:text-yellow-200 "}> Working </NaviButton>
                                    </> : <></>
                                }
                                {
                                    localStorage.getItem("role") === "Teacher" ? <>
                                        <NaviButton to="/performance" className={({ isActive }) => isActive ? "text-orange-400" : "text-white "}>Performance</NaviButton>
                                        <NaviButton to="/attendence" className={({ isActive }) => isActive ? "text-orange-400" : "text-white"}>Attendence</NaviButton>
                                        <NaviButton to="/resources" className={({ isActive }) => isActive ? "text-orange-400" : "text-white"}>Resources</NaviButton>
                                        <NaviButton to="/students" className={({ isActive }) => isActive ? "text-orange-400" : "text-white"}>Students</NaviButton>
                                    </> : <></>
                                }
                                {
                                    localStorage.getItem("role") === "Head" ? <>
                                        <NaviButton to="/addManagement" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Management</NaviButton>
                                        <NaviButton to="/class" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Class</NaviButton>
                                        <NaviButton to="/teachers" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Teachers</NaviButton>
                                    </> : <></>
                                }
                                {
                                    localStorage.getItem("role") === "Student" ? <>
                                        <NaviButton to="/resources" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Resources</NaviButton>
                                        <NaviButton to="/profile" className={({ isActive }) => isActive ? "text-orange-400" : "text-white hover:text-[#00FF9C]"}>Profile</NaviButton>
                                    </> : <></>
                                }
                            </Box>
                        </Box>
                    </Drawer>
                </Box>
            </Box>
            <ScrollTrack sx={{ top: { sm: '63px', xs: '56px' }, zIndex: '3' }}></ScrollTrack>
        </>
    );
}

export default Navbar;