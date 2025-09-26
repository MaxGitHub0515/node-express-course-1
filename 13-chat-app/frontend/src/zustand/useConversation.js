
// Global states

import {create} from "zustand";

const useConversation = create((set) => ({
    selectedConverstation: null, 
    setSelectedConversation: (selectedConverstation) => set({selectedConverstation}),
    messages:[],
    setMessages: (messages) => set(messages)
}))

export default useConversation;
