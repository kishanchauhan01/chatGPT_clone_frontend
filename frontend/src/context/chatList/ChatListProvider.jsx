import { useEffect, useReducer } from "react";
import { chatListReducer } from "./chatListReducer";
import { ChatListContext } from "./ChatListContext";
import { socket } from "../../socket";

export const ChatListProvider = ({ children }) => {
  const initialState = {
    chatList: [],
    currentChatId: null,
  };

  const [state, dispatch] = useReducer(chatListReducer, initialState);

  useEffect(() => {
    function handleNewChatId(newChatId) {
      dispatch({
        type: "ADD_CHAT",
        payload: {
          chatTitle: "test 1",
          chatId: newChatId,
          currentChatId: newChatId,
        },
      });
    }

    // listener for new chatId
    socket.on("newChatId", handleNewChatId);

    return () => {
      socket.off("newChatId", handleNewChatId);
    };
  }, []);

  useEffect(() => {
    if (state.currentChatId) {
      window.history.pushState(null, "", `/chat/${state.currentChatId}`);
    }
  }, [state.currentChatId]);

  return (
    <ChatListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatListContext.Provider>
  );
};
