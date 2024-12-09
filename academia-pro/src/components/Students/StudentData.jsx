import { useEffect, useState, useContext } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Student from './Student';
import { ClassStudent } from "../api/api";
import { UserContext } from '../context/userContext';

const StudentData = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { user, isUser } = useContext(UserContext);

    useEffect(() => {
        const getStudents = async () => {
            if (isUser) {
                const response = await ClassStudent(user.class);
                console.log(response);
                if (response.status === true) {
                    setData(response.class.students);
                    setFilteredData(response.class.students); // Initialize filtered data
                }
            }
        };
        getStudents();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Ensure rollNumber is treated as a string
        const filtered = data.filter((student) =>
            String(student.rollNumber).toLowerCase().includes(query) || // Convert rollNumber to string
            student.username.toLowerCase().includes(query)             // Check username
        );
        setFilteredData(filtered);
    };


    return (
        <>
            <div className="w-full h-[100vh] flex pb-12 pt-[100px] justify-center">
                <div className="w-[85%] p-0 sm:w-[80%] md:w-[50%]">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <TextField
                            label="Search by Roll Number"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

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
                                {filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <p>No students found</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((student, index) => (
                                        <Student key={student._id} row={student} sNo={index + 1} />
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

export default StudentData;
