import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import EventContext from "../../context";
import { TailSpin } from "react-loader-spinner";

import Header from "../Header";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const EventDetails = () => {
  const [apistatus, setStatus] = useState(apiConstants.initial);
  const [result, setResult] = useState("");
  const [eventDetails, setDetails] = useState({});
  const { id } = useParams();
  const { addToHistory } = useContext(EventContext);

  const api = "https://eventmanager-api.onrender.com";
  const token = Cookies.get("jwt_token");

  const getEventsDetails = async () => {
    setStatus(apiConstants.loading);
    const url = `${api}/api/events/${id}`;
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
        setDetails(data.details);
        setStatus(apiConstants.success);
      } else {
        setStatus(apiConstants.failure);
      }
    } catch (er) {
      setStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    getEventsDetails();
  }, []);

  const renderLoader = () => (
    <div className="loader-container">
      <TailSpin color="#00bfff" height={50} width={50} />
    </div>
  );

  const register = async () => {
    const url = `${api}/api/events/${id}/register`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setResult(data.message);
        addToHistory(eventDetails);
        getEventsDetails();
      } else {
        const data = await response.json();
        setResult(data.message);
        getEventsDetails();
      }
    } catch (er) {
      alert(er);
    }
  };

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-app-failure-img.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={getEventsDetails}>
        Retry
      </button>
    </div>
  );

  const renderSuccessView = () => {
    const {
      name,
      description,
      location,
      date,
      availableSeats,
      capacity,
      organizer,
      category,
    } = eventDetails;
    return (
      <div className="event-details-container">
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Location: {location}</p>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
        <p className="seats">
          Seats: {availableSeats} / {capacity}
        </p>
        <p>Organizer:{organizer}</p>
        <p>Category :{category}</p>
        {result && <p className="result">{result}</p>}
        <button type="button" onClick={register}>
          Register Now
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (apistatus) {
      case apiConstants.loading:
        return renderLoader();
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  console.log(result);
  return (
    <div className="event-details-bg-container">
      <Header />
      <div className="event-details-content">{renderContent()}</div>
    </div>
  );
};
export default EventDetails;
