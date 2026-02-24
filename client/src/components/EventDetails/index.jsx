import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { CgOrganisation } from "react-icons/cg";

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
  const [btnstatus, setbtnStatus] = useState(apiConstants.initial);
  const [result, setResult] = useState("");
  const [eventDetails, setDetails] = useState({});
  const { id } = useParams();

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
    setbtnStatus(apiConstants.loading);
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
        setbtnStatus(apiConstants.success);
        getEventsDetails();
      } else {
        const data = await response.json();
        setResult(data.message);
        setbtnStatus(apiConstants.success);
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
  const eventEnd = () => {
    setResult("Event has beed ended");
  };

  const successbtn = () => {
    return (
      <button onClick={register} type="button" className="apply-btn ">
        Register Now
      </button>
    );
  };
  const loadingbtn = () => {
    return (
      <button onClick={register} type="button" className="apply-btn">
        <TailSpin color="#ffffff" height={30} width={30} />
      </button>
    );
  };

  const renderbtn = () => {
    switch (btnstatus) {
      case apiConstants.loading:
        return loadingbtn();
      case apiConstants.success:
        return successbtn();
      default:
        return successbtn();
    }
  };

  const validateEvent = () => {
    const { date } = eventDetails;
    const eventDate = new Date(date);
    const today = new Date();
    if (today > eventDate) {
      return (
        <button onClick={eventEnd} className="block-btn" type="button">
          Event Ended
        </button>
      );
    }
    return renderbtn();
  };

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
      imageUrl,
      price,
    } = eventDetails;
    return (
      <div className="event-details-container">
        <div
          className="event-image-container"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <p className="event-details-category">{category}</p>
          <h1 className="event-details-name">{name}</h1>
          <div className="event-details-top-box">
            <span className="event-details-box">
              <CiCalendar className="event-details-icon" />
              <p>{new Date(date).toLocaleDateString()}</p>
            </span>
            <span className="event-details-box">
              <CiLocationOn className="event-details-icon" />
              <p>{location}</p>
            </span>
          </div>
        </div>
        <div className="event-details-bottom-box">
          <div className="event-details-mini-box">
            <div className="event-details-mini-top-box">
              <div className="mini-box">
                <CiCalendar className="event-details-icon" />
                <div className="flex-box">
                  <p className="flex-date">Date</p>
                  <p>{new Date(date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mini-box">
                <CgOrganisation className="event-details-icon" />
                <div className="flex-box">
                  <p className="flex-date">Organizer</p>
                  <p>{organizer}</p>
                </div>
              </div>
              <div className="mini-box">
                <CiLocationOn className="event-details-icon" />
                <div className="flex-box">
                  <p className="flex-date">Location</p>
                  <p>{location}</p>
                </div>
              </div>
            </div>
            <p className="event-details-mini-box-heading">About this Event</p>
            <p className="event-details-mini-box-desc">{description}</p>
            <Link to="/">
              <button className="back-btn" type="button">
                Back
              </button>
            </Link>
          </div>
          <div className="register-container-box">
            <p className="ticket-price">Tickets starting from</p>
            <p className="per-person-price">
              ${price}
              <span>/person</span>
            </p>
            {result && <p className="result">{result}</p>}
            {validateEvent()}
            <div>
              <p className="available-seats">Available seats</p>
              <p className="capacity">
                {availableSeats}/{capacity}
              </p>
            </div>
          </div>
        </div>
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
