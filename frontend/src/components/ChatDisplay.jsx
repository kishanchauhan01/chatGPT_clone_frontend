import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import ChatInput from "../components/ChatInput";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export const ChatDisplay = ({ isConnected }) => {
  const { messages, dispatch } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  const { chatId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId) {
      dispatch({
        type: "RESET_CHAT",
      });
      return;
    }

    if (location.state?.fromSocket) {
      window.history.replaceState({}, document.title);
      return;
    }

    async function loadChat() {
      dispatch({ type: "RESET_CHAT" });
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/chats/${chatId}/messages`,
          { withCredentials: true }
        );

        if (response.data.success) {
          // console.log(response.data.data);
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
    }

    loadChat();
  }, [chatId, dispatch, location.state?.fromSocket]);

  return (
    <div className="flex-1 h-[80vh] md:h-full text-white flex flex-col">
      {/* Scrollable Messages Section */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-6 sm:py-10 chatgpt-scrollbar">
        {/* Center Column */}
        <div className="max-w-4xl w-full mx-auto flex flex-col gap-6">
          {messages.length === 0 ? (
            <h2 className="text-3xl flex justify-center items-center h-100">
              😀 How can I help you today! {user.username}
            </h2>
          ) : null}
          {messages.map((msg, index) =>
            msg.role === "user" ? (
              <div
                key={index}
                className="self-end bg-[#303030] text-white overflow-x-auto px-4 py-3 rounded-xl max-w-[80%] md:max-w-[70%] wrap-break-word"
              >
                <ReactMarkdown
                  rehypePlugins={rehypeHighlight}
                  remarkPlugins={remarkGfm}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div
                key={index}
                className="self-start text-white px-4 py-3 max-w-[90%] md:max-w-[75%] wrap-break-word prose prose-invert"
              >
                <ReactMarkdown
                  rehypePlugins={rehypeHighlight}
                  remarkPlugins={remarkGfm}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            )
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="w-full border-t border-[#333] bg-[#212121] px-3 sm:px-5 py-3">
        <ChatInput isConnected={isConnected} />
      </div>
    </div>
  );
};
