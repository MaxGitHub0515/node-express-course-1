


import { createContext, useContext } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import {useVerifyUser} from "../pages/admin/hooks/useVerifyUser";
import type { User } from "../types";

type AuthContextType = {
  authUser: User | null;
  setAuthUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {}
})

export const useAuthContext = () => {
  return useContext(AuthContext);
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
 const {authUser, setAuthUser} = useVerifyUser();

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
