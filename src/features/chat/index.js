<<<<<<< HEAD
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "../../shareComponents/notfound/NotFound";
import Chatpage from "./pages/ChatPage";

const IndexChat = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Chatpage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
=======
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Chatpage from './pages/ChatPage';

const IndexChat = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" index element={<Chatpage />}></Route>
            </Routes>
            <Outlet />
        </div>
    );
>>>>>>> 8f29ce9fd42b7ba62f0962dd719ecf30afd4e1b1
};

export default IndexChat;
