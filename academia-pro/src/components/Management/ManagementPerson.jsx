import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TextField, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { updateManagement, removeManagement} from "../api/api";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';

const roles = ["Principal", "Vice Principal", "Management"];

const ManagementPerson = ({ management, sNo, Management }) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [updatedFields, setUpdatedFields] = useState({
        role: management.role,
        email: management.email,
        password: management.password,
    });

    useEffect(() => {
        if (openUpdate) {
            setUpdatedFields({
                role: management.role || "",
                email: management.email || "",
                password: management.password || "",
            });
        }
    }, [openUpdate, management]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFields({ ...updatedFields, [name]: value });
    };

    // Success Toast Notification
    const toastSuccess = (message) => {
        toast.success(message, {
            position: 'top-center',
            className: "toast",
            autoClose:1500
        });
    };

    // Error Toast Notification
    const toastFail = (message) => {
        toast.error(message, {
            position: 'top-center',
            className: "toast",
        });
    };

    const deleteManagement = async ()=>{
        const response = await removeManagement(management._id);
        if(response.status===true){
            toastSuccess("Management person Deleted ");
            Management();
        } else {
            toastFail(response.message || "Failed to delete Management");
        }
    }

    const handleSubmitUpdates = async () => {
        try {
            const response = await updateManagement(management._id, updatedFields);
            if (response.status === true) {
                toastSuccess("Management person updated ");
                Management();
            } else {
                toastFail(response.message || "Failed to update management person.");
            }
        } catch (error) {
            toastFail("Error while updating management person.");
        }
        setOpenUpdate(false);
    };

    return (
        <TableRow key={sNo} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{sNo}</TableCell>
            {openUpdate ? (
                <>
                    <TableCell align="center">
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel>Role</InputLabel>
                            <Select name="role" value={updatedFields.role} onChange={handleChange}>
                                {roles.map((role, i) => (
                                    <MenuItem key={i} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="center">
                        <TextField
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={updatedFields.email}
                            onChange={handleChange}
                        />
                    </TableCell>
                    <TableCell align="center">
                        <TextField
                            className="w-[120px]"
                            variant="outlined"
                            label="Password"
                            name="password"
                            value={updatedFields.password}
                            onChange={handleChange}
                        />
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
                <div className="flex justify-center">
                    <div className="flex gap-2">
                    {openUpdate ? (
                        <button onClick={handleSubmitUpdates} className="hover:scale-110 active:scale-95"
                            style={{
                                padding: "8px",
                                fontSize: "12px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                border: "2px solid white",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                letterSpacing: "1px",
                            }}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setOpenUpdate(true)}
                            className="hover:scale-110 active:scale-95"
                            style={{
                                padding: "8px",
                                fontSize: "12px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                border: "2px solid white",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                letterSpacing: "1px",
                            }}
                        >
                            Update
                        </button>
                    )}
                    <DeleteIcon sx={{fontSize:"28px"}} onClick={deleteManagement} className="text-red-600 relative top-[3.5px] cursor-pointer"/>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default ManagementPerson;