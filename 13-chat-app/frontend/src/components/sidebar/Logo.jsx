
import {Link} from "react-router-dom"

const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
        <div className="">
            <Link to="/">
            <img src="ic-logo-prev.svg"
            className="logo w-32 hover:opacity-40 ease-in-out 
             duration-200  "  />
        </Link>
        </div>    
    </div>
  )
}

export default Logo