import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSection } from "../api/api"; // Ensure correct path

const Section = () => {
    const { className } = useParams(); // Extract class name from URL params
    const navigate = useNavigate();
    const [classSections, setClassSections] = useState([]); // Dynamic sections

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await getSection(className); // Call API to get sections
                if (response.status) {
                    setClassSections(response.data); // Update state with sections
                } else {
                    console.error(response.message || "Failed to fetch sections");
                }
            } catch (error) {
                console.error("Error fetching sections:", error);
            }
        };

        fetchSections();
    }, [className]);

    return (
        <>
            <div className="w-[100%] h-[100vh] pt-[120px] flex justify-center">
                <div className="flex flex-col w-[85%] sm:w-[70%] md:w-[70%] gap-5">
                    {classSections.length > 0 ? (
                        classSections.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/class/${className}/${item}`)}
                                className="flex justify-center h-[90px] items-center rounded-xl bg-white border-2 w-[100%] text-[30px] cursor-pointer text-black font-extrabold"
                            >
                                {item}
                            </div>
                        ))
                        
                    ) : (
                        <p className="text-center text-[20px]">No sections available for this class.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Section;
