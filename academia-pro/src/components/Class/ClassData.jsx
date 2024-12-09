import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Dialog, TextField, Select, MenuItem, InputLabel, FormControl, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import { GetStudents, addStudentAccount } from "../api/api";
import Student from "./Student";

const ClassData = () => {
    const { className, sectionName } = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [newUser, setNewUser] = useState({
        username: '',
        rollNumber: '',
        password: '',
        className,
        sectionName
    });

    const getStudents = async () => {
        const response = await GetStudents({ className, sectionName });
        if (response.status) {
            setData(response.data.students);
        }
    };

    useEffect(() => { getStudents(); }, []);

    const toastSuccess = (message) => toast.success(message, { position: 'top-center', autoClose: 1500 });
    const toastFail = (message) => toast.error(message, { position: 'top-center', autoClose: 1500 });

    const handleInputChange = (field, value) => setNewUser((prev) => ({ ...prev, [field]: value }));
    const generateRandomPassword = () => handleInputChange('password', Math.random().toString(36).slice(-8));
    const handleClose = () => setOpenDialog(false);

    const handleCreateUser = async () => {
        const response = await addStudentAccount(newUser);
        if (response.status) {
            toastSuccess(response.message || "Student Created Successfully");
            setOpenDialog(false);
            getStudents();
        } else {
            toastFail(response.message || "Failed to add Student");
        }
    };

    const filteredData = data.filter(student =>
        student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toString().includes(searchTerm)
    );

    return (
        <>
            <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
            <div className="w-full h-[100vh] pb-12 flex pt-[100px] justify-center">
                <Dialog onClose={handleClose} open={openDialog}>
                    <div className='w-[330px] p-5 relative bg-black border-2'>
                        <CloseIcon sx={{ fontSize: '28px' }} className='absolute top-2 right-2 cursor-pointer text-white' onClick={handleClose} />
                        <div className='pt-[20px]'>
                            <p className='text-center text-2xl font-bold text-white'>Add Student</p>
                        </div>
                        <div className='mt-5 space-y-4'>
                            <TextField label="Username" fullWidth variant="outlined" value={newUser.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                            <TextField label="Roll Number" fullWidth variant="outlined" value={newUser.rollNumber} onChange={(e) => handleInputChange('rollNumber', e.target.value)} />
                            <div className="flex items-center space-x-2">
                                <TextField label="Password" variant="outlined" value={newUser.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-3/4" />
                                <Button sx={{ padding: "15px 20px", backgroundColor: "#0079FF", color: "white" }} variant="contained" onClick={generateRandomPassword} className="w-2/4">Generate</Button>
                            </div>
                            <div className='flex gap-2'>
                                <FormControl fullWidth disabled>
                                    <InputLabel>Class Name</InputLabel>
                                    <Select value={newUser.className}><MenuItem value={newUser.className}>{newUser.className}</MenuItem></Select>
                                </FormControl>
                                <FormControl fullWidth disabled>
                                    <InputLabel>Section Name</InputLabel>
                                    <Select value={newUser.sectionName}><MenuItem value={newUser.sectionName}>{newUser.sectionName}</MenuItem></Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="flex justify-center mt-5">
                            <Button onClick={handleCreateUser} sx={{ padding: "10px 20px", letterSpacing: '1px', backgroundColor: "#0079FF", color: "white", fontSize: '15px' }} variant="contained">Create</Button>
                        </div>
                    </div>
                </Dialog>

                <div className="h-[50px] absolute bottom-3 right-3 mb-[20px] flex justify-end items-center">
                    <Button sx={{ padding: "10px 20px", marginRight: "20px", backgroundColor: "#0079FF", color: "white", letterSpacing: "1px" }} onClick={() => setOpenDialog(true)} variant="contained">Add Student</Button>
                </div>

                <div className="w-[85%] p-4 pt-0 sm:w-[80%] md:w-[50%]">
                    <TextField
                        label="Search Students"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>SNo</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Student Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Student Roll</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Password</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Exam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((student, index) => <Student key={student._id} row={student} sNo={index + 1} />)
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <p>No students found in this class and section.</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default ClassData;
