import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import EventContext from "../../context";
import Header from "../Header";
import Events from "../Events";

import "./index.css";
import { MdLogout } from "react-icons/md";

const Home = () => {
  const { user } = useContext(EventContext);
  const [userdata, setData] = useState({});
  const navigate = useNavigate();
  const api = "https://eventmanager-api.onrender.com";

  const fetchuserDetails = async () => {
    const url = `${api}/api/auth/user`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setData(data.user_details);
    }
  };

  useEffect(() => {
    fetchuserDetails();
  }, []);

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className="home-top-box">
          <h1>Welcome {userdata.name}</h1>
          <button type="button" onClick={logout}>
            <MdLogout />
            Logout
          </button>
        </div>
        <div className="content-box">
          <Events />
        </div>
      </div>
    </div>
  );
};

export default Home;
