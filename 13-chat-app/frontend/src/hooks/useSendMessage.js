
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages, selectedConversation, setMessages } = useConversation()
    
    const sendMessage = async (message) => {
        setLoading(true)
    try {
        const res = await fetch(`/api/v1/messages/send/${selectedConversation._id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message})
        })

        const data = res.json();
        if(data.error) {
            throw new Error(message.error)
        }
        setMessages([...messages, data])
    } catch (error) {
        toast.error(error.message)
        
    } finally {
        setLoading(false)
    }
    }
  return {sendMessage, loading}
}

export default useSendMessage
