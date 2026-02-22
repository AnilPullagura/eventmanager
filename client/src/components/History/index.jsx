import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import EventContext from "../../context";
import HistoryItem from "./historyItem.jsx";

import "./index.css";

const History = () => {
  const { historyEvents } = useContext(EventContext);
  const api = "https://eventmanager-api.onrender.com";

  return (
    <div className="history-container">
      <Header />
      <div className="history-content">
        <h1>History</h1>
        {historyEvents.length > 0 ? (
          <ul className="events-history">
            {historyEvents.map((event) => (
              <HistoryItem key={event._id} details={event} />
            ))}
          </ul>
        ) : (
          <p className="no-items">
            No History Events
            <br />
            Register from Events
          </p>
        )}
      </div>
    </div>
  );
};
export default History;
