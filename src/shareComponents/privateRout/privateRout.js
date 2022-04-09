import React from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRout = ({ children, ...rest }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  return auth ? children : <Navigate to="/auth/login" />;
};

export default PrivateRout;
