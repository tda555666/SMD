import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { userContext } from "./context/userContext";
import { useState } from "react";

window.baseAPIURL = 'http://localhost:3055';
window.config = {
  headers:{
    "content-type": 'application/json;charset=utf-8'
  }
};
window.getAuthConfig = () => {
  let accessToken = localStorage.getItem('auth-access-token');
  let refreshToken = localStorage.getItem('auth-refresh-token');
  
  
  if (accessToken) {
      return { ...config, headers: {...config.headers,
                                       authorization: `Bearer ${accessToken}`,
                                       refresh: refreshToken }}

  }else{
    return config;
  }
  
      
  
  
}

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('smdUser');
    return storedUser ? JSON.parse(storedUser) : { role: 'guest' };
  });

  return (
    <userContext.Provider value={{ user ,setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={ <Contacts /> } />
          <Route path="/login" element={user.role == "guest"  ? <Login /> : <Dashboard userId={user.id}/>} />
          <Route path="/signup" element={user.role == "guest"  ? <SignUp /> : <Dashboard userId={user.id}/>} />
          <Route path="/dashboard" element={user.role == "guest"  ? " " :<Dashboard userId={user.id}/>} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </userContext.Provider>
  );
}


export default App;