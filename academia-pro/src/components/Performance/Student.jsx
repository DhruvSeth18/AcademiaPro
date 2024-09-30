import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { UpdateStudentExam } from '../api/api';

const initialExamState = {
    subject: '',
    examName: '',
    marks: '',
    maxMarks: '',
}

const Student = ({ row, sNo }) => {
    const [exam, setExam] = useState(initialExamState);

    const handleSubjectChange = (e) => {
        setExam(prevExam => ({...prevExam,[e.target.name]: e.target.value}));
        console.log(exam);
    };

    const updateExam = async ()=>{
        const response = await UpdateStudentExam(row._id,exam);
        if(response.status && response.status=="success"){
            console.log("Update Exam SuccessFulle");
        }
    }

    return (
        <>
            <TableRow key={sNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell className='text-red-800' align='center'>{sNo}</TableCell>
                <TableCell align='center' component="th" scope="row">{row.rollNumber}</TableCell>
                <TableCell align='center'><TextField className='w-[110px]' variant="outlined" label="Subject" name="subject" value={exam.subject} onChange={handleSubjectChange}/></TableCell>
                <TableCell align='center'><TextField className='w-[110px]' variant="outlined" label="Exam" name="examName" value={exam.examName} onChange={handleSubjectChange}/></TableCell>
                <TableCell align='center'> <TextField className='w-[80px]' type="number" variant="outlined" label="Marks" name="marks" value={exam.marks} onChange={handleSubjectChange} /> </TableCell>
                <TableCell align='center'><TextField className='w-[120px]' type="number" variant="outlined" label="Max Marks" name="maxMarks" value={exam.maxMarks} onChange={handleSubjectChange}/></TableCell>
                <TableCell align='center'>
                    <button
                        onClick={updateExam}
                        className='hover:scale-110 active:scale-95'
                        style={{
                            padding: '10px',
                            paddingLeft: '15px',
                            paddingRight: "15px",
                            border: '1px solid white',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            letterSpacing: '1px'
                        }}
                    >
                        Update
                    </button>
                </TableCell>
            </TableRow>
        </>
    );
}

export default Student;
