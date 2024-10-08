import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useContext } from "react";
import { userContext } from "../../context/userContext";
import { logout } from "../../services/auth";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const handleLogout = async () => {
    
    logout(setUser)

    navigate("/");
  }

  const handleSearch = () => {
    // Add your search functionality here
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-md">
      <h2 className="text-2xl font-medium text-indigo-700">ToDo App</h2>
      <ul className="flex">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="ml-5">
          <Link to="/About">About</Link>
        </li>
        <li className="ml-5">
          <Link to="/contacts">Contacts</Link>
        </li>
        { user.role !== "guest" ? (
          <li className="ml-5">
            <Link to="/dashboard">Tasks</Link>
          </li>
        ) : null}
      </ul>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo onLogout={handleLogout} />
    </div>
  );
}

export default Navbar;
