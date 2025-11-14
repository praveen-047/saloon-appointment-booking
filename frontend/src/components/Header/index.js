import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import Cookies from "js-cookie";
import {Link} from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import "./index.css";

export default function Header() {
  const [username, setUsername] = useState("");
  const { setSearchTerm, setLocation } = useContext(SearchContext);

  useEffect(() => {
    try {
      const token = Cookies.get("jwt_token");
      if (!token) return;
      const payload = jwtDecode(token);
      setUsername(payload.username);
    } catch (error) {
      console.log("Invalid token:", error);
      setUsername("");
    }
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);

  return (
    <header className="navbar">
      <Link to='/' className="navbar-heading">
        <h1>Saloons</h1>
      </Link>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search your saloon"
          className="navbar-search"
          onChange={handleSearch}
        />
        <select className="navbar-location" onChange={handleLocation}>
          <option value="">Select Location</option>
          <option value="BTM Layout">BTM Layout</option>
          <option value="Rajajinagar">Rajajinagar</option>
          <option value="Bommnahalli">Bommnahalli</option>
          <option value="JP Nagar">JP Nagar</option>
        </select>
      </div>

      <Link to='/profile' className="navbar-heading">
      <div className="navbar-right">
        <FaUserCircle size={28} />
        <span className="navbar-user">
          {username ? username : "Guest"}
        </span>
      </div>
      </Link>
    </header>
  );
}