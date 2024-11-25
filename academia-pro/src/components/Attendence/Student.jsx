import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { MarkAttendance , GetStudentAttendence} from '../api/api';
import { useState,useEffect,useContext} from 'react';
import { UserContext } from '../context/userContext';

const Student = ({row,sNo}) => {
    const [mark,SetMark] = useState(false);
    const {user,isUser} = useContext(UserContext);

    useEffect(()=>{
        const getAttendence = async ()=>{
            if(isUser===true){
                const response = await GetStudentAttendence(row._id,user.class);
                console.log(response);
                SetMark(response.marked);
            }
        }
        getAttendence();
    },[]);

    const markAttendence = async ()=>{
        const response = await MarkAttendance(row._id,user.class);
        SetMark(response.marked);
    }

    return (<>
        <TableRow key={sNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell className=' text-red-800' align='center'>{sNo}</TableCell>
            <TableCell align='center' component="th" scope="row">{row.username}</TableCell>
            <TableCell align='center'>{row.rollNumber}</TableCell>
            <TableCell align='center'>{row.password}</TableCell>
            <TableCell align='center'>
                <div>
                    <button onClick={markAttendence} className={mark?'bg-black text-white':''} style={{ padding: '10px', border: '2px solid black', borderRadius: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>Present</button>
                </div>
            </TableCell>
        </TableRow>
    </>)
}
export default Student;