import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { MarkAttendence,GetStudentAttendence} from '../api/api';
import { useState,useEffect} from 'react';

const Student = ({row,sNo}) => {
    const [mark,SetMark] = useState(false);
    useEffect(()=>{
        const getAttendence = async ()=>{
            const response = await GetStudentAttendence(row._id);
            console.log(response);
            SetMark(response.marked);
        }
        getAttendence();
    },[]);
    const markAttendence = async ()=>{
        const response = await MarkAttendence(row._id);
        SetMark(response.marked);
    }
    return (<>
        <TableRow key={sNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell className=' text-red-800' align='center'>{sNo}</TableCell>
            <TableCell align='center' component="th" scope="row">{row.name}</TableCell>
            <TableCell align='center'>{row.email}</TableCell>
            <TableCell align='center'>{row.rollNumber}</TableCell>
            <TableCell align='center'>
                <div>
                    <button onClick={markAttendence} className={mark?'bg-white text-black':''} style={{ padding: '10px', border: '2px solid white', borderRadius: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>Present</button>
                </div>
            </TableCell>
        </TableRow>
    </>)
}
export default Student;