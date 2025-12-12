import { useEffect, useReducer } from "react";
import { ChatContext } from "./ChatContext";
import { chatReducer } from "./chatReducer";
import { socket } from "../../socket";
import axios from "axios";
import { toast } from "react-toastify";

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

  const handleChatClick = async (chatId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/chats/${chatId}/messages`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(response.data.data);
        dispatch({
          type: "ADD_ALL_MESSAGES",
          payload: { data: response.data.data },
        });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{ ...state, dispatch, aiResponse, handleChatClick }}
    >
      {children}
    </ChatContext.Provider>
  );
};
