import React from "react";
import "./Header.scss";
import {
  FavoriteBorderOutlined,
  HomeOutlined,
  AddCircleOutline,
  WhatsApp,
  SettingsOutlined,
  AccountCircleOutlined,
  LocalDiningOutlined,
  SearchOutlined,
  NotificationsOutlined
} from "@material-ui/icons";
import IMAGES from "../../assets/images/imageStore";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../features/auth/authSlice";


const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state)=> state.auth.current)

  let navigate = useNavigate();

  const handleSearch = () => {
    console.log("Thay đổi trong ô search");
  };

  const handleLogout = async () => {
    const action = Logout();
    await dispatch(action);
    navigate("/auth/login");
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={IMAGES.logo} alt="" />
      </div>
      <div className="header__search">
        <SearchOutlined className="concho" />
        <input type="text" placeholder="search..." onChange={handleSearch} />
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
        <img src={IMAGES.avatar} alt="" />
        <div className="header__profile__list" id="header__profile__list">
          <ul>
            <NavLink to={`/user/${currentUser._id}`}>
              <AccountCircleOutlined />
              <i>Trang cá nhân</i>
            </NavLink>
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
