


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
    const verifyUser = async() => {
      try {
        const res = await fetch('/api/v1/auth/verify', {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Not logged in');
        const userData = await res.json();
        setAuthUser(userData)

      } catch (error) {
        setAuthUser(null) // not logged in 
      }
    };
    verifyUser()
  }, []);
  // set remove 

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
