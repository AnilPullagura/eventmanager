import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { MdEventNote, MdMenu } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./index.css";

const apiConstants = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const pathlocation = useLocation();
  const navigate = useNavigate();
  const currentPath = pathlocation.pathname;
  const [apiStatus, setStatus] = useState(apiConstants.initial);
  const [erMsg, setMsg] = useState("");
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

  const createEvent = async (event) => {
    setStatus(apiConstants.loading);
    event.preventDefault();
    const token = Cookies.get("jwt_token");
    const url = `${api}/api/events/`;
    const eventDetails = {
      name,
      organizer,
      date,
      location,
      description,
      capacity,
      category,
      imageUrl,
      price,
    };
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventDetails),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setStatus(apiConstants.success);
        close();
      } else {
        const data = await response.json();
        toast.error(data.message);
        setMsg(data.message);
        setStatus(apiConstants.failure);
      }
    } catch (error) {
      setStatus(apiConstants.failure);
      toast.error(error.message);
    }
  };

  const renderLoadBtn = () => {
    return (
      <button type="submit" className="event-create-btn">
        <TailSpin color="#00bfff" height={30} width={30} />
      </button>
    );
  };

  const renderSuccessBtn = () => {
    return (
      <button type="submit" className="event-create-btn">
        Create Event
      </button>
    );
  };

  const renderBtn = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadBtn();
      case apiConstants.success:
        return renderSuccessBtn();
      default:
        return renderSuccessBtn();
    }
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
          contentStyle={{
            borderRadius: "16px",
            border: "2px solid #d3d8deff",
            padding: "10px",
            width: "700px",
            height: "550px",
          }}
          trigger={
            <button className="event-create-btn" type="button">
              Create Event
            </button>
          }
        >
          {(close) => (
            <div className="form-box">
              <div className="form-top-box">
                <p>Create New Event</p>
                <button type="button" onClick={close}>
                  <IoMdClose className="close-icon" />
                </button>
              </div>
              <form onSubmit={createEvent} className="event-form">
                <div className="name-box">
                  <label htmlFor="name">Event Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Tech Summit"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="organizer-box">
                  <span>
                    <label htmlFor="organizer">Organizer</label>
                    <input
                      type="text"
                      id="organizer"
                      placeholder="Company or Name"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                    />
                  </span>
                  <span>
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      placeholder="Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </span>
                </div>
                <div className="organizer-box">
                  <span>
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="Venue"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </span>
                  <span>
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      id="category"
                      placeholder="e.g. Tech"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </span>
                </div>
                <div className="name-box">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    id="desc"
                    rows={3}
                    placeholder="Tell us about the event..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="organizer-box">
                  <span>
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      type="number"
                      id="capacity"
                      placeholder="Max attendees"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </span>
                  <span>
                    <label htmlFor="price">Ticket Price($)</label>
                    <input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </span>
                </div>
                <div className="name-box">
                  <label htmlFor="image">Image URL</label>
                  <input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  {erMsg && <p className="error">{erMsg}</p>}
                </div>
                <div className="send-form">
                  <button
                    className="event-cancel-btn"
                    type="button"
                    onClick={() => {
                      close();
                      setMsg("");
                    }}
                  >
                    Cancel
                  </button>
                  {renderBtn()}
                </div>
              </form>
            </div>
          )}
        </Popup>
      </div>
      <div className="mobile-profile admin-mobile">
        <Popup
          modal
          nested
          contentStyle={{
            borderRadius: "16px",
            border: "2px solid #d3d8deff",
            padding: "10px",
            width: "90vw",
            height: "90vh",
          }}
          trigger={
            <button className="mobile-create" type="button">
              +
            </button>
          }
        >
          {(close) => (
            <div className="form-box">
              <div className="form-top-box">
                <p>Create New Event</p>
                <button type="button" onClick={close}>
                  <IoMdClose className="close-icon" />
                </button>
              </div>
              <form onSubmit={createEvent} className="event-form">
                <div className="name-box">
                  <label htmlFor="name">Event Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Tech Summit"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="organizer-box">
                  <span>
                    <label htmlFor="organizer">Organizer</label>
                    <input
                      type="text"
                      id="organizer"
                      placeholder="Company or Name"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                    />
                  </span>
                  <span>
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      placeholder="Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </span>
                </div>
                <div className="organizer-box">
                  <span>
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="Venue"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </span>
                  <span>
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      id="category"
                      placeholder="e.g. Tech"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </span>
                </div>
                <div className="name-box">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    id="desc"
                    rows={3}
                    placeholder="Tell us about the event..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="organizer-box">
                  <span>
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      type="number"
                      id="capacity"
                      placeholder="Max attendees"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </span>
                  <span>
                    <label htmlFor="price">Ticket Price($)</label>
                    <input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </span>
                </div>
                <div className="name-box">
                  <label htmlFor="image">Image URL</label>
                  <input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  {erMsg && <p className="error">{erMsg}</p>}
                </div>
                <div className="send-form">
                  <button
                    className="event-cancel-btn"
                    type="button"
                    onClick={() => {
                      close();
                      setMsg("");
                    }}
                  >
                    Cancel
                  </button>
                  {renderBtn()}
                </div>
              </form>
            </div>
          )}
        </Popup>
        <button type="button" onClick={toggle}>
          <MdMenu />
        </button>
        {renderToggle()}
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Header;
