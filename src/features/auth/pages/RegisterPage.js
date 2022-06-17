import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import './authPage.scss';

const RegisterPage = () => {
    const currentUser = useSelector((state) => state.auth.current);
    const navigate = useNavigate();
    // useEffect(() => {
    //     document.title = 'Midori • Register';
    //     if (Object.entries(currentUser).length !== 0) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <div className="registerPage">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
