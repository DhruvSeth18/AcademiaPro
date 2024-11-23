import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClasses } from "../api/api"; // Ensure correct path
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, TextField } from "@mui/material";

const Class = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [newClassDetails, setNewClassDetails] = useState({
        className: "",
        numSections: "",
    }); // State for new class details

    const availableClasses = [
        "Nursery",
        "UKG",
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
    ]; // List of all available classes

    useEffect(() => {
        // Fetch class data
        const fetchClasses = async () => {
            try {
                const response = await getAllClasses();
                if (response.status === true) {
                    setClasses(response.data); // Update state with fetched data
                } else {
                    console.error("Failed to fetch classes");
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, []);

    const handleClose = () => {
        setDialog(false);
    };

    const handleAddClassClick = () => {
        setDialog(true); // Open the dialog when clicked
    };

    const handleSubmit = () => {
        console.log("New Class Details:", newClassDetails);
        // Add logic to send this data to the backend
        setDialog(false);
    };

    const handleChange = (key, value) => {
        setNewClassDetails((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <>
            <Dialog className="border-2 rounded-lg" onClose={handleClose} open={dialog}>
                <div className="w-[350px] h-[350px] border-2 rounded-lg flex flex-col justify-center items-center relative p-4">
                    <CloseIcon
                        onClick={() => setDialog(false)}
                        sx={{ fontSize: "25px", color: "blue" }}
                        className="absolute top-2 right-2 cursor-pointer"
                    />
                    <p className="text-3xl font-bold relative bottom-2 mb-4">Add Class</p>
                    <div className="flex flex-col gap-3 w-full">
                        <select
                            className="border p-2 rounded-md w-full"
                            value={newClassDetails.className}
                            onChange={(e) => handleChange("className", e.target.value)}
                        >
                            <option value="" disabled>Select a class</option>
                            {availableClasses
                                .filter((cls) => !classes.includes(cls)) // Exclude already existing classes
                                .map((cls, index) => (
                                    <option key={index} value={cls}>
                                        {cls}
                                    </option>
                                ))}
                        </select>
                        <input
                            type="number"
                            className="border p-2 rounded-md w-full"
                            value={newClassDetails.numSections}
                            onChange={(e) => handleChange("numSections", e.target.value)}
                            min="1"
                            max="5"
                            placeholder="Enter number of sections"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Dialog>
            <div className="w-[100%] h-[100vh] pt-[100px]">
                <div className="ml-[15px] mr-[15px] sm:ml-[150px] sm:mr-[150px]">
                    <div className="flex justify-between">
                        <p className="text-[50px] mb-[20px] font-bold">Classes</p>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                        {classes.map((className, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/class/${className.toLowerCase()}`)}
                                className="w-[100%] sm:w-[156px] hover:scale-110 border-[3px] border-black hover:border-[3px] hover:border-blue-500 text-black h-[120px] rounded-lg flex justify-center items-center cursor-pointer"
                            >
                                <p className="text-[25px] font-bold">{className}</p>
                            </div>
                        ))}
                        <div
                            onClick={handleAddClassClick} // Open dialog on div click
                            className="w-[100%] sm:w-[156px] hover:scale-110 border-[3px] border-black hover:border-[3px] hover:border-blue-500 text-black h-[120px] rounded-lg flex justify-center items-center cursor-pointer"
                        >
                            <AddIcon sx={{ fontSize: "40px" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Class;
