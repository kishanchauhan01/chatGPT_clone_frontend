import Button from "@mui/material/Button";
import NewChat from "../assets/newChat.svg";
import { useContext } from "react";
import { ChatListContext } from "../context/chatList/ChatListContext";
import { ChatContext } from "../context/chat/ChatContext";
import CloseIcon from "../assets/close.png";

const ChatSidebar = ({ closeSidebar }) => {
  const { chatList, currentChatId, dispatch } = useContext(ChatListContext);
  const {  dispatch: chatDispatch } = useContext(ChatContext);
  const { dispatch: chatListDispatch } = useContext(ChatListContext);
  //   console.log(chatList);

  function handleClick(chatId) {
    dispatch({
      type: "SET_CURRENT_CHAT",
      payload: { chatId },
    });
    // handleChatClick(chatId);
    if (closeSidebar) closeSidebar();
  }

  function handNewChat() {
    chatDispatch({
      type: "RESET_CHAT",
    });
    chatListDispatch({
      type: "SET_CURRENT_CHAT",
      payload: { chatId: null },
    });
  }

  return (
    <div className="h-full flex flex-col text-white">
      {/* Mobile Close Button */}
      <div className="md:hidden p-4 flex justify-end">
        <button onClick={closeSidebar} className="text-white">
          <img src={CloseIcon} className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="flex px-2 mx-auto hover:bg-[#393939] transition-all duration-300 w-[80%] rounded-2xl cursor-pointer mt-5">
        <img src={NewChat} width={24} height={24} />
        <Button
          variant="text"
          sx={{ color: "white", fontSize: "16px" }}
          onClick={handNewChat}
        >
          New chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="mt-5 overflow-y-auto flex-1 pb-10">
        <h3 className="p-2 text-gray-300">Chats</h3>

        <ul>
          {[...chatList].reverse().map((chat) => (
            <li
              key={chat.chatId}
              className={`p-2 mt-2 mx-auto w-[80%] rounded-2xl cursor-pointer transition-all duration-300
              ${
                currentChatId === chat.chatId
                  ? "bg-[#393939]"
                  : "hover:bg-[#393939]"
              }`}
              onClick={() => handleClick(chat.chatId)}
            >
              {chat.chatTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;
