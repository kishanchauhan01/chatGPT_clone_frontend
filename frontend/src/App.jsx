import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth/AuthProvider";
import "./App.css";
import { ChatProvider } from "./context/chat/ChatProvider";
import { ChatListProvider } from "./context/chatList/ChatListProvider";
import { ChatDisplay } from "./components/ChatDisplay";

function App() {
  return (
    <AuthProvider>
      <ChatListProvider>
        <ChatProvider>
          <div className="bg-black w-screen h-screen">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Registration />} />

              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </ChatProvider>
      </ChatListProvider>
    </AuthProvider>
  );
}

export default App;
