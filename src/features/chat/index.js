import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../shareComponents/notfound/NotFound';
import Chatpage from './pages/ChatPage';

const IndexChat = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<Chatpage />}></Route>
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            <Outlet />
        </div>
    );
};

export default IndexChat;
