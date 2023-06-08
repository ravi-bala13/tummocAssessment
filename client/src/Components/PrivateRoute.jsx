import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { token } = useSelector((store) => store);

  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
}

export default PrivateRoute;
