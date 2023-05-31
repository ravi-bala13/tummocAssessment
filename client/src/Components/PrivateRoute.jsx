import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state);
  console.log("token:", token);
  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
}

export default PrivateRoute;
