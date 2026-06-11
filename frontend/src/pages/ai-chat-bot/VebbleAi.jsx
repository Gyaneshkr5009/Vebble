
import ChatSession from "./ChatSession";
import Sidebar from "./Sidebar";

const VebbleAi = () => {

    return (
        <div className="flex h-screen min-w-full overflow-hidden  container px-4 pt-20 pb-2 gap-1 min-h-screen">
            <Sidebar />
            <ChatSession />
        </div>
    )
}

export default VebbleAi;