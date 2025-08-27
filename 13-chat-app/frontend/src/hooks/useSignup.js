import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
    const [loading, setLoading ] = useState(false);
    const {setAuthUser} = useAuthContext();
   
    const signup = async({fullName, username, pwd, confirmPwd, gender}) => {
    const success = handleInputErrors({fullName, username, pwd, confirmPwd, gender});
    if(!success) return;
    setLoading(true)
        try {
            const res = await fetch('/api/v1/auth/signup', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({fullName, username, pwd, confirmPwd, gender})

            })
            const data = await res.json();
            console.log(data);
            if(data.error) {
                throw new Error(data.error);
            }
            // localstorage for now then http only cookie later
            localStorage.setItem("chat-user", JSON.stringify(data))
            // context
            // updates authUser 
            setAuthUser(data)
            toast.success("Successfully Signed Up")

        } catch (error) {
            toast.error(error.message)
        }
        finally{
            // runs anyways
            setLoading(false)
        }

    }

    return {loading, signup}
 
}
export default useSignup

function handleInputErrors({fullName, username, pwd, confirmPwd, gender}) {
    // Relatively good solution but not the best
    // UI Validatiion.  if any of those empty
    // better to use validation handlers like Yup
    if(!fullName || !username || !pwd || !confirmPwd || !gender) {
        toast.error('Please fill in all the fields');
        return false; // for success to be false
    }

    if(pwd !== confirmPwd) {
        toast.error('Passwords do not match'); /* checked both on ui and server-side */
         return false;
    }  

    if(pwd.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
    // if passed 
    return true;

}




