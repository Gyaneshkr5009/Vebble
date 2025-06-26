import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId , io } from "../lib/socket.js";

//this function will be used to get all users for the sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        //here we need to fetch all users except the one who is logged in
        const loggedInUserId = req.user._id;
        //we fetch all users except the one who is logged in and we don't want to send the password field back to the client
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //$ne means not equal to mongoDB operator

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar :: controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//now we need a controller to get the messages between two users
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; //id is the user id we are trying to get messages with and also renamed id to userToChatId for clarity

        const myId = req.user._id; //this is the user who is logged in and sending the request

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages :: controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//now this function will be used to send a message
export const sendMessage = async (req, res) => {
    try {
        const {text , image}=req.body;
        const { id: receiverId } = req.params; //id is the user id we are trying to send the message to

        const senderId = req.user._id; //this is the user who is logged in and sending the message(simply me);

        let imageUrl;
        if(image){
            //upload the image to cloudinary and get the url
            const uploadResponse = await cloudinary.uploader.upload(image); //updating image to cloudinary
            imageUrl = uploadResponse.secure_url; //get the secure url of the image
        }

        //create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl, //if there is no image, it will be undefined
        });

        await newMessage.save(); //save the message to the database

        //todo : realtime message sending using socket.io can be implemented here
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message :: controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};