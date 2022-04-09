import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Auth from "./features/auth";
import IndexHome from "./features/home";
import PrivateRout from "./shareComponents/privateRout/privateRout";
import IndexChat from "./features/chat";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route
          path="/"
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
        ></Route> */}
        <Route path="/*" element={<IndexHome />}></Route>
        <Route path="/messenger/*" element={<IndexChat />}></Route>
        <Route path="/auth/*" element={<Auth />}></Route>
      </Routes>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
