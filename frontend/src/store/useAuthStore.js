import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set,get) => ({
    //initially no user is authenticated
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    //a loading state to check if auth is being authenticated or not
    isCheckingAuth: true,
    onlineUsers: [],
    socket:null,

    //creating a fuction to add spinner animation until we check the user is authenticated
    checkAuth : async () => {
        try {
            //we already declare base url in axiosInstance, so this will act as /auth/check extension 
            const res = await axiosInstance.get("/auth/check");
            //after that we will get the response and set the authUser state
            set({authUser : res.data});
            //we need to connect to socket.io immideately after login
            get().connectSocket();
        } catch (error) {
            //in case of error, we will set authUser to null cause user is not authenticated
            set({authUser : null});
            console.error("Error checking authentication :: store :", error); 
        } finally {
            //after checking auth, we will set isCheckingAuth to false
            set({isCheckingAuth : false});
        }
    },

    signup : async(data) => {
        //set my signingup state as true;
        set({isSigningUP : true});
        try {
            //using axios to post my data to that address and it will give us response;
           const res = await axiosInstance.post("/auth/signup" , data);
           set({authUser : res.data});
           toast.success("Account Created Successfully");
           //we need to connect to socket.io immideately after login
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.massage);
        } finally{
            set({isSigningUP : false});
        }
    },

    login : async (data) => {
        set({isLoggingIn : true});
        try {
            const res = await axiosInstance.post("/auth/login" , data);
            set({authUser : res.data});
            toast.success("Logged in Successfully");
            //we need to connect to socket.io immideately after login
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLoggingIn : false});
        }
    },

    logout : async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("Logged Out Successfully");
            //we need to disconnect to socket.io immideately after logout
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data.updatedUser });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        //fetch the user status;
        const { authUser } = get();
        //if the user is not connected/authenticated so there's no need to make connections;
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));