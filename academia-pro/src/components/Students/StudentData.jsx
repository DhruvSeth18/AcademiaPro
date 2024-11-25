import { useEffect, useState,useContext} from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Student from './Student';
import { ClassStudent} from "../api/api";
import { UserContext } from '../context/userContext';

const StudentData = ()=>{
    const [data,setData] = useState([]);
    const {user,isUser} = useContext(UserContext);

    useEffect(()=>{
        const getStudents= async ()=>{
            if(isUser){
                const response = await ClassStudent(user.class);
                console.log(response);
                if(response.status===true){
                    // console.log("Here is the students data :  ",response.class.students);
                    setData(response.class.students);
                }
            }
        }
        getStudents();
    },[]);

    return (<>
        <div className="w-full h-[100vh] flex pt-[130px] justify-center">
            <div className=" w-[85%] sm:w-[80%] md:w-[50%] h-[200px] ">
            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                    {
                                        data && data.map((student, index) => (
                                            <Student key={student._id} row={student} sNo={index + 1} />
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
            </div>
        </div>
    </>)
}
export default StudentData;