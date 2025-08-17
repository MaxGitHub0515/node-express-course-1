
import {Formik, Form, Field, ErrorMessage} from "formik"
import { Link } from "react-router-dom";
import Logo from "../../components/sidebar/Logo";
export function Login() {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-blur-lg">
                <Logo/>
                <form>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text tracking-wide">Username</span>
                        </label>
                        <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10" />
                    </div>
                    <div>
                        <label className="label p-2">
                           <span className="text-base label-text tracking-wide">Password</span>
                        </label>
                        <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10 " />
                    </div>
                    <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 ease-in-out mt-2 inline-block tracking-wide">
                    Don't have an account?</Link>
                </form>
                <div>
                    <button className="btn btn-block btn-sm mt-2 tracking-wide border-0 bg-blue-600 hover:bg-blue-700 ease-in-out">Login</button>
                </div>
            </div>
        </div>
         </>
    );
    

}