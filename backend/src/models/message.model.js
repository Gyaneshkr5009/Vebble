// 📨 A message is created when one user sends a text or image to another.
// senderId and receiverId reference User IDs to link both ends of the chat.
// Either text or image (or both) can be present in a single message.

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // 👤 Who sent the message
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // 👥 Who receives the message
            required: true,
        },
        text: {
            type: String, // ✏️ Optional message text
        },
        image: {
            type: String, // 🖼️ Optional image URL if sending media
        },
        //{for the addons such as active, seen, etc.}
    },
    {
        timestamps: true, // 🕒 Automatically adds createdAt and updatedAt fields
    }
);

// 🧠 This model handles storing and retrieving all chat messages between users
const Message = mongoose.model("Message", messageSchema);
export default Message;
