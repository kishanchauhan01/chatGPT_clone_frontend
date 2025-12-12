import ChatSidebar from "../components/ChatSidebar";
import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { ChatListContext } from "../context/chatList/ChatListContext";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { ChatDisplay } from "../components/ChatDisplay";
import { Route, Routes } from "react-router";

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const { dispatch } = useContext(ChatListContext);

  useEffect(() => {
    async function fetchChat() {
      
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/chats/getAllChats",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          // console.log(response.data.data);
          dispatch({
            type: "ADD_ALL_CHATS",
            payload: {
              data: response.data.data,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchChat();
  }, []);

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
    <div className="w-screen h-screen bg-[#212121] flex flex-col md:flex-row">
      <ToastContainer />

      {/* Sidebar */}
      <ChatSidebar />

      <Routes>
        <Route path="/" element={<ChatDisplay isConnected={isConnected} />} />
        <Route
          path="/chat/:chatId"
          element={<ChatDisplay isConnected={isConnected} />}
        />
      </Routes>
    </div>
  );
};

export default Home;
