import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Chatpage from "./pages/ChatPage";

const IndexChat = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Chatpage />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default IndexChat;
