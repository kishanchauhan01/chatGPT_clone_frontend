import { useEffect, useReducer } from "react";
import { ChatContext } from "./ChatContext";
import { chatReducer } from "./chatReducer";
import { socket } from "../../socket";

export const ChatProvider = ({ children }) => {
  /**
   * @typedef {object} ChatMessage
   * @property {"user" | "assistant"} role
   * @property {string} content
   */

  /**
   * @typedef {object} ChatState
   * @property {string|null} msgId
   * @property {[ChatMessage]} messages
   * @property {boolean} isNewChat
   * @property {"sent" | "streaming" | "complete" | null} status
   */

  /** @type {ChatState} */
  const initialState = {
    messages: [],
    isNewChat: true,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    function handleModelDone(msg) {
      if (msg) {
        dispatch({
          type: "STATUS_UPDATE",
          payload: {
            status: "complete",
          },
        });
      }
    }

    function handleChunks(token) {
      dispatch({
        type: "APPEND_STREAMING_TEXT",
        payload: {
          token,
        },
      });
    }

    // listner for streaming
    socket.on("model_chunk", handleChunks);

    // listner for full reply
    socket.on("model_done", handleModelDone);

    return () => {
      socket.off("model_chunk", handleChunks);
      socket.off("model_done", handleModelDone);
    };
  }, []);

  const aiResponse = (prompt, msgId, userId, chatId) => {
    dispatch({
      type: "ADD_MSG",
      payload: {
        role: "assistant",
        content: "",
        status: "streaming",
      },
    });
    console.log("UserId------", userId);
    console.log("ChatId------", chatId);

    socket.emit("user_message", {
      message: {
        prompt,
        msgId,
        userId,
        chatId: chatId,
        isNewChat: state.isNewChat,
      },
    });
  };

  return (
    <ChatContext.Provider value={{ ...state, dispatch, aiResponse }}>
      {children}
    </ChatContext.Provider>
  );
};
