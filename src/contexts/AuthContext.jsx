import { useState , useEffect, useContext, createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged , signOut } from "firebase/auth";

const AuthContext = createContext();
export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    useEffect( ()=>{
        const unsubscribe =onAuthStateChanged(auth , (currentUser) => {setUser(currentUser)});
        return () => unsubscribe();
    },[]);

    const logout = () => signOut(auth);
    return (
        <AuthContext.Provider value= {{user,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}