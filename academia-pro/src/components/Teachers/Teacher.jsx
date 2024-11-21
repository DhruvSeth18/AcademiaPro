import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
const initialExamState = {
    subject: '',
    examName: '',
    marks: '',
    maxMarks: '',
}
const schoolSubjects = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Business Studies",
    "Environmental Science",
    "Psychology",
    "Philosophy",
    "Sociology",
    "Physical Education",
    "Art",
    "Music",
    "Drama",
    "Fine Arts",
    "Health Education",
    "Technology",
    "Home Economics",
    "Foreign Language"
];


const Teacher = ({ uniqueClass, teacher, sNo }) => {
    const [exam, setExam] = useState(initialExamState);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [allClass, setClass] = useState([]);
    const [classSection, setClassSection] = useState([]);
    const handleClassChange = () => {
        const newClassSectionList = [];
        for (const className in uniqueClass) {
            if (className === "4th") { 
                newClassSectionList.push(...uniqueClass[className]);
            }
        }
        setClassSection(newClassSectionList);
    };
    useState(() => {
        const newClassList = [];
        const newClassSectionList = [];
        for (const className in uniqueClass) {
            newClassList.push(className);
            newClassSectionList.push(uniqueClass[className]);
        }
        setClassSection(newClassSectionList);
        setClass(newClassList);
    }, [])

    return (
        <>
            <TableRow key={sNo} sx={{ '&:last-child td, &:last-child th': { border: 0, paddingTop: `${openUpdate ? '0px' : '15px'}`, paddingBottom: `${openUpdate ? '0px' : '15px'}` } }}>
                <TableCell className='text-red-800' align='center'>{sNo}</TableCell>
                <TableCell align='center' component="th" scope="row">{teacher.name}</TableCell>
                {
                    openUpdate ? <>
                        <TableCell align='center'>
                            <FormControl sx={{ m: 1, minWidth: 110 }}>
                                <InputLabel id="demo-simple-select-disabled-label">Sub</InputLabel>
                                <Select className='scale-90' labelId="demo-simple-select-disabled-label" id="demo-simple-select-disabled" label="subject">
                                    {
                                        schoolSubjects.map((subject, index) => {
                                            return (<MenuItem value={subject}>{subject}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell align='center'>
                            <FormControl sx={{ m: 1, minWidth: 90 }}>
                                <InputLabel id="demo-simple-select-disabled-label">Class</InputLabel>
                                <Select className='scale-90' onChange={handleClassChange} labelId="demo-simple-select-disabled-label" id="demo-simple-select-disabled" label="subject">
                                    {
                                        allClass.map((subject, index) => {
                                            return (<MenuItem value={subject}>{subject}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell align='center'>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="demo-simple-select-disabled-label">Sec</InputLabel>
                                <Select className='scale-90' labelId="demo-simple-select-disabled-label" id="demo-simple-select-disabled" label="subject">
                                    {
                                        classSection.map((subject, index) => {
                                            return (<MenuItem value={subject}>{subject}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell align='center'> <TextField className='w-[150px] scale-90' variant="outlined" label="Email" name="email" value={teacher.email} /> </TableCell>
                        <TableCell align='center'><TextField className='w-[120px] scale-90' variant="outlined" label="Password" value={teacher.password} name="password" /></TableCell>
                    </> : <>
                        <TableCell className='text-red-800' align='center'>{teacher.subject}</TableCell>
                        <TableCell align='center' component="th" scope="row">{teacher.class.className}</TableCell>
                        <TableCell align='center' component="th" scope="row">{teacher.class.sectionName}</TableCell>
                        <TableCell align='center' component="th" scope="row">{teacher.email}</TableCell>
                        <TableCell align='center' component="th" scope="row">{teacher.password}</TableCell>
                    </>
                }
                <TableCell align='center'>
                    <button
                        onClick={() => setOpenUpdate(!openUpdate)}
                        className='hover:scale-110 active:scale-95'
                        style={{
                            padding: '8px',
                            fontSize: '12px',
                            paddingLeft: '10px',
                            paddingRight: "10px",
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

export default Teacher;
