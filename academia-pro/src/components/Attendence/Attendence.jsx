import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useContext } from 'react';
import { ClassStudent } from '../api/api';
import { UserContext } from '../context/userContext';
import Student from './Student';  // Assuming this component will handle each row's display
import TextField from '@mui/material/TextField';  // For Search Bar

const Attendance = () => {
    const [students, setStudents] = useState([]); // State to hold student data
    const [filteredStudents, setFilteredStudents] = useState([]); // State to hold filtered students
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [loading, setLoading] = useState(true);  // State to handle loading state
    const { user, isUser } = useContext(UserContext); // Context to fetch current user's class

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                if (isUser === true) {
                    const response = await ClassStudent(user.class); // Fetch student data from API
                    setStudents(response.class.students); // Update the student state with fetched data
                    setFilteredStudents(response.class.students); // Initialize filtered data
                }
            } catch (error) {
                console.error("Error fetching students:", error); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };
        fetchStudent();
    }, []); // Empty dependency array means this effect runs once after initial render

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter students based on rollNumber or username
        const filtered = students.filter(student =>
            String(student.rollNumber).toLowerCase().includes(query) || // Search by roll number
            student.username.toLowerCase().includes(query) // Search by name (if needed)
        );
        setFilteredStudents(filtered); // Update the filtered students state
    };

    if (loading) {
        return (
            <div className="pt-[100px] w-[100%] h-[100vh] flex justify-center items-center">
                <p>Loading...</p> {/* Show loading message */}
            </div>
        );
    }

    return (
        <>
            <div className="pt-[100px] w-[100%] pb-12 h-[100vh] flex justify-center">
                <div className="w-[100%] sm:w-[85%] md:w-[60%] pl-4 pr-4 pb-4 custom-scroll">
                    <div className="mb-4">
                        <TextField
                            label="Search by Roll Number or Name"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="w-[100%]">
                        <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
                            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="attendance table">
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
                                    {filteredStudents.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
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

export default Attendance;
