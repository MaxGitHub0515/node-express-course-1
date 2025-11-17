
import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

// hook allows us to use these values like authuser, setauthuser
export const useAuthContext = () => {
    return useContext(AuthContext)
}
// providing values to use them throught the app.  works as wrapper
// then wrap the app with it in main.jsx
export const AuthContextProvider = ({children}) => { 
    // if empty return null
    // JSOB.parse to convert string value into object when returning localstorage..
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null ); 
    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>
}



