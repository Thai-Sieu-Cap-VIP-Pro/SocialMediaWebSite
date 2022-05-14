// import React from 'react'
// import { Outlet, Route, Routes } from "react-router-dom";
// import {BrowserRouter} from 'react-router-dom'

// import Userpage from './page/userPage'

// const IndexUser = () => {
//   return (
//     <div>
//         <Routes>
//             {/* <Route index element={<Userpage />}></Route> */}
//             <p>đây là trang user</p>
//         </Routes>
//       <Outlet />
//     </div>
//   )
// }

// export default IndexUser

import React from 'react'
import Userpage from './page/userPage'

const IndexUser = () => {
  return (
    <div>
        <Userpage />
    </div>

  )
}

export default IndexUser