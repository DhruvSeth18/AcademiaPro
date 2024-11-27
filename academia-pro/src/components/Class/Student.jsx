import React, { useState } from "react";
import { TableRow, TableCell, IconButton, TableContainer, Table, TableHead, TableBody, Paper, Collapse } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const Student = ({ row, sNo }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Main Table Row */}
            <TableRow className="cursor-pointer" onClick={() => setOpen(!open)}>
                <TableCell align="center">{sNo}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.rollNumber}</TableCell>
                <TableCell align="center">{row.password}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{position:'relative',left:'20px'}}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
            </TableRow>

            {/* Collapsible Table Row */}
            <TableRow>
                <TableCell colSpan={6} sx={{ padding:'0px',paddingRight:'10px'}}>
                    <Collapse in={open} timeout="auto">
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="nested table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Sub-SNo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Subject Name</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Exam Name</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Marks</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Max Marks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Example Sub-table data */}
                                    {row.performance.exams.map((subject, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{subject.subject}</TableCell>
                                            <TableCell align="center">{subject.examName}</TableCell>
                                            <TableCell align="center">{subject.marks}</TableCell>
                                            <TableCell align="center">{subject.maxMarks}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default Student;
