



import { useEffect, useState } from "react";

export const verifyUser = () => {
  const [authUser, setAuthUser] = useState

  // Load user from localStorage on first mount

  // I will try to fetch from a separate route to check 
  // whether the user is logged in to avoid xss of local storage
  // This version with localstorage is completely working but unreliable in terms of security  
  
  useEffect(() => {
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
   
  }, []);
  // set remove 

  return (
   
  );
};
