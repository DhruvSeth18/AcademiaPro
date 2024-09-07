import EditManagement from "./Authority";
import './manage.css';

const Management =()=>{
    return(
        <>
            <div className="w-[100%] h-[100vh] pt-[90px] bg-white overflow-hidden]">
                <div className="w-[100%] flex justify-center">
                    <p className="text-[30px] tracking-wider font-bold">Edit Management</p>
                </div>
                <div className="mt-[20px] w-[100%] flex justify-center">
                    <div className="w-[100%] sm:w-[80%] md:w-[60%] p-5 overflow-auto custom-scroll">
                        <div className="w-[100%] color-black">
                            <EditManagement/>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] flex justify-center">
                    <div className="min:w-[120px] bg-white pt-3 pb-3 pl-4 pr-4 rounded-lg text-black font-bold text-[12px] cursor-pointer hover:scale-[1.02] active:scale-[0.98]">Add Management</div>
                </div>
            </div>
        </>
    )
}
export default Management;