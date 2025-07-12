
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function UserLogger() {
    const location = useLocation();

    useEffect(() => {
    // Only log visits when location is available
    if (!location?.pathname) return;
    console.log('Sending URL:', location.pathname);

    fetch('/api/v1/visitors', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({url: location.pathname}),
      
    }).catch(console.error)
    },[location]);

    return null;
}

