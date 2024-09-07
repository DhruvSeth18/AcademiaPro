import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

const EditManagement = () => {
    const [password, setPassword] = useState('');

    const generatePassword = (length = 12) => {
        console.log('Generating password...'); // Check if function is being called
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let generatedPassword = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            generatedPassword += chars[randomIndex];
        }
        
        console.log('Generated password:', generatedPassword); // Check the generated password
        setPassword(generatedPassword);
    };

    return (
        <>
            <div className="flex border text-[20px] mb-[20px] flex-col sm:flex-row">
                <div className="flex basis-6/12 justify-center sm:justify-normal">
                    <div className="flex p-2 pl-[20px] text-black">dhruv@gmail.com</div>
                </div>
                <div className="flex sm:basis-6/12 border sm:border-none">
                    <div className="flex justify-center sm:justify-normal text-black basis-6/12 p-2 pl-[10px]">@Behappy12</div>
                    <div className="flex border-l-[1px] sm:border-none justify-center sm:justify-end basis-6/12 pb-2 pt-[11px] pr-[15px]"><RemoveIcon className='cursor-pointer'/></div>
                </div>
            </div>
            {
                true?            <div className="flex border text-[20px] mb-[20px] flex-col sm:flex-row">
                <div className="flex basis-6/12 justify-center sm:justify-normal]">
                    <div className="flex p-1 pl-[10px] pr-[20px] w-full">
                        <input type="email" name='email' id="input-group-1" placeholder='Enter emailAddress' className=" border text-black w-[100%] border-gray-300 text-sm rounded-md focus:outline-none block p-1 ps-2" required />
                    </div>
                </div>
                <div className="flex sm:basis-6/12 border sm:border-none">
                    {/* <div className="flex justify-center sm:justify-normal basis-6/12 p-2 pl-[10px]">@Behappy12</div> */}
                    <div className="flex justify-center sm:justify-normal basis-6/12 p-1 pt-[8px] pl-4 gap-5">
                        <p className=''>{password}</p>
                        <button onClick={()=>generatePassword(6)} className='bg-white rounded-lg text-black font-bold text-[14px] pl-3 pr-3'>Generate</button>
                    </div>
                    <div className="flex border-l-[1px] sm:border-none justify-center sm:justify-end basis-6/12 pb-2 pt-[11px] pr-[15px]"><RemoveIcon className='cursor-pointer'/></div>
                </div>
            </div>:<div></div>
            }
        </>
    );
}
export default EditManagement;