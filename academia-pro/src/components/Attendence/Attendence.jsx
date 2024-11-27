import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Student from './Student';
import { useEffect, useState,useContext} from 'react';
import { ClassStudent } from '../api/api';
import { UserContext } from '../context/userContext';

const Attendence = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user,isUser} = useContext(UserContext);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                if(isUser===true){
                    const response = await ClassStudent(user.class); // Fetch student data from API
                    setStudents(response.class.students); // Update the student state with fetched data
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };
        fetchStudent();
    }, []);

    return (
        <>
            <div className="pt-[100px] h-[100vh] w-[100%] flex justify-center">
                <div className="w-[100%] sm:w-[85%] md:w-[60%] p-5 overflow-auto custom-scroll">
                    <div className="w-[100%] color-black">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>SNo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Student Name</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Student Roll</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Password</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        students.map((student, index) => (
                                            <Student key={student._id} row={student} sNo={index + 1} />
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Attendence;
