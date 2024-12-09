import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { UserContext } from "../context/userContext";
import { useEffect, useContext, useState } from "react";

const Profile = () => {
    const { user, isUser } = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (user && user.performance && user.performance.exams) {
            setData(user.performance.exams);
        }
    }, [user]);

    return (
        <div className="w-full h-screen bg-black flex flex-col md:flex-row gap-8 pt-[100px] p-[30px] overflow-auto">
            {/* Profile Section */}
            <div className="flex justify-center flex-col items-center gap-4 basis-1/3">
                <div className="flex flex-col gap-2">
                    <div className="w-64 h-64 rounded-full bg-yellow-300 overflow-hidden mb-4">
                        <img
                            className="w-full h-full object-cover"
                            src="https://via.placeholder.com/250" // Add actual image URL or state variable here
                            alt="Profile"
                        />
                    </div>
                    <p className="text-white tracking-wide text-2xl text-center">Name: {user.username}</p>
                    <p className="text-white tracking-wide text-2xl text-center">Roll: {user.rollNumber}</p>
                </div>
            </div>

            {/* Table Section */}
            <div className="flex justify-center basis-2/3">
                <div className="w-full max-w-4xl pb-[40px] md:pb-[100px] cursor-pointer">
                    <TableContainer component={Paper} className="bg-gray-800 max-h-[80vh] overflow-auto">
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className="text-white font-bold bg-gray-900">
                                        SNo
                                    </TableCell>
                                    <TableCell align="center" className="text-white font-bold bg-gray-900">
                                        Subject Name
                                    </TableCell>
                                    <TableCell align="center" className="text-white font-bold bg-gray-900">
                                        Exam Name
                                    </TableCell>
                                    <TableCell align="center" className="text-white font-bold bg-gray-900">
                                        Marks
                                    </TableCell>
                                    <TableCell align="center" className="text-white font-bold bg-gray-900">
                                        Max Marks
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" className="text-white">
                                            No exam records found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((exam, index) => (
                                        <TableRow key={exam._id} >
                                            <TableCell align="center" className="text-white">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="center" className="text-white">
                                                {exam.subject}
                                            </TableCell>
                                            <TableCell align="center" className="text-white">
                                                {exam.examName}
                                            </TableCell>
                                            <TableCell align="center" className="text-white">
                                                {exam.marks}
                                            </TableCell>
                                            <TableCell align="center" className="text-white">
                                                {exam.maxMarks}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default Profile;
