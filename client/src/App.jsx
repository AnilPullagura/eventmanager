import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import EventContext from "./context";
import Login from "./components/login";
import Home from "./components/Home";
import History from "./components/History";
import EventDetails from "./components/EventDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(Cookies.get("user"));
  const loginUser = (userDetails) => {
    setUser(userDetails);
  };

  return (
    <EventContext.Provider
      value={{
        user,
        loginUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EventContext.Provider>
  );
};

export default App;
