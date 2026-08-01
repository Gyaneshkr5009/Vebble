import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, SendHorizontal, X , Smile} from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleEmojiClick = (emojiData) => {
    setText((prevText) => prevText + emojiData.emoji);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      setShowEmojiPicker(false); // Send karne ke baad picker band
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    // relative lagaya taaki emoji box sahi jagah float kare
    <div className="w-full p-2 bg-transparent flex flex-col gap-1.5 justify-end relative">
      
      {/* 1. Emoji Picker Box (Floating Over Chat) */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-50 shadow-2xl rounded-2xl overflow-hidden border border-base-300">
          <EmojiPicker 
            onEmojiClick={handleEmojiClick} 
            theme="auto"
            height={320} 
            width={280}
            searchDisabled={false}
            skinTonesDisabled={true}
          />
        </div>
      )}

      {/* Image Preview Section */}
      {imagePreview && (
        <div className="mx-2 bg-base-100/90 backdrop-blur-md rounded-2xl shadow-lg border border-base-300 w-fit flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="relative p-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-xl border border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-error text-error-content shadow-md flex items-center justify-center hover:scale-105 transition-transform"
              type="button"
            >
              <X className="size-2.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Row */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-2 px-1">
        
        <div className="flex-1 flex items-center gap-1 bg-base-100 shadow-sm border border-base-300 rounded-full px-3 py-1.5 min-h-[46px]">
          
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          
          {/* Attachment Icon Inside the Pill */}
          <button
            type="button"
            className={`btn btn-ghost btn-circle btn-sm min-h-0 h-9 w-9 p-0 text-base-content/60 hover:text-primary transition-colors`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={23} className={imagePreview ? "text-emerald-500" : ""} />
          </button>

          {/* Emoji Toggle Button */}
          <button
            type="button"
            className={`btn btn-ghost btn-circle btn-sm min-h-0 h-9 w-9 p-0 text-base-content/60 hover:text-primary ${showEmojiPicker ? "text-emerald-500" : ""}`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={23} />
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm md:text-base py-1 placeholder:text-base-content/40 text-base-content"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setShowEmojiPicker(false)}
          />

          {/* 2. Floating Circle Send Button (Pill ke BAHAAR) */}
          <div className="flex items-center justify-center min-h-[40px] min-w-[40px]">
            <button
              type="submit"
              className={`btn btn-circle shadow-md border-none flex items-center justify-center transition-all duration-300 ease-out origin-center h-[35px] w-[35px] hover:h-[40px] hover:w-[40px] min-h-0
                ${(!text.trim() && !imagePreview) 
                  ? "scale-0 opacity-0 pointer-events-none" 
                  : "scale-100 opacity-100 bg-emerald-500 hover:bg-emerald-600 text-white active:scale-90"
                }`}
              disabled={!text.trim() && !imagePreview}
            >
              <SendHorizontal size={18} className="translate-x-[1px]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
