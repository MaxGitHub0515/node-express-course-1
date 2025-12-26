
import { useEffect, useState } from "react";
// import the user from the types folder
import type { User } from "../../../types";

  // I will try to fetch from a separate route to check 
  // whether the user is logged in to avoid xss of local storage
  // The version with localstorage is totaly to be aware of  but unreliable in terms of security  


export function useVerifyUser() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
          credentials: "include",
        });
        const userData = await res.json();
        if(userData) {
          setAuthUser(userData);
        } else {
          setAuthUser(null)
        }
      } catch (error: unknown) {
        setAuthUser(null); 
        console.error("Verfication failed: ", error)
       
      }
    };

    verifyUser();
  }, [API_BASE_URL]);

  return { authUser, setAuthUser };
}