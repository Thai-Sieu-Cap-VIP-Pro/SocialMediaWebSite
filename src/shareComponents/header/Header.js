import React, { useState } from 'react';
import './Header.scss';
import {
    FavoriteBorderOutlined,
    HomeOutlined,
    AddCircleOutline,
    WhatsApp,
    SettingsOutlined,
    AccountCircleOutlined,
    LocalDiningOutlined,
    SearchOutlined,
    NotificationsOutlined,
} from '@material-ui/icons';
import IMAGES from '../../assets/images/imageStore';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../features/auth/authSlice';
import SingleDestination from '../../features/chat/components/SingleDestination';

const Header = () => {
    const current = JSON.parse(localStorage.getItem('LoginUser'));
    const currentUser = useSelector((state) => state.auth.current);
    const listUser = useSelector((state) => state.auth.listUser).filter((user) => user._id !== currentUser._id);

    const [bruh, setBruh] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
        const searchUser = listUser.filter((user) => {
            if (user.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return user;
            }
        });
        setBruh(searchUser);
    };

    const handleLogout = async () => {
        const action = Logout();
        await dispatch(action);
        navigate('/auth/login');
    };

    return (
        <header className="header">
            <div className="header__logo">
                <img src={IMAGES.logo} alt="" />
            </div>
            <div className="header__search">
                <SearchOutlined className="concho" />
                <input
                    type="text"
                    placeholder="search..."
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchValue}
                />
                {searchValue !== '' && (
                    <>
                        <div className="header__search__triangleUp"></div>
                        <div className="header__search__resultContainer">
                            {bruh.map((user) => (
                                <div>
                                    <SingleDestination follow={user} forRenderSearch={true} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="header__icons">
                <NavLink to="/">
                    <HomeOutlined />
                </NavLink>
                <NavLink to="/messenger">
                    <WhatsApp />
                </NavLink>
                <NavLink to="/new">
                    <AddCircleOutline />
                </NavLink>
                <NavLink to="/liked">
                    <NotificationsOutlined />
                </NavLink>
            </div>
            <div className="header__profile">
                <span>{current.name}</span>
                <img src={current.avatar} alt="" />
                <div className="header__profile__list" id="header__profile__list">
                    <ul>
                        <li>
                            <AccountCircleOutlined />
                            <NavLink to="/account">Trang cá nhân</NavLink>
                        </li>
                        <li>
                            <SettingsOutlined />
                            <i>Cài đặt</i>
                        </li>
                        <li id="logout" onClick={handleLogout}>
                            <LocalDiningOutlined />
                            <i>Đăng xuất</i>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
