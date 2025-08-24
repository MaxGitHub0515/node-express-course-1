
import {BiLogOut} from "react-icons/bi"
import useLogout from "../../hooks/useLogout"

const LogoutBtn = () => {
  const {loading, logout} = useLogout();
  return (
    <div className="mt-auto">
      {!loading ? (
      <button className="">
        <BiLogOut 
        onClick={logout}
        className="size-6 text-white cursor-pointer" />
      </button>
      
      ) : (
        <span className="loading loading-spinner "></span>
      )}
    </div>
  )
}

export default LogoutBtn