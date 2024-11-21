import { useNavigate } from "react-router-dom";

const Class = () => {
    const navigate = useNavigate();
    
    // Array of class names
    const classes = ["Nursery","UKG", "1st", "2nd", "3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];

    return (
        <>
            <div className="w-[100%] h-[100vh] pt-[100px]">
                <div className="ml-[15px] mr-[15px] sm:ml-[150px] sm:mr-[150px]">
                    <p className="text-white text-[50px] mb-[20px] font-bold">Classes</p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                        {classes.map((className, index) => ( 
                            <div key={index} onClick={() => navigate(`/class/${className.toLowerCase()}`)} className="w-[100%] sm:w-[156px] hover:scale-110 border-[3px] border-black hover:border-[3px] hover:border-blue-500 text-black h-[120px] rounded-lg flex justify-center items-center cursor-pointer">
                                <p className="text-[25px] font-bold">{className}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Class;
