import Button from "@mui/material/Button";
import NewChat from "../assets/newChat.svg";
import { useContext, useEffect, useState } from "react";
import { ChatListContext } from "../context/chatList/ChatListContext";
import { ChatContext } from "../context/chat/ChatContext";
import CloseIcon from "../assets/close.png";
import { useNavigate, useLocation } from "react-router";

const ChatSidebar = () => {
  const { chatList, currentChatId, dispatch } = useContext(ChatListContext);
  const { dispatch: chatDispatch } = useContext(ChatContext);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(chatId) {
    navigate(`/chat/${chatId}`);
    dispatch({
      type: "SET_CURRENT_CHAT",
      payload: chatId,
    });
    setIsSidebarOpen(false); 
  }

  function handNewChat() {
    chatDispatch({ type: "RESET_CHAT" });
    dispatch({
      type: "SET_CURRENT_CHAT",
      payload: null,
    });
    navigate("/");
    setIsSidebarOpen(false); 
  }

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/chat/")) {
      const urlId = path.split("/")[2]; 
      if (urlId && currentChatId !== urlId) {
        dispatch({
          type: "SET_CURRENT_CHAT",
          payload: urlId,
        });
      }
    } 
    else if (path === "/") {
      if (currentChatId !== null) {
        dispatch({
          type: "SET_CURRENT_CHAT",
          payload: null,
        });
      }
    }
  }, [location.pathname, dispatch]); 

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <button
        className="md:hidden text-white absolute top-4 left-4 z-50 p-2 bg-[#303030] rounded-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-[260px] md:w-[22%] lg:w-[20%]
      bg-black border-r border-[#333] z-50 
      transform transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
      >
        <div className="h-full flex flex-col text-white">
          
          {/* Header Area: Title + Close Button */}
          <div className="flex items-center justify-between p-4 mt-2 md:mt-0">
             {/* 1. The Title */}
             <h1 className="text-xl font-bold pl-2 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
               OmegaAI
             </h1>

             {/* 2. Mobile Close Button (Fixed: uses local state) */}
             <button 
               onClick={() => setIsSidebarOpen(false)} 
               className="md:hidden text-white"
             >
               <img src={CloseIcon} className="w-5 h-5" alt="close" />
             </button>
          </div>

          {/* New Chat Button */}
          <div className="flex px-2 mx-auto hover:bg-[#393939] transition-all duration-300 w-[80%] rounded-2xl cursor-pointer mt-2">
            <img src={NewChat} width={24} height={24} alt="new chat" />
            <Button
              variant="text"
              sx={{ color: "white", fontSize: "16px", textTransform: "none" }}
              onClick={handNewChat}
            >
              New chat
            </Button>
          </div>

          {/* Chat List (Scrollbar Hidden) */}
          <div className="mt-5 overflow-y-auto flex-1 pb-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <h3 className="p-2 pl-6 text-xs text-gray-400 font-semibold">CHATS</h3>

            <ul>
              {[...chatList].reverse().map((chat) => (
                <li
                  key={chat.chatId}
                  className={`p-2 mt-2 mx-auto w-[85%] rounded-lg cursor-pointer transition-all duration-200 text-sm truncate
              ${
                currentChatId === chat.chatId
                  ? "bg-[#393939]"
                  : "hover:bg-[#2A2A2A] text-gray-300"
              }`}
                  onClick={() => handleClick(chat.chatId)}
                >
                  {chat.chatTitle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;