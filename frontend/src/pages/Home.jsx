import ReactMarkdown from "react-markdown";
import Notes from "../assets/notes.md?raw";
import ChatSidebar from "../components/ChatSidebar";
import ChatInput from "../components/ChatInput";
import Send from "../assets/send.png";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-[#212121] flex">
      <div className="w-[20%] h-full">
        <ChatSidebar />
      </div>
      <div className="w-[80%] h-full text-white flex flex-col">
        <div className="w-full mt-auto">
          <ChatInput icon={Send} />
        </div>
      </div>
    </div>
  );
};

export default Home;
