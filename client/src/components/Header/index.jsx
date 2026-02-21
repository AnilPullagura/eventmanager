import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import EventContext from "../../context";
import Cookies from "js-cookie";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import "./index.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { historyEvents } = useContext(EventContext);

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="header-container">
      <div className="mobile-header">
        <h1 className="header-text">
          <MdEventNote className="icon" /> Event Pro
        </h1>
        <button onClick={logout} type="button">
          <MdLogout />
        </button>
      </div>
      <nav className="nav-items">
        <Link
          to="/"
          className={`nav-link ${currentPath === "/" ? "active-tab" : ""}`}
        >
          <LuLayoutDashboard />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/history"
          className={`nav-link ${
            currentPath === "/history" ? "active-tab" : ""
          }`}
        >
          <MdHistory />
          <span>History</span>
          {EventContext && <span>{historyEvents.length}</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Header;
