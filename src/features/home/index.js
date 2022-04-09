import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";

const IndexHome = () => {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default IndexHome;
