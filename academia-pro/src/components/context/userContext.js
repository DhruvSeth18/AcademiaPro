import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user,setUser] = useState({});
    useEffect(()=>{
        
    },[setUser]);
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}