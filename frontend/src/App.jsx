import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth/AuthProvider";
import "./App.css";
import { ChatProvider } from "./context/chat/ChatProvider";
import { ChatListProvider } from "./context/chatList/ChatListProvider";

function App() {
  return (
    <AuthProvider>
      <div className="bg-black w-screen h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatListProvider>
                  <ChatProvider>
                    <Home />
                  </ChatProvider>
                </ChatListProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
