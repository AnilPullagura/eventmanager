import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import "./index.css";

const EventItem = (props) => {
  const { details } = props;
  const { _id, name, location, date, imageUrl, price, category } = details;

  return (
    <li className="event-item">
      <div className="event-box">
        <div
          className="event-top"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <p>{category}</p>
        </div>
        <div className="event-bottom">
          <div className="price-box">
            <p className="price">{price}$</p>
            <p className="date">{new Date(date).toLocaleDateString()}</p>
          </div>
          <h1 className="event-name">{name}</h1>
          <div className="location-container">
            <CiLocationOn className="location-icon" />
            <p>{location}</p>
          </div>
        </div>
        <Link className="link" to={`/events/${_id}`}>
          <button className="book-now" type="button">
            Book Now
          </button>
        </Link>
      </div>
    </li>
  );
};
export default EventItem;
