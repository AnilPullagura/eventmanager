import { useState } from "react";
import Header from "../Header";
import Events from "../Events";

import "./index.css";

const Home = () => {
  const [searchTag, setTag] = useState("");
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className="home-top-container">
          <h1>Discover Extraordinary Experiences</h1>
          <p>
            Find and book tickets to the best tech conferences, music festivals,
            and art exhibitions happening near you.
          </p>
          <input
            className="search-bar"
            type="search"
            value={searchTag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Seacrh Here..."
          />
        </div>
        <div className="content-box">
          <Events searchTag={searchTag} />
        </div>
      </div>
    </div>
  );
};

export default Home;
