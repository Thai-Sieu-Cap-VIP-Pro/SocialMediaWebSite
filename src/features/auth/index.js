import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import NotFound from "../../shareComponents/notfound/NotFound";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./pages/LoginPage";

const Auth = () => {
  return (
    <div>
      <Routes>
        <Route index element={<LoginPage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterForm />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Auth;
