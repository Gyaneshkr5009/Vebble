import { useEffect , useRef } from "react";
import { useChatStore } from "../store/useChatStore"
import MessageSkeleton from "./skeleton/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput"
import { useAuthStore } from "../store/useAuthStore";
import {formatMessageTime} from "../lib/utils"
import { useChatThemeStore } from "../store/useChatThemeStore";


const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const { theme } = useChatThemeStore();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();

  }, [selectedUser._id, getMessages,subscribeToMessages, unsubscribeFromMessages]);

  //this fuctn allow the window to get auto scroll when a user get new message updates;
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      <ChatHeader />

      {/* Relative Wrapper for Chat History and Floating Input */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        
        {/* Chat History*/}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-cover bg-center pb-24 px-10" // Added pb-24 so messages aren't hidden behind the floating input
          style={{
            backgroundImage: theme ? `url(${theme})` : "none",
            backgroundSize: "100% 100%"
          }}
        >
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-bubble chat-bubble-accent p-2 px-2 rounded-xl max-w-[75%]">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-md mb-1 w-full max-h-60 object-cover"
                  />
                )}
                {message.text && <p className="text-sm">{message.text}</p>}
                <div className="flex justify-end mt-1">
                  <time className="text-[11px] opacity-60 whitespace-nowrap">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Message Input Box */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-xs">
          <MessageInput />
        </div>

      </div>
    </div>
  )
}

export default ChatContainer