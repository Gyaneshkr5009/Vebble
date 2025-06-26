import { create } from "zustand";   
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages: [], //desplay all messages
    users: [], //display all users
    selectedUser: null, //this will null until we select one 
    isUsersLoading: false, //this shows all the userLoading moment
    isMessagesLoading: false, //this is messageLoading that becomes true when we select a user


    //while messages loading we show loading skeleton 
    getUsers : async () =>{
        set({ isUsersLoading: true }); //marking this state as true;
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false }); //resettign our loading state;
        }
    },
    
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] }); //keep the last message as well the latest one
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    //implementing socket.io message listener fuctn that allows to get messages from the server without refershing the page;
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                //gettting all the old messages and adding new messages as well;
                messages: [...get().messages, newMessage],
            });
        });
    },

    //this is happen when we logout or close the window then this fuctn get called;
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));