


// import {toast} from "react-hot-toast"
// import { useNavigate } from "react-router-dom";
// export default function SettingsPage() {
//     const navigate = useNavigate();
    
//      const handleLogout = async() => {
//             try {
//                 const res = await fetch("/api/v1/auth/logout", {
//                     method: 'POST',
//                     credentials: "include"
//                 });
//                  const data = await res.json();
    
//                 if(!res.ok){
//                 throw new Error(data.msg || 'Login failed');
//                 } else{
//                     navigate("/main-dashboard")
//                 }
    
//             } catch (error) {
//             if (error instanceof Error) toast.error(error.message);
//             else toast.error('Logout failed');
    
//             }
//         }