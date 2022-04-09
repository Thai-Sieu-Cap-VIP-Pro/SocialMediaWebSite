import React from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { isLogin } = useSelector((state) => state.auth);
  console.log(isLogin);
  return isLogin;
};
export default useAuth;
