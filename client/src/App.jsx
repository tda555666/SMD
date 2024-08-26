import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Tasks from "./components/Tasks/Tasks";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { userContext } from "./context/userContext";
import { useState } from "react";
import PrivateRoute from "./components/routeuser";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('smduser');
    return storedUser ? JSON.parse(storedUser) : { role: 'guest' };
  });
  console.log(localStorage.getItem('smduser'));
  console.log(user);
  

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={user.role === 'guest' ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={user.role === 'guest' ? <SignUp /> : <Navigate to="/dashboard" />} />
          <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="*" element={<Navigate to={user.role !== 'guest' ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;