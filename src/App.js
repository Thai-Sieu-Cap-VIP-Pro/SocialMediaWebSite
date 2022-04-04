import React from "react";
import Header from "./shareComponents/header/Header";
import { Routes, Route, Outlet } from "react-router-dom";
import Auth from "./features/auth";
import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/auth/*" element={<Auth />}></Route>
      </Routes>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
