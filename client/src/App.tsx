import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import EventContext from "./context";
import Login from "./components/login/index.tsx";
import Home from "./components/Home/index.tsx";
import History from "./components/History/index.tsx";
import EventDetails from "./components/EventDetails/index.tsx";
import Admin from "./components/Admin";
import NotFound from "./components/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

import { User } from "./types";

const App = () => {
  const [user, setUser] = useState<string | null>(Cookies.get("user") || null);

  const loginUser = (userDetails: string) => {
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </EventContext.Provider>
  );
};

export default App;
