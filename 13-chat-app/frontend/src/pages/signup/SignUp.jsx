
import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";

export function SignUp() {
    return (
        <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
            <div className="w-full p-6 shadow-md bg-gray-400 bg-clip-padding 
            bg-opacity-0 backdrop-filter backdrop-blur-lg ">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up
                    <span className="text-blue-500 ml-2">Messera</span>
                 </h1>
                    <form>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Full Name</span>
                            </label>
                            <input type="text" placeholder="E.g. Jane Doe" className="w-full input input-bordered h-10" />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Username</span>
                            </label>
                            <input type="text" placeholder="E.g. janedoe" className="w-full input input-bordered h-10"  />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Password</span>
                            </label>
                            <input type="password" placeholder="Enter password"className="w-full input input-bordered h-10" />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text tracking-wide">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Confirm password"className="w-full input input-bordered h-10" />
                        </div>
                        {/* gender checkbox */}
                        <GenderCheckBox />
                        <Link to="/login" className="text-sm hover:underline hover:text-blue-600 ease-in-out mt-2 inline-block tracking-wide">
                        Already have an account?</Link>
                    </form>
                <div>
                    <button className="btn btn-block btn-sm mt-2 tracking-wide border-0 bg-blue-600 hover:bg-blue-700 ease-in-out">Login</button>
                </div>
                
            </div>
        </div>
    );

}