import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import "./authPage.scss";

const RegisterPage = () => {
  const currentUser = useSelector((state) => state.auth.current);
  return (
    <div className="registerPage">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
