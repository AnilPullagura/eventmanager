import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import EventItem from "./eventItem.jsx";
import "./index.css";

const apiConstants = {
  intial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const Events = (props) => {
  const { searchTag } = props;
  const [events, setEvents] = useState([]);
  const [apistatus, setStatus] = useState(apiConstants.intial);

  const api = "https://eventmanager-api.onrender.com";
  const token = Cookies.get("jwt_token");

  const fetchEvents = async () => {
    setStatus(apiConstants.loading);
    const url = `${api}/api/events/?search=${searchTag}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();

        setEvents(data);
        setStatus(apiConstants.success);
      } else {
        setStatus(apiConstants.failure);
      }
    } catch (er) {
      alert(er);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTag]);

  const renderLoader = () => {
    return (
      <div className="loader-container">
        <TailSpin color="#00bfff" height={50} width={50} />
      </div>
    );
  };

  const renderFailureView = () => {
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/events-app-failure-img.png"
          alt="events failure"
        />
        <h1>Something went wrong</h1>
        <p>We're facing some technical difficulty. Please try again.</p>
        <button type="button" onClick={fetchEvents}>
          Retry
        </button>
      </div>
    );
  };

  const renderEvents = () => {
    const eventData = events.data;

    return (
      <div className="events">
        <h1 className="event-heading">All Events</h1>
        <ul className="events-list">
          {eventData.map((event) => (
            <EventItem key={event._id} details={event} />
          ))}
        </ul>
      </div>
    );
  };

  const renderContent = () => {
    switch (apistatus) {
      case apiConstants.loading:
        return renderLoader();
      case apiConstants.success:
        return renderEvents();
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return <div className="events-container">{renderContent()}</div>;
};

export default Events;
