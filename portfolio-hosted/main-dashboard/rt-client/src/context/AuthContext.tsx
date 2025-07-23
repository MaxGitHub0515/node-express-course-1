


import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";



type User = {
  _id: string;
  username: string;
  email: string;
};
//
type AuthContextType = {
  authUser: User | null;
  setAuthUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth Context Error");
  return context;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  // Load user from localStorage on first mount

  // I will try to fetch from a separate route to check 
  // whether the user is logged in to avoid xss of local storage
  // This version with localstorage is completely working but unreliable in terms of security  
  
  useEffect(() => {
    const userData = localStorage.getItem("authUser");
    if (userData) {
      try {
        setAuthUser(JSON.parse(userData));
      } catch(err) {
        // if implementing localstorage removal when loggingout 
        // logut page or UI will be added with poininting to /api/v1/auth/logout
        // and clear the cookies on the backend 
         console.error("Error parsing user from localStorage:", err);
        localStorage.removeItem("authUser"); // Clean invalid data
      }
    }
  }, []);
  // set remove 

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
