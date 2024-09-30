import { useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom"
import Student from "./Student";
import { GetStudents } from "../api/api";

const ClassData = ()=>{
    const { clas, classSection } = useParams();
    const [data,setData] = useState([]);

    useEffect(()=>{
        const getStudents= async ()=>{
            const response = await GetStudents({clas,classSection});
            console.log(response);
            if(response.status && response.status==="success"){
                setData(response.data.students);
                console.log(response.data.students);
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
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Student Email</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Roll</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Exam</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.map((student, index) => (
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
export default ClassData;   