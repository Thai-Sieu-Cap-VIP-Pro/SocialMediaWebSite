import React from 'react';
import { Route, useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const BruhRoute = ({ children, ...rest }) => {
    const auth = useAuth();

    return !auth ? children : <Navigate to="/" />;
};

export default BruhRoute;
