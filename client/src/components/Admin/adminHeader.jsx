import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { MdEventNote, MdMenu } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./index.css";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const pathlocation = useLocation();
  const navigate = useNavigate();
  const currentPath = pathlocation.pathname;

  const [name, setName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  const api = "https://eventmanager-api.onrender.com";

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

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
          <p className="avatar"></p>
        </div>

        <Link
          to="/"
          className={`nav-link ${currentPath === "/" ? "active" : "non-active"}`}
        >
          Home
        </Link>
        <Link
          to="/admin"
          className={`nav-link ${currentPath === "/admin" ? "active" : "non-active"}`}
        >
          Admin
        </Link>
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
          to="/admin"
          className={`nav-link ${
            currentPath === "/admin" ? "active" : "non-active"
          }`}
        >
          Admin
        </Link>
      </div>
      <div className="profile-container">
        <button onClick={logout} type="button" className="logout-btn">
          <MdLogout />
        </button>
        <Popup
          modal
          nested
          trigger={<button type="button">Create Event</button>}
        >
          {(close) => (
            <div>
              <h1>Create Event</h1>
              <form>
                <input
                  type="text"
                  placeholder="Event Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Organizer"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Create Event</button>
                <button type="button" onClick={close}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </Popup>
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
