import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { MdEventNote, MdMenu } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import EventContext from "../../context";

import "./index.css";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user } = useContext(EventContext);
  const [userdata, setData] = useState({});
  const username = userdata ? userdata.name : "U";

  const api = "https://eventmanager-api.onrender.com";

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

  const fetchuserDetails = async () => {
    const url = `${api}/api/auth/user`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setData(data.user_details);
    }
  };

  useEffect(() => {
    fetchuserDetails();
  }, []);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const renderToggle = () => {
    return (
      <div className={`toggle-mobile ${isOpen ? "open" : ""}`}>
        <button type="button" onClick={toggle}>
          close
        </button>
        <div className="mobile-profile-section">
          <button type="button" onClick={logout}>
            <MdLogout /> Logout
          </button>
          <p className="avatar">{username}</p>
        </div>

        <Link
          to="/"
          className={`nav-link ${currentPath === "/" ? "active" : "non-active"}`}
        >
          Home
        </Link>
        <Link
          to="/history"
          className={`nav-link ${currentPath === "/history" ? "active" : "non-active"}`}
        >
          My Events
        </Link>
        {userdata.role === "admin" && (
          <Link
            to="/admin"
            className={`nav-link ${currentPath === "/admin" ? "active" : "non-active"}`}
          >
            Admin Dashboard
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <MdEventNote className="icon" />
        <Link to="/">Evently</Link>
      </div>
      <div className="navigator-container">
        <Link
          to="/"
          className={`nav-link ${currentPath === "/" ? "active" : "non-active"}`}
        >
          Home
        </Link>
        <Link
          to="/history"
          className={`nav-link ${
            currentPath === "/history" ? "active" : "non-active"
          }`}
        >
          My Events
        </Link>
        {userdata.role === "admin" && (
          <Link
            to="/admin"
            className={`nav-link ${currentPath === "/admin" ? "active" : "non-active"}`}
          >
            Admin Dashboard
          </Link>
        )}
      </div>
      <div className="profile-container">
        <button onClick={logout} type="button" className="logout-btn">
          <MdLogout />
          Logout
        </button>
        <div className="avatar">{username}</div>
      </div>
      <div className="mobile-profile">
        <button type="button" onClick={toggle}>
          <MdMenu />
        </button>
        {renderToggle()}
      </div>
    </div>
  );
};

export default Header;
