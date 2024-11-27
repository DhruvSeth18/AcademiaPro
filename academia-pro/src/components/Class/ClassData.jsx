import { useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom"
import Student from "./Student";
import { GetStudents } from "../api/api";
import { Button, Dialog, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ClassData = () => {
    const { className, sectionName } = useParams();
    const [openDialog, setOpenDialog] = useState(false);

    const [newUser, setNewUser] = useState({
        username: '',
        rollNumber: '',
        password: '',
        className: className,
        sectionName: sectionName
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        const getStudents = async () => {
            const response = await GetStudents({ className, sectionName });
            console.log(response);
            if (response.status && response.status === true) {
                setData(response.data.students);
                console.log(response.data.students);
            }
        }
        getStudents();
    }, []);
    
    const handleInputChange = (field, value) => {
        setNewUser((prev) => ({ ...prev, [field]: value }));
        console.log();
    };

    const generateRandomPassword = () => {
        const randomPassword = Math.random().toString(36).slice(-8);
        setNewUser((prev) => ({ ...prev, password: randomPassword }));
    };

    const handleCreateUser = () => {
        // Further logic to handle user creation
        console.log("User data:", newUser);
    };

    const handleClose = () => setOpenDialog(false);

    return (<>
        <div className="w-full h-[100vh] flex pt-[130px] justify-center">
            <Dialog onClose={handleClose} open={openDialog}>
                <div className='w-[330px] p-5 relative'>
                    <CloseIcon sx={{ fontSize: '28px' }} className='absolute top-2 right-2 cursor-pointer text-blue-500' onClick={handleClose} />
                    <div className='pt-[20px]'>
                        <p className='text-center text-2xl font-bold text-blue-700'>Add User</p>
                    </div>
                    <div className='mt-5 space-y-4'>
                        <TextField label="Username" fullWidth variant="outlined" value={newUser.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                        <TextField label="Roll Number" fullWidth variant="outlined" value={newUser.rollNumber} onChange={(e) => handleInputChange('rollNumber', e.target.value)} />
                        <div className="flex items-center space-x-2">
                            <TextField label="Password" variant="outlined" value={newUser.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-3/4" />
                            <Button sx={{ padding: "15px 20px" }} variant="contained" color="primary" onClick={generateRandomPassword} className="w-2/4">Generate</Button>
                        </div>
                        <div className='flex gap-2'>
                            <FormControl fullWidth disabled>
                                <InputLabel>Class Name</InputLabel>
                                <Select value={newUser.className}>
                                    <MenuItem value={newUser.className}>{newUser.className}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth disabled>
                                <InputLabel>Section Name</InputLabel>
                                <Select value={newUser.sectionName}>
                                    <MenuItem value={newUser.sectionName}>{newUser.sectionName}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button onClick={handleCreateUser} sx={{ padding: "10px 20px", letterSpacing: '1px', fontSize: '15px' }} variant="contained" color="primary">Create</Button>
                    </div>
                </div>
            </Dialog>
            <div className="h-[50px] absolute bottom-3 right-3 mb-[20px] flex justify-end items-center">
                <Button sx={{ padding: "10px 20px", marginRight: "20px" }} onClick={()=>setOpenDialog(true)} className="cursor-pointer" variant="contained">
                    Add Student
                </Button>
            </div>
            <div className=" w-[85%] sm:w-[80%] md:w-[50%] h-[200px] ">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            {
                                data.map((student, index) => (
                                    <Student key={student._id} row={student} sNo={index + 1} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    </>)
}
export default ClassData;   