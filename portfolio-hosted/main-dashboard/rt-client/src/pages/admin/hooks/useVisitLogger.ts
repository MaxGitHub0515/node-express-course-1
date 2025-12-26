

import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function UserLogger() {
    const location = useLocation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
    useEffect(() => {
    // Only log visits when location is available
    if (!location?.pathname) return;
    // skip logging admin panel routes if hit 
    if(location.pathname.startsWith('/cpanel')) return;
    console.log('Sending URL:', location.pathname);

    fetch(`${API_BASE_URL}/api/v1/visitors`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({url: location.pathname}),
      
    }).catch(console.error)
    },[location, API_BASE_URL]);

    return null;
}

