import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import { FiUserPlus } from "react-icons/fi";
import { FaRegCalendar, FaSackDollar } from "react-icons/fa6";
import EventItem from "./eventItem";
import { Event, Stats, EventsResponse, ApiStatus } from "../../types";

import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "./adminHeader";

import "./index.css";

const apiConstants = {
  loading: "LOADING" as const,
  success: "SUCCESS" as const,
  failure: "FAILURE" as const,
  initial: "INITIAL" as const,
};

const Admin = () => {
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    totalRegistrations: 0,
    totalRevenue: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [apiStatus, setStatus] = useState<ApiStatus>(apiConstants.initial);
  const [searchq, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const api = "https://eventmanager-api.onrender.com";

  const getEvents = async (): Promise<void> => {
    setStatus(apiConstants.loading);
    try {
      const url = `${api}/api/events/?search=${searchq}`;
      const response = await fetch(url);
      if (response.ok) {
        const data: EventsResponse = await response.json();
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
      } catch (err: any) {
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
