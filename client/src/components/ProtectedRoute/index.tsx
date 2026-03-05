import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

const ProtectedRoute: React.FC = () => {
  const token = Cookies.get("jwt_token");

  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
