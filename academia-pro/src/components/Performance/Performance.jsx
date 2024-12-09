import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useContext } from 'react';
import { ClassStudent } from '../api/api';
import Student from './Student';
import { UserContext } from '../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

const Performance = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { user, isUser } = useContext(UserContext);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                if (isUser === true) {
                    const response = await ClassStudent(user.class);
                    setStudents(response.class.students);
                    setFilteredStudents(response.class.students);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = students.filter(student =>
            (student.rollNumber && String(student.rollNumber).toLowerCase().includes(query)) ||
            (student.username && student.username.toLowerCase().includes(query)) ||
            (student.subject && student.subject.toLowerCase().includes(query))
        );
        setFilteredStudents(filtered);
    };


    if (loading) {
        return (
            <div className="pt-[100px] w-[100%] h-[100vh] flex justify-center items-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
            <div className="pt-[100px] h-[100vh] pb-12 overflow-y-auto w-[100%] flex justify-center">
                <div className="w-[100%] sm:w-[85%] md:w-[70%] p-4 pt-0 custom-scroll">
                    <div className="mb-4">
                        <TextField
                            label="Search by Roll Number, Name or Subject"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="w-[100%] color-black cursor-pointer">
                        <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
                            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="performance table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>SNo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Roll</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Subject</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Exam</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Marks</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Max Marks</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Submit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredStudents.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <p>No students found</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredStudents.map((student, index) => (
                                            <Student key={student._id} row={student} sNo={index + 1} />
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

export default Performance;
