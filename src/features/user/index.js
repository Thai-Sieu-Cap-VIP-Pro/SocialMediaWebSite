
import React from 'react'
import Userpage from './page/userPage'
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "../../shareComponents/notfound/NotFound";

const IndexUser = () => {
  return (
    
    <div>
        <Routes>
          
        <Route index element={<Userpage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>

  )
}

export default IndexUser