
import { useState, useEffect } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {setMessages, messages, selectedConversation} = useConversation()
    useEffect(() => {
        const getMessages = async () => {
        setLoading(true)
          try {
            const res = await fetch(`/api/v1/messages/${selectedConversation._id}`);
            const data = res.json();
            if(data.error) throw new Error(data.error)
            
            setMessages(data)
          } catch (error) {
            toast.error(error.message)
          } finally {
            setLoading(false)
          }
        }
          if(selectedConversation?.id) getMessages();
            

    }, [selectedConversation?._id, setMessages])
  return {loading, messages}
}

export default useGetMessages
