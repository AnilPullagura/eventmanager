import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { FiUserPlus } from "react-icons/fi";
import { FaRegCalendar, FaSackDollar } from "react-icons/fa6";
import EventItem from "./eventItem.jsx";

import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "./adminHeader.jsx";

import "./index.css";

const apiConstants = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const Admin = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    totalRevenue: 0,
  });
  const [events, setEvents] = useState([]);
  const [apiStatus, setStatus] = useState(apiConstants.initial);
  const [searchq, setSearch] = useState("");

  const api = "https://eventmanager-api.onrender.com";

  const getEvents = async () => {
    setStatus(apiConstants.loading);
    try {
      const url = `${api}/api/events/?search=${searchq}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEvents(data.data);
        setStatus(apiConstants.success);
      } else {
        setStatus(apiConstants.failure);
      }
    } catch (err) {
      setStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get("jwt_token");
        const response = await axios.get(`${api}/api/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setError("Failed to load dashboard statistics.");
      }
    };

    fetchStats();
    getEvents();
  }, []);

  const renderEvents = () => {
    return events.map((event) => <EventItem details={event} key={event._id} />);
  };

  const renderLoader = () => {
    return (
      <div className="admin-loading">
        <TailSpin color="blue" height={30} width={30} />
      </div>
    );
  };
  const renderfailure = () => {
    return (
      <div className="admin-error">
        <p>Failed to Load Events</p>
        <button className="retry-btn" type="button" onClick={() => getEvents()}>
          Retry
        </button>
      </div>
    );
  };

  const renderUI = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoader();
      case apiConstants.success:
        return renderEvents();
      case apiConstants.failure:
        return renderfailure();
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <AdminHeader />
      <div className="admin-content">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <FaRegCalendar className="stat-icon" />
            <h2>Total Events</h2>
            <p className="stat-value">{stats.totalEvents}</p>
          </div>
          <div className="stat-card">
            <FiUserPlus className="stat-2-icon" />
            <h2>Total Registrations</h2>
            <p className="stat-value">{stats.totalRegistrations}</p>
          </div>
          <div className="stat-card">
            <FaSackDollar className="stat-3-icon" />
            <h2>Total Revenue</h2>
            <p className="stat-value">${stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="event-admin-box">
          <div className="search-event-box">
            <span>
              <h1>Event Management</h1>
              <p>Manage all scheduled and past events.</p>
            </span>
            <input
              placeholder="Search Events,Registrations"
              onChange={(e) => {
                setSearch(e.target.value);
                setTimeout(() => {
                  getEvents();
                }, 1000);
              }}
              type="search"
              value={searchq}
            />
          </div>

          <ul className="admin-event-list">
            <li>
              <div className="list-names">
                <span className="list-name-image">Event Name</span>
                <span className="date-span">Date Time</span>
                <span className="active-span">Status</span>
                <span className="capacity-span">Registrations</span>
                <span className="delete-span">Actions</span>
              </div>
            </li>
            {renderUI()}
          </ul>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
