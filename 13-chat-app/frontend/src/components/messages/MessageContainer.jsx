import Messages from "./Messages"
import MessageInput from "./MessageInput"
import {TiMessages} from "react-icons/ti"
const MessageContainer = () => {
  const noChatSelected = true;
  return (
    <div className="md:min-w-[450px] flex flex-col ">
       {noChatSelected ? <NoChatSelected /> :  (
        <>
        {/* HEADER */}
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">To:</span>
          <span className="text-gray-900 font-bold ml-1">Jane Doe</span>
        </div>
        <Messages />
        <MessageInput />
        </>
        )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
      className="flex flex-col items-center gap-2 px-4 text-center  sm:text-lg md:tex-xl text-gray-200 font-semibold "
      >
      <p>Welcome 👋 John Doe ❄️</p>
      <p>Select a chat to start messaging</p>
      <TiMessages className="text-3xl md:text-6xl" />
      </div>
    </div>
  )
}