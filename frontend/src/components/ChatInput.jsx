import React, { useContext, useState } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import Send from "../assets/send.png";
import Stop from "../assets/stop.png";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/auth/AuthContext";
import { ChatListContext } from "../context/chatList/ChatListContext";

export default function ChatInput({ isConnected }) {
  const [prompt, setPrompt] = useState("");

  const { aiResponse, dispatch, messages, isNewChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const { currentChatId } = useContext(ChatListContext);

  const handleSubmit = () => {
    let userPrompt = prompt;
    const msgId = uuid();

    dispatch({
      type: "ADD_MSG",
      payload: {
        msgId,
        role: "user",
        content: prompt,
        status: "sent",
      },
    });
    setPrompt("");

    console.log("is new chat", isNewChat);
    const userId = !isNewChat && messages.length >= 2 ? null : user._id;
    const chatId = !isNewChat && currentChatId ? currentChatId : null;

    aiResponse(userPrompt, msgId, userId, chatId);
    console.log("complete");
  };

  return (
    <div className="w-full flex justify-center p-5">
      <div className="w-full max-w-5xl flex items-center bg-[#303030] rounded-xl px-4 py-3 shadow-lg">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 text-white outline-none text-base"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        {messages.at(-1)?.status === "streaming" ? (
          <button
            // onClick={handleSubmit}
            className="w-9 h-9 flex justify-center items-center rounded-full bg-[#424242] hover:bg-gray-200 transition"
          >
            <img src={Stop} className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isConnected || !prompt.trim()}
            className={`w-9 h-9 flex justify-center items-center rounded-full bg-white hover:bg-gray-200 transition ${!isConnected ? "bg-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-200"} `}
          >
            <img src={Send} className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
