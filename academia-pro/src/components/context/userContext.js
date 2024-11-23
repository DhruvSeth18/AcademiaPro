import { createContext, useContext, useEffect, useState } from "react";
import { verifyUser } from "../api/api";
export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user,setUser] = useState({});
    const [isUser,setIsUser] = useState(false);
    useEffect(()=>{
        const fetchUser = async () => {
            const response = await verifyUser();
            if (response.status && response.status===true) {
                setUser(response.data);
                console.log(response.data);
                setIsUser(true);
            } else {
                setIsUser(false);
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