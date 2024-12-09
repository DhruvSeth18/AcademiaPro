import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getManagement } from '../api/api';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Button, Dialog, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ManagementPerson from './ManagementPerson';
import CloseIcon from '@mui/icons-material/Close';
import { createManagement } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import sendEmail from '../email/sendEmail';
import { emailMessage } from '../email/EmailMessage';

const roles = ["Principal", "Vice Principal", "Management"];

const Management = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [management, setManagement] = useState([]);
    const [newManagement, setNewManagement] = useState({ username: '', email: '', password: '', role: roles[0] });
    const [searchQuery, setSearchQuery] = useState("");

    const Management = async () => {
        const response = await getManagement();
        if (response.status === true) {
            setManagement(response.data);
        }
    };

    const CreateManagement = async () => {
        const response = await createManagement(newManagement);
        if (response.status === true) {
            toastSuccess(response.message || "Management is Created");
            setOpenDialog(false);
            const message = emailMessage(newManagement.username, newManagement.email, newManagement.password);
            const emailSend = await sendEmail({ username: newManagement.username, email: newManagement.email, message });
            if (emailSend.status === true) {
                toastSuccess("Email Sent to " + newManagement.email);
            } else {
                toastFail("Email Failed");
            }
            Management();
        } else {
            toastFail(response.message || "Failed to Add Management");
        }
    };

    const toastSuccess = (message) => toast.success(message, { position: 'top-center', autoClose: 1500 });
    const toastFail = (message) => toast.error(message, { position: 'top-center', autoClose: 1500 });

    useEffect(() => { Management(); }, []);

    const handleClose = () => setOpenDialog(false);
    const handleInputChange = (field, value) => setNewManagement({ ...newManagement, [field]: value });
    const generateRandomPassword = () => setNewManagement({ ...newManagement, password: Math.random().toString(36).slice(-8) });

    const filteredManagement = management.filter((person) => 
        person.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
            <div className="pt-[100px] overflow-y-auto w-full h-[100vh] flex justify-center">
                <Dialog onClose={handleClose} open={openDialog}>
                    <div className='w-[320px] h-[500px] p-5 bg-black border-2 relative'>
                        <CloseIcon sx={{ fontSize: '28px' }} className='absolute top-2 right-2 cursor-pointer text-white' onClick={handleClose} />
                        <div className='pt-[40px]'><p className='text-center text-2xl font-bold text-white'>Add Management</p></div>
                        <div className='mt-5 space-y-4'>
                            <TextField label="Username" fullWidth variant="outlined" value={newManagement.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                            <TextField label="Email" fullWidth variant="outlined" value={newManagement.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                            <div className="flex items-center space-x-2">
                                <TextField label="Password" variant="outlined" value={newManagement.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-3/4" />
                                <Button sx={{ padding: "15px 20px", backgroundColor: "#0079FF", color: "white" }} variant="contained" onClick={generateRandomPassword} className="w-2/4">Generate</Button>
                            </div>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select value={newManagement.role} onChange={(e) => handleInputChange('role', e.target.value)}>
                                    {roles.map((role, i) => <MenuItem key={i} value={role}>{role}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="flex justify-center mt-5">
                            <Button onClick={CreateManagement} sx={{ padding: "10px 25px", backgroundColor: "#0079FF", color: "white" }} variant="contained">Create</Button>
                        </div>
                    </div>
                </Dialog>

                <div className="w-full sm:w-[90%] lg:w-[65%] p-4 pt-0">
                    <div className='h-[50px] absolute bottom-3 right-3 mb-[20px] flex justify-end items-center'>
                        <Button sx={{ padding: "10px 20px", marginRight: "20px", backgroundColor: "#0079FF", color: "white" }} onClick={() => setOpenDialog(true)} variant='contained'>Add Management</Button>
                    </div>

                    <TextField 
                        label="Search by Username, Email or Role" 
                        fullWidth 
                        variant="outlined" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        sx={{ marginBottom: '20px' }} 
                    />

                    <TableContainer component={Paper} sx={{ maxHeight: 500, overflowY: 'auto' }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: '18px' }}>SNo</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: '18px' }}>Role</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: '18px' }}>Email</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: '18px' }}>Password</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: '18px' }}>Update</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredManagement.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <p>No Management Person Available</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredManagement.map((person, index) => (
                                        <ManagementPerson 
                                            key={index} 
                                            Management={Management} 
                                            management={person} 
                                            sNo={index + 1} 
                                        />
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default Management;
