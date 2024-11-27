import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { addTeacher, getTeachers } from '../api/api';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Teacher from './Teacher';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { getSection,getClass} from '../api/api';

const schoolSubjects = ["Mathematics", "English", "Science", "Social Studies", "History", "Geography", "Political Science", "Economics", "Physics", "Chemistry", "Biology", "Computer Science", "Environmental Science", "Physical Education", "Art", "Music", "Drama", "Fine Arts", "Health Education"];


const Teachers = () => {
    const [allTeachers, setAllTeachers] = useState([]);
    // const [uniqueClass, setUniqueClass] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [useSection, setUseSection] = useState(false);
    const [classNames, setClassName] = useState([]);
    const [sectionNames, setSectionName] = useState([]);

    const [newTeacher, setNewTeacher] = useState({
        username: '',
        email: '',
        password: '',
        subject: '',
        className: '',
        sectionName: ''
    });

    const toastSuccess = (message)=>{
        toast.success("New Management added",{
            position:'top-center',
            className:"toast",
            autoClose:1500
        });
    }

    const toastFail = (message)=>{
        toast.error(message,{
            position:'top-center',
            className:"toast",
            autoClose:1500
        });
    }

    const getClasses = async ()=>{
        const response = await getClass();
        if(response.status===true){
            setClassName(response.data);
        }
    }

    const getAllTeachers = async () => {
        const response = await getTeachers();
        if (response.status && response.status === true) {
            setAllTeachers(response.data);
        }
    };
    
    useEffect(() => {
        getAllTeachers();
        getClasses();
    }, []);

    const handleInputChange = async (field, value) => {
        setNewTeacher((prev) => ({ ...prev, [field]: value }));

        if (field === "className") {
            setNewTeacher((prev) => ({ ...prev, sectionName: "" }));
            if (value) {
                await getSectionsForClass(value);
            }
        }
    };
    const getSectionsForClass = async (className) => {
        const response = await getSection(className);
        if (response.status === true) {
            setSectionName(response.data);
            setUseSection(true);
        } else {
            setSectionName([]);
            setUseSection(false);
        }
    };

    const createteacher = async ()=>{
        const response = await addTeacher(newTeacher);
        if(response.status===true){
            toastSuccess("Teacher is Created");
            getAllTeachers();
            setOpenDialog(false);
        } else{
            toastFail(response.message || "Failed to Create Teacher");
        }
    }


    const generateRandomPassword = () => {
        const password = Math.random().toString(36).slice(-8); // Random password generator
        handleInputChange('password', password);
    };

    const handleClose = () => setOpenDialog(false);

    return (
        <>
            <ToastContainer style={{ scale: "0.95", paddingTop: "60px" }} />
            <div className="pt-[120px] overflow-y-auto h-[100vh] w-[100%] flex justify-center">
                <Dialog onClose={handleClose} open={openDialog}>
                    <div className='w-[330px] p-5 relative'>
                        <CloseIcon sx={{ fontSize: '28px' }} className='absolute top-2 right-2 cursor-pointer text-blue-500' onClick={handleClose} />
                        <div className='pt-[20px]'>
                            <p className='text-center text-2xl font-bold text-blue-700 tracking-wider'>Add Teacher</p>
                        </div>
                        <div className='mt-5 space-y-4'>
                            <TextField label="Username" fullWidth variant="outlined" value={newTeacher.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                            <TextField label="Email" fullWidth variant="outlined" value={newTeacher.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                            <div className="flex items-center space-x-2">
                                <TextField label="Password" variant="outlined" value={newTeacher.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-3/4" />
                                <Button sx={{ padding: "15px 20px" }} variant="contained" color="primary" onClick={generateRandomPassword} className="w-2/4">Generate</Button>
                            </div>

                            <FormControl fullWidth>
                                <InputLabel>Subject</InputLabel>
                                <Select value={newTeacher.subject} onChange={(e) => handleInputChange('subject', e.target.value)}>
                                    {schoolSubjects.map((subject, i) => <MenuItem key={i} value={subject}>{subject}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <div className='flex gap-2'>
                                <FormControl fullWidth >
                                    <InputLabel>Class Name</InputLabel>
                                    <Select className='w-[140px]' value={newTeacher.className} onChange={(e) => handleInputChange('className', e.target.value)}>
                                        {classNames.map((className, i) => <MenuItem key={i} value={className}>{className}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth disabled={!useSection}>
                                    <InputLabel>Section Name</InputLabel>
                                    <Select value={newTeacher.sectionName} onChange={(e) => handleInputChange('sectionName', e.target.value)}>
                                        {sectionNames.map((section, i) => <MenuItem key={i} value={section}>{section}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>

                        </div>
                        <div className="flex justify-center mt-5">
                            <Button onClick={createteacher} sx={{ padding: "10px 20px", letterSpacing: '1px', fontSize: '15px' }} variant="contained" color="primary">Create</Button>
                        </div>
                    </div>
                </Dialog>
                <div className="w-[100%] sm:w-[85%] md:w-[78%] p-5 overflow-auto custom-scroll">
                    <div className="h-[50px] absolute bottom-3 right-3 mb-[20px] flex justify-end items-center">
                        <Button sx={{ padding: "10px 20px", marginRight: "20px" }} onClick={() => setOpenDialog(true)} className="cursor-pointer" variant="contained">
                            Add Teacher
                        </Button>
                    </div>
                    <div className="w-[100%] color-black">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>SNo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Subject</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Class</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Section</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Email</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Password</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Update</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allTeachers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} align='center'>
                                                <strong style={{ fontSize: "25px" }}> No Teachers Available</strong>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        allTeachers.map((teacher, index) => (
                                            <Teacher
                                                key={teacher.id}
                                                teacher={teacher}
                                                sNo={index + 1}
                                                getAllTeachers={getAllTeachers}
                                            />
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teachers;