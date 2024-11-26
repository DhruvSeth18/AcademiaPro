import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getManagement} from '../api/api';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Button, Dialog, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ManagementPerson from './ManagementPerson';
import CloseIcon from '@mui/icons-material/Close';
import { createManagement} from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const roles = ["Principal", "Vice Principal", "Management"]; // Roles list


const Management = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [management,setManagement] = useState([]);
    const [newManagement, setNewManagement] = useState({ username: '', email: '', password: '', role: roles[0] });

    const Management = async ()=>{
        const response = await getManagement();
        if(response.status===true){
            setManagement(response.data);
        }
    }

    const CreateManagement = async ()=>{
        const response = await createManagement(newManagement);
        if(response.status===true){
            toastSuccess(response.message);
            setOpenDialog(false);
            Management();
        }
    }

    const toastSuccess = (message)=>{
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

    useEffect(()=>{
        Management();
    },[]);

    const handleClose = () => setOpenDialog(false);
    const handleSave = () => { console.log('New Management Data:', newManagement); setOpenDialog(false); };
    const handleInputChange = (field, value) =>{
        setNewManagement({ ...newManagement, [field]: value });
        console.log(newManagement);
    } 
    const generateRandomPassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomPassword = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        setNewManagement({ ...newManagement, password: randomPassword });
    };

    return (
        <>
            <ToastContainer style={{scale:'0.95',paddingTop:'60px'}}/>
            <div className="mt-[80px] w-[100%] flex justify-center">
                <Dialog onClose={handleClose} open={openDialog}>
                    <div className='w-[320px] h-[500px] p-5 relative'>
                        <CloseIcon sx={{ fontSize: '28px' }} className='absolute top-2 right-2 cursor-pointer text-blue-500' onClick={handleClose} />
                        <div className='pt-[40px]'><p className='text-center text-2xl font-bold text-blue-700'>Add Management</p></div>
                        <div className='mt-5 space-y-4'>
                            <TextField label="Username" fullWidth variant="outlined" value={newManagement.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                            <TextField label="Email" fullWidth variant="outlined" value={newManagement.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                            <div className="flex items-center space-x-2">
                                <TextField label="Password" variant="outlined" value={newManagement.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-3/4" />
                                <Button sx={{padding:"15px 20px"}} variant="contained" color="primary" onClick={generateRandomPassword} className="w-2/4">Generate</Button>
                            </div>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select value={newManagement.role} onChange={(e) => handleInputChange('role', e.target.value)}>
                                    {roles.map((role, i) => <MenuItem key={i} value={role}>{role}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="flex justify-center mt-5">
                            <Button onClick={()=>CreateManagement()} sx={{padding:"10px 20px",letterSpacing:'1px',fontSize:'15px'}} variant="contained" color="primary">Create</Button>
                        </div>
                    </div>
                </Dialog>
                <div className="w-[100%] sm:w-[90%] lg:w-[65%] p-5 overflow-auto custom-scroll">
                    <div className='h-[50px] absolute bottom-3 right-3 mb-[20px] flex justify-end items-center'>
                        <Button onClick={() => setOpenDialog(true)} sx={{ padding: "10px 20px", marginRight: "20px" }} className='cursor-pointer' variant='contained'>Add Management</Button>
                    </div>
                    <div className="w-[100%] color-black">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>SNo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Role</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Email</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Password</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Update</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {management && management.map((management, index) => (
                                        <ManagementPerson key={index} Management={Management} management={management} sNo={index + 1} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Management;
