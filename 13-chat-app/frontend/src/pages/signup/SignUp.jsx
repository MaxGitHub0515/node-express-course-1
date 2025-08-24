
import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import Logo from "../../components/sidebar/Logo";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
export function SignUp() {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        pwd: "",
        confirmPwd: "",
        gender: ""
    });
    
    const {loading, signup } = useSignup()

    const handleSubmit = async (e) => {
       e.preventDefault();
       await signup(inputs)
    }
    const handleCheckBoxChange = (gender) => {
        // gender ?
        setInputs({...inputs, gender})
    }
    return (
        <>
        <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
            <div className="w-full p-6 shadow-md bg-gray-400 bg-clip-padding 
            bg-opacity-0 backdrop-filter backdrop-blur-lg  ">
                <Logo/>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Full Name</span>
                            </label>
                            <input type="text" 
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName: e.target.value}) }
                            on
                            placeholder="E.g. Jane Doe" className="w-full input input-bordered h-10" />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Username</span>
                            </label>
                            <input type="text"
                            value={inputs.username}
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                            placeholder="E.g. janedoe" className="w-full input input-bordered h-10"  />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Password</span>
                            </label>
                            <input 
                            value={inputs.pwd}
                            onChange={(e) => setInputs({...inputs, pwd: e.target.value})}
                            type="password" placeholder="Enter password"className="w-full input input-bordered h-10" />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Confirm Password</span>
                            </label>
                            <input 
                            value={inputs.confirmPwd}
                            onChange={(e) => setInputs({...inputs, confirmPwd: e.target.value})}
                            type="password" placeholder="Confirm password"className="w-full input input-bordered h-10" />
                        </div>
                        {/* gender checkbox */}
                        {/* onCheckBoxChange, selectedGender are custom (props) */}
                        {/* then these custom props to be pasted in GenderCheckBox component as {onCheckBoxChange, selectedGender } */}
                        <GenderCheckBox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>
                        <Link to="/login" className="text-sm hover:underline hover:text-blue-600 ease-in-out mt-2 inline-block tracking-wide">
                        Already have an account?</Link>
                        <div>
                            <button 
                            disabled={loading}
                            className="btn btn-block btn-sm mt-2 tracking-wide border border-slate-600 bg-blue-600 hover:bg-blue-700 ease-in-out">
                                {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>
            </div>
        </div>
        </>
    );

}