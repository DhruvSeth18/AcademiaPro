import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';

const generatePassword = (length = 12) => {
    console.log('Generating password...'); // Check if function is being called
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += chars[randomIndex];
    }

    console.log('Generated password:', generatedPassword); // Check the generated password
    // setPassword(generatedPassword);
};


function createData(sNo,email, position, password) {
    return { sNo ,email, position, password };
}

const rows = [
    createData(1,'dhruv@gmail.com','Head','@Behappy'),
    createData(2,'deepankar@gmail.com','beta',"cheen tapak"),
    createData(3,'eclair@gmail.com','some','post@12'),
];

const BasicTable = ()=> {
    return (
        <TableContainer componentmponent={Paper}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{fontWeight:"bold",letterSpacing:"1.5px",fontSize:'16px'}}>SNo</TableCell>
                        <TableCell align='center' sx={{fontWeight:"bold",letterSpacing:"1.5px",fontSize:'16px'}}>Authority Email</TableCell>
                        <TableCell align='center' sx={{fontWeight:"bold",letterSpacing:"1.5px",fontSize:'16px'}}>Position</TableCell>  
                        <TableCell align='center' sx={{fontWeight:"bold",letterSpacing:"1.5px",fontSize:'16px'}}>Password</TableCell>  
                        <TableCell align="center" sx={{fontWeight:"bold",letterSpacing:"1.5px",fontSize:'16 px'}}>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.email}
                            sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center'>
                                {row.sNo}
                            </TableCell>
                            <TableCell align='center'  component="th" scope="row">{row.email}</TableCell>
                            <TableCell align='center'>{row.position}</TableCell>
                            <TableCell align='center'>{row.password}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align='center'></TableCell>
                        <TableCell align='center'  component="th" scope="row">
                            <TextField variant='standard' className='text-black outline-none p-[3px]' type="text" />
                        </TableCell>
                        <TableCell align='center'>
                            <TextField className='text-black outline-none p-[3px] items-center w-[80px]' type="text" />
                        </TableCell>
                        <TableCell align='center'>
                            <TextField className='text-black outline-none p-[3px] w-[100px]' type="text" />
                        </TableCell>
                        
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default BasicTable;