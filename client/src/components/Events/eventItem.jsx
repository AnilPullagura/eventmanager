import { Link } from "react-router-dom";
import "./index.css";

const EventItem = (props) => {
  const { details } = props;
  const { _id, name, location, date } = details;

  return (
    <Link className="link" to={`/events/${_id}`}>
      <li className="event-item">
        <div className="event-details">
          <div>
            <h1 className="event-name">{name}</h1>
            <p className="event-location">{location}</p>
          </div>
          <p className="event-date">{new Date(date).toLocaleDateString()}</p>
        </div>
      </li>
    </Link>
  );
};
export default EventItem;
