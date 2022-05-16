import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "../../shareComponents/notfound/NotFound";
import UserPage from "./page/userPage";

const UserIndex = () => {
  return (
    <div>
      <Routes>
        <Route index element={<UserPage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default UserIndex;
