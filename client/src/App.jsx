import SingUp from "./pages/SingUp/SingUp";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Tasks from "./components/Tasks/Tasks";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<SingUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
);
function App() {
  return <>{routes}</>;
}

export default App;
