import Cookies from "js-cookie";

import "./index.css";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const HistoryItem = (props) => {
  const [apistatus, setStatus] = useState(apiConstants.initial);
  const { details } = props;
  const token = Cookies.get("jwt_token");
  const { location, name, _id, imageUrl, date } = details;
  const api = "https://eventmanager-api.onrender.com";

  const cancel = async () => {
    setStatus(apiConstants.loading);
    const url = `${api}/api/events/${_id}/cancel`;
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
        alert("Event Registration Cancelled");
        setStatus(apiConstants.success);
        window.location.reload();
      } else {
        const data = await response.json();
        setStatus(apiConstants.success);
        alert(data.message);
        window.location.reload();
      }
    } catch (er) {
      setStatus(apiConstants.failure);
      alert(er);
    }
  };

  const eventTime = () => {
    const eventDate = new Date(date);
    const today = new Date();
    if (eventDate >= today) {
      return true;
    }
    return false;
  };

  const rendersuccessBtn = () => {
    return eventTime() ? (
      <button type="button" className="cancel-btn" onClick={cancel}>
        <MdOutlineCancel /> Cancel Registration
      </button>
    ) : (
      <button className="cancel-btn" type="button">
        Event Ended
      </button>
    );
  };

  const renderBtn = () => {
    switch (apistatus) {
      case apiConstants.loading:
        return (
          <button type="button" className="cancel-btn">
            <TailSpin color="#00bfff" height={20} width={20} />
          </button>
        );
      case apiConstants.success:
        return rendersuccessBtn();
      case apiConstants.initial:
        return rendersuccessBtn();
      default:
        return rendersuccessBtn();
    }
  };

  return (
    <li className="history-item">
      <div className="history-item-content">
        <div
          className="history-item-top-box"
          style={{ backgroundImage: `url(${imageUrl})` || undefined }}
        >
          <p>{eventTime() ? "Upcoming" : "Past"}</p>
        </div>
        <div className="history-item-bottom-box">
          <h1>{name}</h1>
          <div className=" calender-box">
            <CiCalendar className="calender-icon" />
            <p>{new Date(date).toLocaleDateString()}</p>
          </div>
          <div className=" calender-box">
            <CiLocationOn className="calender-icon" />
            <p>Location: {location}</p>
          </div>
          {renderBtn()}
        </div>
      </div>
    </li>
  );
};

export default HistoryItem;
