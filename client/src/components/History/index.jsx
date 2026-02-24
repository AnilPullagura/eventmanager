import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header";
import HistoryItem from "./historyItem.jsx";
import { BsTicketPerforatedFill } from "react-icons/bs";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const History = () => {
  const [apistatus, setStatus] = useState(apiConstants.initial);
  const [historyEvents, setHistory] = useState([]);
  const api = "https://eventmanager-api.onrender.com";
  const token = Cookies.get("jwt_token");

  const getHistoryEvents = async () => {
    setStatus(apiConstants.loading);
    const url = `${api}/api/events/history`;
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

        setHistory(data.history_events);
        setStatus(apiConstants.success);
      } else {
        setStatus(apiConstants.failure);
      }
    } catch (er) {
      setStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    getHistoryEvents();
  }, []);

  const renderLoader = () => (
    <div className="loader-container">
      <TailSpin color="#00bfff" height={50} width={50} />
    </div>
  );

  const renderNoItemsView = () => (
    <p className="no-items">
      No History Events
      <br />
      Register from Events
    </p>
  );

  const renderSuccessView = () => (
    <div className="history-content">
      <h1 className="history-heading">My Event History</h1>
      <p className="ticket-count">
        <BsTicketPerforatedFill />
        You have {historyEvents.length} active and past event registrations
      </p>
      {historyEvents.length > 0 ? (
        <ul className="events-history">
          {historyEvents.map((event) => (
            <HistoryItem key={event._id} details={event} />
          ))}
        </ul>
      ) : (
        renderNoItemsView()
      )}
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-app-failure-img.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={getHistoryEvents}>
        Retry
      </button>
    </div>
  );

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

  return (
    <div className="history-container">
      <Header />
      {renderContent()}
    </div>
  );
};

export default History;
