import React from "react";
import { useMatch, Switch, Route, Routes } from "react-router-dom";
import NotFound from "../../shareComponents/notfound/NotFound";
import Loginform from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const Auth = () => {
  const match = useMatch();
  return (
    <div>
      <Routes>
        <Route path="login" element={Loginform} />
        <Route path="register" element={RegisterForm} />
        <Route component={NotFound} />
      </Routes>
    </div>
  );
};

export default Auth;
