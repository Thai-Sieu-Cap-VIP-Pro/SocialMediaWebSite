import React from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  if (authTokens) {
    return true;
  } else {
    return false;
  }
};
export default useAuth;
