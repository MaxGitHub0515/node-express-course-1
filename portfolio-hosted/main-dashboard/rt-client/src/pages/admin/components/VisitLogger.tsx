
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function UserLogger() {
    const location = useLocation();
  // TODO: make each visiter unique based on ip address and user agent - so i wouldn't have double log for the same user

    useEffect(() => {
    // Only log visits when location is available
    if (!location?.pathname) return;
    // skip logging admin panel routes if hit 
    if(location.pathname.startsWith('/cpanel')) return;
    console.log('Sending URL:', location.pathname);

    fetch('/api/v1/visitors', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({url: location.pathname}),
      
    }).catch(console.error)
    },[location]);

    return null;
}

