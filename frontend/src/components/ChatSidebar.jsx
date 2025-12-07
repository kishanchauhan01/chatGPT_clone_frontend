import Button from "@mui/material/Button";
import NewChat from "../assets/newChat.svg";

const ChatSidebar = () => {
    return (
        <div className="w-full h-full bg-black">
            <div className="flex flex-col">
                {/* New chat btn */}
                <div className="flex px-2 m-auto hover:bg-[#393939] transition-all duration-300 w-[80%] rounded-2xl cursor-pointer mt-10">
                    <img src={NewChat} width={24} height={24} />
                    <Button
                        variant="text"
                        sx={{ color: "white", fontSize: "16px" }}
                    >
                        New chat
                    </Button>
                </div>

                <div className="text-white mt-5">
                  <h3 className="p-2">Chats</h3>
                    <ul className="">
                        <li className="p-2 mt-2 m-auto hover:bg-[#393939] transition-all duration-300 w-[80%] rounded-2xl cursor-pointer">
                            test chat 1
                        </li>
                        <li className="p-2 mt-2 m-auto hover:bg-[#393939] transition-all duration-300 w-[80%] rounded-2xl cursor-pointer">
                            test chat 2
                        </li>
                        <li className="p-2 mt-2 m-auto hover:bg-[#393939] transition-all duration-300 w-[80%] rounded-2xl cursor-pointer">
                            test chat 3
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
