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

  const [state, dispatch] = useReducer(chatListReducer, initialState);
  const navigate = useNavigate();
  // console.log(state);

  useEffect(() => {
    function handleNewChatId({ chatId, chatTitle }) {
      console.log(chatTitle);
      dispatch({
        type: "ADD_CHAT",
        payload: {
          chatTitle,
          chatId,
        },
      });

      dispatch({
        type: "SET_CURRENT_CHAT",
        payload: null,
      });

      navigate(`/chat/${chatId}`, { state: { fromSocket: true } });
    }

    // listener for new chatId
    socket.on("newChat", handleNewChatId);

    return () => {
      socket.off("newChat", handleNewChatId);
    };
  }, [navigate ]);

  return (
    <ChatListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatListContext.Provider>
  );
};
