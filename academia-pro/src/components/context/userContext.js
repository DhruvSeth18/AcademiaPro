import { createContext, useEffect, useState } from "react";
import { verifyUser, logoutCookie} from "../api/api";
export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user,setUser] = useState({});
    const [isUser,setIsUser] = useState(false);
    
    useEffect(()=>{
        const storedIsUser = localStorage.getItem("isUser") === "true";
        if (storedIsUser) {
            setIsUser(true);
        }

        const fetchUser = async () => {
            const response = await verifyUser();
            if (response.status && response.status===true) {
                setUser(response.data);
                console.log(response.data);
                setIsUser(true);
                localStorage.setItem("isUser", "true");
            } else {
                setIsUser(false);
                localStorage.clear();
                await logoutCookie();
                console.error("User verification failed:", response.message);
            }
        }
        fetchUser();
    },[setUser]);
    return (
        <UserContext.Provider value={{user,setUser,isUser,setIsUser}}>
            {children}
        </UserContext.Provider>
    )
}