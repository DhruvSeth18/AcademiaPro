import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TextField, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import { useState, useEffect } from "react";

const initialExamState = { subject: "", className: "", section: "" };
const schoolSubjects = ["Mathematics", "English", "Science", "Social Studies", "History", "Geography", "Political Science", "Economics", "Physics", "Chemistry", "Biology", "Computer Science", "Environmental Science", "Physical Education", "Art", "Music", "Drama", "Fine Arts", "Health Education"];
const availableClasses = ["Nursery", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const sections = ["A", "B", "C", "D", "E"];

const Teacher = ({ teacher, sNo, getAllTeachers }) => {
    const [exam, setExam] = useState(initialExamState);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [updatedFields, setUpdatedFields] = useState({});

    useEffect(() => {
        if (openUpdate) {
            setExam({
                subject: teacher.subject || "",
                className: teacher.class?.className || "",
                section: teacher.class?.sectionName || "",
            });
        }
    }, [openUpdate, teacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExam({ ...exam, [name]: value });
        setUpdatedFields({ ...updatedFields, [name]: value });
        console.log("Updated Fields:", { ...updatedFields, [name]: value });
    };

    const handleSubmitUpdates = async () => {
        try {
            // Merge the updated fields with the teacher object
            const updatedTeacher = { ...teacher, ...updatedFields };
            await getAllTeachers();
            console.log("Updated Teacher:", updatedTeacher);
        } catch (error) {
            console.error("Error updating teacher details:", error);
        }
        setOpenUpdate(false); // Close the update form
        setUpdatedFields({}); // Clear updated fields
    };

    return (
        <TableRow key={sNo} sx={{ "&:last-child td, &:last-child th": { border: 0, padding: openUpdate ? "0px" : "15px" } }}>
            <TableCell className="text-red-800" align="center">{sNo}</TableCell>
            {openUpdate ? (
                <>
                    <TableCell align="center">
                        <FormControl sx={{ m: 1, minWidth: 110 }}>
                            <InputLabel>Subject</InputLabel>
                            <Select value={exam.subject} onChange={handleChange} name="subject">
                                {schoolSubjects && schoolSubjects.map((subject, i) => (
                                    <MenuItem key={i} value={subject}>{subject}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="center">
                        <FormControl sx={{ m: 1, minWidth: 90 }}>
                            <InputLabel>Class</InputLabel>
                            <Select value={exam.className} onChange={handleChange} name="className">
                                {availableClasses && availableClasses.map((className, i) => (
                                    <MenuItem key={i} value={className}>{className}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="center">
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel>Section</InputLabel>
                            <Select value={exam.section} onChange={handleChange} name="section">
                                {sections && sections.map((section, i) => (
                                    <MenuItem key={i} value={section}>{section}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="center">
                        <TextField className="w-[200px]" variant="outlined" label="Email" defaultValue={teacher.email} onChange={handleChange} name="email" />
                    </TableCell>
                    <TableCell align="center">
                        <TextField className="w-[130px]" variant="outlined" label="Password" defaultValue={teacher.password} onChange={handleChange} name="password" />
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell align="center">{teacher.subject}</TableCell>
                    <TableCell className="text-red-800" align="center">{teacher.class?.className || "-"}</TableCell>
                    <TableCell align="center">{teacher.class?.sectionName || "-"}</TableCell>
                    <TableCell align="center">{teacher.email}</TableCell>
                    <TableCell align="center">{teacher.password}</TableCell>
                </>
            )}
            <TableCell align="center">
                {openUpdate ? (
                    <button onClick={handleSubmitUpdates} className="hover:scale-110 active:scale-95" style={{ padding: "8px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px", border: "2px solid black", borderRadius: "10px", fontWeight: "bold", letterSpacing: "1px" }}>Save</button>
                ) : (
                    <button onClick={() => setOpenUpdate(true)} className="hover:scale-110 active:scale-95" style={{ padding: "8px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px", border: "2px solid black", borderRadius: "10px", fontWeight: "bold", letterSpacing: "1px" }}>Update</button>
                )}
            </TableCell>
        </TableRow>
    );
};

export default Teacher;
