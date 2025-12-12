import ChatSidebar from "../components/ChatSidebar";
import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { ChatListContext } from "../context/chatList/ChatListContext";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router";
import { ChatDisplay } from "../components/ChatDisplay";

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { dispatch } = useContext(ChatListContext);

  const location = useLocation();

  const isChatRoute = location.pathname.startsWith("/chat/");

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
  }, [dispatch]);

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
      {/* Hamburger (Mobile Only) */}
      <button
        className="md:hidden text-white absolute top-4 left-4 z-50 p-2 bg-[#303030] rounded-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <>
        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-full w-[260px] md:w-[22%] lg:w-[20%]
      bg-black border-r border-[#333] z-50 
      transform transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
        >
          <ChatSidebar closeSidebar={() => setIsSidebarOpen(false)} />
        </div>
      </>

      {isChatRoute ? <Outlet /> : <ChatDisplay isConnected={isConnected} />}
    </div>
  );
};

export default Home;
