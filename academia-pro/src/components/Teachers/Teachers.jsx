import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getTeachers,getClass } from '../api/api';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Teacher from './Teacher';
const Teachers = () => {
    const [allTeachers,setAllTeachers] = useState([]);
    const [uniqueClass,setUniqueClass] = useState([]);
    useEffect(()=>{
        const getAllTeachers = async ()=>{
            const response = await getTeachers();
            if(response.status && response.status==="success"){
                setAllTeachers(response.data);
            }
        }
        const getAllClass = async ()=>{
            const response = await getClass();
            if(response.status && response.status==='success'){
                const classSections = response.data.reduce((acc, item) => {
                    if (!acc[item.className]) {
                        acc[item.className] = new Set();
                    }
                    acc[item.className].add(item.sectionName);
                    return acc;
                }, {});
                const classSectionsArray = Object.fromEntries(
                    Object.entries(classSections).map(([key, value]) => [key, [...value]])
                );
                console.log(classSectionsArray);
                setUniqueClass(classSectionsArray);
            }
        }
        getAllClass();
        getAllTeachers();
    },[])
    return (
        <>
            <div className="mt-[140px] w-[100%] flex justify-center">
                <div className="w-[100%] sm:w-[85%] md:w-[78%] p-5 overflow-auto custom-scroll">
                    <div className="w-[100%] color-black">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>SNo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Class</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Subject</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Class</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Section</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Email</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Password</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: '18px' }}>Update</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    allTeachers.map((teacher,index)=>{
                                        return (
                                            <Teacher uniqueClass={uniqueClass} teacher={teacher} sNo={index+1}/>
                                        )
                                    })
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teachers;
