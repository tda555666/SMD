import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { userContext } from "./context/userContext";
import ChatProvider from "./context/chatContext";  // Import the ChatProvider

const Chat = React.lazy(() => import('chat/App'));

window.baseAPIURL = 'http://localhost:3055';
window.config = {
  headers: {
    "content-type": 'application/json;charset=utf-8'
  }
};
window.getAuthConfig = () => {
  let accessToken = localStorage.getItem('auth-access-token');
  return accessToken ? { ...window.config, headers: { ...window.config.headers, authorization: `Bearer ${accessToken}` } } : window.config;
}

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('smdUser');
    return storedUser ? JSON.parse(storedUser) : { role: 'guest' };
  });

  return (

    <userContext.Provider value={{ user, setUser }}>
      <ChatProvider > {/* Wrap with ChatProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={user.role === "guest" ? <Login /> : <Dashboard userId={user.id} setUser={setUser} />} />
            <Route path="/signup" element={user.role === "guest" ? <SignUp /> : <Dashboard userId={user.id} setUser={setUser} />} />
            <Route path="/dashboard" element={user.role === "guest" ? <Login /> : <Dashboard userId={user.id} setUser={setUser} />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Router>
      </ChatProvider>

    </userContext.Provider>
  );
}

export default App;
