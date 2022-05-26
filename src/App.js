import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Auth from "./features/auth";
import IndexHome from "./features/home";
import PrivateRout from "./shareComponents/privateRout/privateRout";
import IndexChat from "./features/chat";
import NotFound from "./shareComponents/notfound/NotFound";
import NewIndex from "./features/newpost/newIndex";
import VideoCall from "./features/chat/components/VideoCall";
import UserIndex from "./features/user";

import io from "socket.io-client";
import { useSelector } from "react-redux";
import PostComment from "./features/home/components/postComment";

export const socket = io.connect("http://localhost:3001");

function App() {
  const { activePostId } = useSelector((state) => state.home);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRout>
              <IndexHome />
            </PrivateRout>
          }
        ></Route>

        <Route
          path="/messenger/*"
          element={
            <PrivateRout>
              <IndexChat />
            </PrivateRout>
          }
        ></Route>
        <Route
          path="/account/*"
          element={
            <PrivateRout>
              <UserIndex />
            </PrivateRout>
          }
        ></Route>
        <Route path="video_call/:id" element={<VideoCall />} />

        <Route
          path="/new/*"
          element={
            <PrivateRout>
              <NewIndex />
            </PrivateRout>
          }
        ></Route>
        {/* <Route path="/*" element={<IndexHome />}></Route> */}
        {/* <Route path="/messenger/*" element={<IndexChat />}></Route> */}
        <Route path="/auth/*" element={<Auth />}></Route>
      </Routes>
      <Outlet></Outlet>
      {activePostId == "" ? "" : <PostComment />}
    </div>
  );
}

export default App;
