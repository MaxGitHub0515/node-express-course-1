
import Conversations from "./Conversations"
import SearchInput from "./SearchInput"
import LogoutBtn from "./LogoutBtn"
const SideBar = () => {
  return (
    <div className="flex flex-col border-r border-slate-500p-4 ">
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogoutBtn />
    </div>
  )
}

export default SideBar