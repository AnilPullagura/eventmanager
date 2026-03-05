import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Event } from "../../types";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

interface EventItemProps {
  details: Event;
}

interface Response {
  message: string;
}

const EventItem = ({ details }: EventItemProps) => {
  const { _id, name, location, date, availableSeats, capacity, imageUrl } =
    details;
  const api = "https://eventmanager-api.onrender.com";

  const deleteEvent = async (): Promise<void> => {
    const url = `${api}/api/events/${_id}`;
    const token: string | undefined = Cookies.get("jwt_token");
    const options = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data: Response = await response.json();
        toast.success(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const data: Response = await response.json();

        toast.error(data.message);
      }
    } catch (er) {
      if (er instanceof Error) {
        toast.error(er.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <li>
      <div className="list-items">
        <span className="list-item-image">
          <img className="admin-event-img" src={imageUrl} />
          <span>
            <p className="list-item-name">{name}</p>
            <p className="list-item-location">{location}</p>
          </span>
        </span>
        <span className="date-span">{new Date(date).toLocaleDateString()}</span>
        <span
          className={`active-span ${new Date(date) > new Date() ? "upcoming" : "past"}`}
        >
          {new Date(date) > new Date() ? "UpComing" : "Past"}
        </span>
        <span className="capacity-span">
          {availableSeats}/{capacity}
        </span>
        <span className="delete-span">
          <button type="button" onClick={deleteEvent} className="delete-event">
            <MdDeleteForever className="delete-icon" />
          </button>
        </span>
      </div>
    </li>
  );
};
export default EventItem;
