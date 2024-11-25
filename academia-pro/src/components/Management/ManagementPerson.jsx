import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TextField, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";

const roles = ["Principal", "Vice Principal", "Management"];

const ManagementPerson = ({ management, sNo }) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [updatedFields, setUpdatedFields] = useState({
        role: management.role,
        email: management.email,
        password: management.password,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFields({ ...updatedFields, [name]: value });
    };

    const handleSubmitUpdates = () => {
        console.log("Updated Management Details:", updatedFields);
        setOpenUpdate(false); // Close update mode
    };

    return (
        <TableRow key={sNo} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{sNo}</TableCell>
            {openUpdate ? (
                <>
                    <TableCell align="center">
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel>Role</InputLabel>
                            <Select name="role" className="w-[100px]" value={updatedFields.role} onChange={handleChange} >
                                {roles.map((role, i) => (
                                    <MenuItem key={i} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="center">
                        <TextField variant="outlined" label="Email" name="email" value={updatedFields.email} onChange={handleChange} />
                    </TableCell>
                    <TableCell align="center">
                        <TextField variant="outlined" label="Password" className="w-[100px]" name="password" value={updatedFields.password} onChange={handleChange} />
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell align="center">{management.role}</TableCell>
                    <TableCell align="center">{management.email}</TableCell>
                    <TableCell align="center">{management.password}</TableCell>
                </>
            )}
            <TableCell align="center">
                {openUpdate ? (
                    <button onClick={handleSubmitUpdates} className="hover:scale-110 active:scale-95" style={{ padding: "8px", fontSize: "12px", paddingLeft: "10px", paddingRight: "10px", border: "2px solid black", borderRadius: "10px", fontWeight: "bold", letterSpacing: "1px"}} >
                        Save
                    </button>
                ) : (
                    <button onClick={() => setOpenUpdate(true)} className="hover:scale-110 active:scale-95" style={{ padding: "8px", fontSize: "12px" ,paddingLeft: "10px",paddingRight: "10px", border: "2px solid black", borderRadius: "10px", fontWeight: "bold", letterSpacing: "1px", }}>
                        Update
                    </button>
                )}
            </TableCell>
        </TableRow>
    );
};

export default ManagementPerson;
