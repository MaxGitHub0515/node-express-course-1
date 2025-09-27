import { AuthContext } from "../../context/AuthContext"
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utilities/extractBubbleTime";


const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderID === authUser._id;
  const formatedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "";

  return (
    <>
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src={profilePic}
                 alt="Bubble component" />
            </div>
        </div>
        {/* MESSAGE CONTENT */}
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs gap-1 items-center'>{formatedTime}</div>
    </div>
    </>
  )
}

export default Message