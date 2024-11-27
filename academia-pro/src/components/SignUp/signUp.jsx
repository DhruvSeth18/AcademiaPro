import MailIcon from '@mui/icons-material/Mail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Person2Icon from '@mui/icons-material/Person2';
import PasswordIcon from '@mui/icons-material/Password';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signupForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
};

const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
];

const SignUp = () => {
    const [passVisible, setPassVisible] = useState(false);
    const [signup, setSignup] = useState(signupForm);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        console.log("sign up is here  ", signup);
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (signup.password !== signup.confirmPassword) {
            toast.error('Passwords do not match', {
                position: 'top-center',
                className: 'toast',
            });
            return;
        }
        console.log('Signup form submitted', signup);
        toast.success('Signup Successful', {
            position: 'top-center',
            className: 'toast',
        });

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const togglePassVisible = () => {
        setPassVisible(!passVisible);
    };

    return (
        <>
            <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
            <div className="w-[100%] h-[100vh] flex justify-center items-center">
                <div className="min-w-[380px] w-[25%] h-auto rounded-xl">
                    <div className="w-[100%] h-[100px] flex justify-center items-center mt-[15px]">
                        <div className="text-[50px] text-gray-600 font-semibold">Signup</div>
                    </div>
                    <div className="mr-[28px] ml-[28px]">
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                <Person2Icon className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                onChange={handleInputChange}
                                className="border text-black border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 pt-3 pb-3"
                                placeholder="Enter Username"
                                required
                            />
                        </div>

                    </div>
                    <div className="mr-[28px] ml-[28px] mt-[15px]">
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                <MailIcon className="text-gray-500" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                className="border text-black border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 pt-3 pb-3"
                                placeholder="Enter Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="mr-[28px] ml-[28px] mt-[15px]">
                        <div className="relative mb-4">
                            <div
                                className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer"
                                onClick={togglePassVisible}
                            >
                                {passVisible ? (
                                    <VisibilityIcon className="text-gray-500" />
                                ) : (
                                    <VisibilityOffIcon className="text-gray-500" />
                                )}
                            </div>
                            <input
                                type={passVisible ? 'text' : 'password'}
                                name="password"
                                onChange={handleInputChange}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 pt-3 pb-3"
                                placeholder="Enter Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="mr-[28px] ml-[28px] mt-[15px]">
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                <PasswordIcon className="text-gray-500" />
                            </div>
                            <input
                                type={passVisible ? 'text' : 'password'}
                                name="confirmPassword"
                                onChange={handleInputChange}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full  ps-10 p-2.5 pt-3 pb-3"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="mr-[28px] ml-[28px] mt-[15px]">
                        <FormControl variant="filled" sx={{ minWidth: 140 }} fullWidth>
                            <InputLabel id="state-select-label">State</InputLabel>
                            <Select
                                labelId="state-select-label"
                                name="state"
                                value={signup.state}
                                onChange={handleInputChange}
                            >
                                {indianStates.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w-[100%] pl-[38px] pr-[38px] flex gap-3 justify-center items-center mt-[35px]">
                        <div
                            onClick={handleSubmit}
                            className="w-[100%] h-[45px] border-[2px] rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 active:scale-95"
                        >
                            <p className="text-[#0F172A] font-bold text-[17px]">Signup</p>
                        </div>
                        <div
                            onClick={() => navigate('/login')}
                            className="w-[100%] h-[45px] border-[2px] bg-white rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 active:scale-95"
                        >
                            <p className="text-[#0F172A] font-bold text-[17px]">Login</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
