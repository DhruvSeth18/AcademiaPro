import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ClassSection = ["A","B","C","D","E"];
const Section = ()=>{
    const { classSection } = useParams();
    const navigate = useNavigate();
    return (<>
        <div className="w-[100%] h-[100vh] pt-[120px] flex justify-center">
            <div className="flex flex-col w-[85%] sm:w-[70%] md:w-[70%] gap-5">
                {
                    ClassSection.map((item,index)=>{
                        return (
                            <div onClick={() => navigate(`/class/${classSection}/${item}`)} className="flex justify-center h-[90px] items-center rounded-xl bg-white border-2 w-[100%] text-[30px] cursor-pointer text-black font-extrabold">{item}</div>
                        )
                    })
                }
            </div>
        </div>
    </>)
}
export default Section;