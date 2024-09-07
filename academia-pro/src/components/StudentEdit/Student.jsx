import { useNavigate } from "react-router-dom";
const Student = ()=>{
    const navigate = useNavigate();
    return (
        <>
            <div className="w-[100%] h-[100vh] bg-black pt-[100px]">
                <div className="ml-[15px] mr-[15px] sm:ml-[150px] sm:mr-[150px]">
                    <p className="text-white text-[50px] mb-[20px] font-bold">Classes</p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                        <div onClick={()=>navigate('/student/nursery')} className="w-[100%] sm:w-[297px] h-[130px] rounded-lg bg-white flex justify-center items-center">
                            <p className="text-black text-[35px] font-bold">Nursery</p>
                        </div>
                        <div className="w-[100%] sm:w-[297px] h-[130px] rounded-lg bg-white flex justify-center items-center">
                            <p className="text-black text-[35px] font-bold">L.K.G</p>
                        </div>
                        <div className="w-[100%] sm:w-[297px] h-[130px] rounded-lg bg-white flex justify-center items-center">
                            <p className="text-black text-[35px] font-bold">U.K.G</p>
                        </div>
                        <div className="w-[100%] sm:w-[297px] h-[130px] rounded-lg bg-white flex justify-center items-center">
                            <p className="text-black text-[35px] font-bold">1st</p>
                        </div>
                        <div className="w-[100%] sm:w-[297px] h-[130px] rounded-lg bg-white flex justify-center items-center">
                            <p className="text-black text-[35px] font-bold">2nd</p>
                        </div>
                        <div className="w-[100%] sm:w-[297px] h-[130px] rounded-lg bg-white flex justify-center items-center">
                            <p className="text-black text-[35px] font-bold">3rd</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Student;