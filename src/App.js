import React from "react";
import Header from "./shareComponents/header/Header";
import { Routes, Route, Redirect } from "react-router-dom";
import Auth from "./features/auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Header />} />
      </Routes>
    </div>
  );
}

export default App;
