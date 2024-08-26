import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Tasks from "./components/Tasks/Tasks";
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
  // return authorization header with jwt token
  let accessToken = localStorage.getItem('auth-access-token');
  
  if (accessToken) {
      return { ...config, headers: {...config.headers,
                                       authorization: `Bearer ${accessToken}` }}
  } else {
      return config;
  };
  
}

function App() {

  const [user , setUser ] = useState(localStorage.getItem('smdUser')? localStorage.getItem('smdUser'):{role:'guest'});

  return (
  <userContext.Provider value={{user}}>  
  <Router>
    {/* navbar need to get the user as prop */}
    <Navbar />
    {/* inside it needs to decide what guest need to see and what user see */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard useId={user.id} />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
</userContext.Provider>
)
}

export default App;
