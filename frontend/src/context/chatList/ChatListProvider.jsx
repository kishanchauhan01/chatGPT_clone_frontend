import { useEffect, useReducer } from "react";
import { chatListReducer } from "./chatListReducer";
import { ChatListContext } from "./ChatListContext";
import { socket } from "../../socket";
import { useNavigate } from "react-router";

export const ChatListProvider = ({ children }) => {
  const initialState = {
    chatList: [],
    currentChatId: null,
  };

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(chatListReducer, initialState);
  // console.log(state);

  useEffect(() => {
    function handleNewChatId({ chatId, chatTitle }) {
      console.log(chatTitle);
      dispatch({
        type: "ADD_CHAT",
        payload: {
          chatTitle,
          chatId,
          currentChatId: chatId,
        },
      });
    }

    // listener for new chatId
    socket.on("newChat", handleNewChatId);

    return () => {
      socket.off("newChat", handleNewChatId);
    };
  }, []);

  useEffect(() => {
    if (state.currentChatId) {
      // window.history.pushState(null, "", `/chat/${state.currentChatId}`);
      navigate(`/chat/${state.currentChatId}`);
    } else {
      navigate("/");
    }
  }, [navigate, state.currentChatId]);

  return (
    <ChatListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatListContext.Provider>
  );
};
