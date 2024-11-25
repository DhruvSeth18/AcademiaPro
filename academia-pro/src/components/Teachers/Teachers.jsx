import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getTeachers, getClass } from '../api/api';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Teacher from './Teacher';
import { Button, Dialog} from '@mui/material';

const Teachers = () => {
    const [allTeachers, setAllTeachers] = useState([]);
    const [uniqueClass, setUniqueClass] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    
    const getAllTeachers = async () => {
        const response = await getTeachers();
        if (response.status && response.status === true) {
            setAllTeachers(response.data);
        }
    };
    useEffect(() => {
        getAllTeachers();
    }, []);

    // const handleUpdateTeacher = (updatedTeacher) => {
    //     setAllTeachers((prevTeachers) =>
    //         prevTeachers.map((teacher) =>
    //             teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    //         )
    //     );
    // };

    const handleClose = () => setOpenDialog(false);

    return (
        <>
            <div className="mt-[80px] w-[100%] flex justify-center">
                <Dialog open={openDialog}>
                    <div className=""></div>
                </Dialog>
                <div className="w-[100%] sm:w-[85%] md:w-[78%] p-5 overflow-auto custom-scroll">
                    <div className="h-[50px] absolute bottom-3 right-3 mb-[20px] flex justify-end items-center">
                        <Button sx={{ padding: "10px 20px", marginRight: "20px" }} className="cursor-pointer" variant="contained">
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
                                    {allTeachers && allTeachers.map((teacher, index) => (
                                        <Teacher key={teacher.id} uniqueClass={uniqueClass} teacher={teacher} sNo={index + 1} getAllTeachers={getAllTeachers} />
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

export default Teachers;