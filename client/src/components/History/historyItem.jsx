import Cookies from "js-cookie";
import { useContext } from "react";
import EventContext from "../../context";
import "./index.css";

const HistoryItem = (props) => {
  const { details } = props;
  const token = Cookies.get("jwt_token");
  const { description, location, name, organizer, _id } = details;
  const { removerfromHistory } = useContext(EventContext);
  const api = "https://eventmanager-api.onrender.com";

  const cancel = async () => {
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
        removerfromHistory(_id);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (er) {
      alert(er);
    }
  };
  return (
    <li className="history-item">
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Location: {location}</p>
        <p> Organizer:{organizer}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          cancel();
        }}
      >
        Cancel
      </button>
    </li>
  );
};

export default HistoryItem;
