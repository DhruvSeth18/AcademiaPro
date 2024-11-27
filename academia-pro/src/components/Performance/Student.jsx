import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import { UpdateStudentExam } from '../api/api';
import { toast } from 'react-toastify';

const initialExamState = {
    subject: '',
    examName: '',
    marks: '',
    maxMarks: '',
};

const subjects = ["Mathematics", "English", "Science", "Social Studies", "History", "Geography", "Political Science", "Economics", "Physics", "Chemistry", "Biology", "Computer Science", "Environmental Science", "Physical Education", "Art", "Music", "Drama", "Fine Arts", "Health Education"];
const exams = [
    'First Term',
    'Second Term',
    'Third Term',
    'Fourth Term',
    'First Mid-Term',
    'Second Mid-Term',
    'Final Exam'
];

const Student = ({ row, sNo }) => {
    const [exam, setExam] = useState(initialExamState);
    const [update, setUpdate] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExam((prevExam) => ({ ...prevExam, [name]: value }));
    };

    const toastSuccess = () => {
        toast.success('Exam Updated Successfully', {
            position: 'top-center',
            className: 'toast',
            autoClose: 2000,
        });
    };

    const updateExam = async () => {
        const response = await UpdateStudentExam(row._id, exam);
        if (response.status && response.status === true) {
            console.log('Update Exam SuccessFully');
            toastSuccess();
            setUpdate(true);
        }
    };

    return (
        <>
            <TableRow key={sNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell className="text-red-800" align="center">
                    {sNo}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.rollNumber}
                </TableCell>
                <TableCell align="center">
                    <FormControl fullWidth disabled={update}>
                        <InputLabel>Subject</InputLabel>
                        <Select
                            className="w-[110px]"
                            name="subject"
                            value={exam.subject}
                            onChange={handleInputChange}
                        >
                            {subjects.map((subject, index) => (
                                <MenuItem key={index} value={subject}>
                                    {subject}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="center">
                    <FormControl fullWidth disabled={update}>
                        <InputLabel>Exam</InputLabel>
                        <Select
                            className="w-[110px]"
                            name="examName"
                            value={exam.examName}
                            onChange={handleInputChange}
                        >
                            {exams.map((exam, index) => (
                                <MenuItem key={index} value={exam}>
                                    {exam}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="center">
                    <TextField
                        disabled={update}
                        className="w-[80px]"
                        type="number"
                        variant="outlined"
                        label="Marks"
                        name="marks"
                        value={exam.marks}
                        onChange={handleInputChange}
                    />
                </TableCell>
                <TableCell align="center">
                    <TextField
                        disabled={update}
                        className="w-[120px]"
                        type="number"
                        variant="outlined"
                        label="Max Marks"
                        name="maxMarks"
                        value={exam.maxMarks}
                        onChange={handleInputChange}
                    />
                </TableCell>
                <TableCell align="center">
                    <button
                        onClick={updateExam}
                        className="hover:scale-110 active:scale-95"
                        style={{
                            padding: '10px',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            border: '2px solid black',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                        }}
                    >
                        Update
                    </button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default Student;
