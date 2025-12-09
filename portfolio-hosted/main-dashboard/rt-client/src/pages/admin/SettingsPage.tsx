
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SettingsPage() {
    const navigate = useNavigate();
    
     const handleLogout = async() => {
            try {
                const res = await fetch("/api/v1/auth/logout", {
                    method: 'POST',
                    credentials: "include"
                });
                 const data = await res.json();
    
                if(!res.ok){
                throw new Error(data.msg || 'Login failed');
                } else{
                    navigate("/main-dashboard")
                }
    
            } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error('Logout failed');
    
            }
        }
    return (
        <div className="w-screen h-screen bg-[#F5F5F5] flex flex-col gap-y-8 items-center justify-center">
            <h1 className="text-2xl text-white">Settings Page</h1>
            <div>
                 <Link to="/cpanel" className="text-2xl text-blue">
                 <span className="text-blue-600 underline text-center">Go back to Admin Dashboard</span><br/>
                 </Link>
                 <Link to="/main-dashboard" className="text-2xl text-blue">
                 <span className="text-blue-600 underline text-center">Go back to Main Dashboard</span>
                 </Link>
                 <button type="button" onClick={handleLogout} className="w-full bg-red-600 text-gray-100 p-2 rounded hover:bg-red-700 mt-3">
                    Log Out
                 </button>
            </div>
           
        </div>
    );
}