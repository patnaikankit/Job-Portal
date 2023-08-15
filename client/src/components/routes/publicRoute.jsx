import React from "react";
import { Navigate } from "react-router-dom";

// if the user is logged in it means he is authorized to use any route until the token expires - now every protected route is public for him
// if he tries to access the login/register he will be redirected to the dashboard page
const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  } 
  else {
    return children;
  }
};

export default PublicRoute;