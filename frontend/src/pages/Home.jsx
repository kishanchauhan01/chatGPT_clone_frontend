import ChatSidebar from "../components/ChatSidebar";
import ChatInput from "../components/ChatInput";
import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { ChatContext } from "../context/chat/ChatContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const { messages } = useContext(ChatContext);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#212121] flex">
      {/* Sidebar */}
      <div className="w-[20%] h-full">
        <ChatSidebar />
      </div>

      {/* Main Chat Area */}
      <div className="w-[80%] h-full text-white flex flex-col">
        {/* Scrollable Messages Section */}
        <div className="w-full flex-1 overflow-y-auto chatgpt-scrollbar px-5 py-10">
          {/* Center Column Like ChatGPT */}
          <div className="max-w-5xl w-full mx-auto flex flex-col gap-6">
            {/* USER MESSAGE */}

            {messages.map((msg, index) =>
              msg.role === "user" ? (
                <div
                  key={index}
                  className="self-end bg-[#303030] text-white px-4 py-3 rounded-xl max-w-[75%] wrap-break-word"
                >
                  {msg.content}
                </div>
              ) : (
                <div
                  key={index}
                  className="self-start  text-white px-4 py-3  max-w-none wrap-break-words prose prose-invert"
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

            {/* ASSISTANT MESSAGE */}
          </div>
        </div>

        {/* Chat Input */}
        <div className="w-full mt-auto">
          <ChatInput isConnected={isConnected} />
        </div>
      </div>
    </div>
  );
};

export default Home;
