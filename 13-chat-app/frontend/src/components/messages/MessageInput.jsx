import {BsSend} from "react-icons/bs"
import { useState } from "react"
const MessageInput = () => {
  const [message, setMessage] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className="px-4 my-3" onsSubmit={handleSubmit}>
        <div className="w-full relative">
            <input type="text"
            className="border text-sm rounded-lg 
            block w-full p-2.5 bg-gray-600 text-white"
            placeholder="Type .."
            />
            <button 
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
            <BsSend />    
            </button>
        </div>
    </form>
  )
}

export default MessageInput