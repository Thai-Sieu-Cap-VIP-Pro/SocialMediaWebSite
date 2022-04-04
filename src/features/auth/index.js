import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import NotFound from "../../shareComponents/notfound/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const Auth = () => {
  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginForm />}></Route>
        <Route path="register" element={<RegisterForm />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default Auth;
