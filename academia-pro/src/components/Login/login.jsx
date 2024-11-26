import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LoginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const loginForm = {
    email: '',
    password: '',
}

const Login = () => {
    const [passVisible, setPassVisible] = useState(false);
    const [login, setLogin] = useState(loginForm);
    const [role, setRole] = useState('');
    const [idChange,setIdChange] = useState("Enter Email");
    const [submitSchoolCode,setSubmitSchoolCode] = useState(false);
    const navigate = useNavigate();

    const Login = async ()=>{
        const response = await LoginUser({...login,role});
        console.log(response);
        if(response.status===true){
            toastSuccess();
            setTimeout(()=>{
                console.log("Navigation to intro");
                console.log(response.role);
                localStorage.setItem('role',response.data.role);
                console.log(localStorage.getItem('data'));
                navigate('/');
                window.location.reload();
            },2000)
            console.log("Login Successfull");
        } else if(response.status===false){
            console.log(response.status);
            toastFail(response.message);
        }
    }
    const togglePassVisible = () => {
        setPassVisible(!passVisible);
    }
    const toastSuccess = ()=>{
        toast.success("User Login Successfull",{
            position:'top-center',
            className:"toast"
        });
    }
    const toastFail = (message)=>{
        toast.error(message,{
            position:'top-center',
            className:"toast"
        });
    }

    const  onInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
        console.log(login);
    }
    const submitInstituteCode = ()=>{
        if(localStorage.getItem('code').length===''){
            toast.error("School Code Required",{ position:'top-center', className:"toast"});
        } else if(localStorage.getItem('code').length!==5){
            toast.error("Invalid School Code",{ position:'top-center', className:"toast"});
        } else{
            setSubmitSchoolCode(true);
        }
    }

    const handleChange = (event) => {
        setRole(event.target.value);
        if(event.target.value==="Student"){
            setIdChange('Enter Id');
        } else{
            setIdChange('Enter Email');
        }
    };
    const handleChangeCode = (e)=>{
        localStorage.setItem('code',e.target.value);
    }

    return (<>
        <ToastContainer style={{scale:'0.95',paddingTop:'60px'}}/>
        {
            submitSchoolCode?<div className="w-[100%] h-[100vh] flex justify-center items-center ">
            <div className="min-w-[380px] w-[25%] h-[480px]  rounded-xl ">
                <div className="w-[100%] h-[100px] flex justify-center items-center mt-[15px]">
                    <div className="text-[50px] text-gray-600 font-semibold">Login</div>
                </div>
                <div className="mr-[28px] ml-[28px]">
                    <label for="first_name" className="block font-medium text-md text-white">Email</label>
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                            <MailIcon className="text-gray-500" />
                        </div>
                        <input type="email" name='email' onChange={(e)=>onInputChange(e)} id="input-group-1" className=" border text-black border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 pt-3 pb-3 " placeholder={idChange} required />
                    </div>
                </div>
                <div className="mr-[28px] ml-[28px] mt-[15px]">
                    <label for="first_name" className="block mb-1 text-sm font-medium text-white text-[15px]">Password</label>
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer" onClick={togglePassVisible}>
                            {passVisible ? <VisibilityIcon className="text-gray-500" /> : <VisibilityOffIcon className="text-gray-500" />}
                        </div>
                        <input type={passVisible ? 'text' : 'password'} onChange={(e) => { onInputChange(e) }} name='password' id="input-group-1" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 pt-3 pb-3" placeholder="Enter Password" required />
                    </div>
                </div>
                <div className='m-[28px] flex gap-4'>
                    <FormControl variant="filled" sx={{minWidth: 140}}>
                        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                        <Select labelId="demo-simple-select-standard-label" className='h-[50px]' id="demo-simple-select-standard" value={role} onChange={handleChange} label="Role" >
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Head">Head</MenuItem>
                            <MenuItem value="Management">Management</MenuItem>
                            <MenuItem value="Teacher">Teacher</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='w-[100%] h-[49px] text-blue-600 font-bold rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 active:scale-95'>
                        <p className='text-[14.5px]'>forgot Password ?</p>
                    </div>
                </div>
                <div className='w-[100%] pl-[38px] pr-[38px] flex gap-3 justify-center items-center mt-[35px]'>
                    <div className='w-[100%] h-[45px] border-[2px] rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 active:scale-95 ' onClick={Login}>
                        <p className='text-[#0F172A] font-bold text-[17px]'>Login</p>
                    </div>
                    <div className='w-[100%] h-[45px] border-[2px] bg-white rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 active:scale-95 ' onClick={Login}>
                        <p className='text-[#0F172A] font-bold text-[17px]'>Create Account</p>
                    </div>
                </div>
            </div>
        </div>:
        <div className='w-[100%] h-[100vh] flex justify-center items-center'>
            <div className='flex gap-[20px] flex-col'>
                <p className='text-[35px] font-bold'>Enter School Code</p>
                <div className='mr-[30px] ml-[30px]'>
                    <input type='number' onChange={(e) => handleChangeCode(e)} name='code' id="input-group-1" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full px-4 p-2.5 pt-3 pb-3" placeholder="Enter School Code" required />
                </div>
                <div className='flex w-[100%] justify-center '>
                    <button onClick={submitInstituteCode} className='text-black font-extrabold tracking-wide bg-white rounded-lg border-2 pr-4 pl-4 pt-[7px] pb-[7px] hover:scale-105 active:scale-95'>Submit</button>
                </div>
            </div>
        </div>
        }
    </>);
}
export default Login;