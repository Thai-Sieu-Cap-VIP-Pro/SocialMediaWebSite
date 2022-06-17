import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "../../shareComponents/notfound/NotFound";
import { getNotification } from "./homeSlice";
import HomePage from "./pages/homePage";

const IndexHome = () => {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default IndexHome;
