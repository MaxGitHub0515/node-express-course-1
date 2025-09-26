
import Conversation from "./Conversation"
import useGetConversations from "../../hooks/useGetConversations";
const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  return (
    <div className='py-2 flex flex-col overflow-y-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation 
          key={conversation._id}
          conversation={conversation}
          // last index for devider ui
          lastIdx={idx === conversation.length - 1} />
      ))}

    </div>
  )
}

export default Conversations