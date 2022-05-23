import React, { useEffect, useState } from "react";
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
  NotificationsOutlined,
  ModeComment,
  Favorite,
  PersonAdd,
} from "@material-ui/icons";
import IMAGES from "../../assets/images/imageStore";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../features/auth/authSlice";
import { Button } from "react-bootstrap";
import Usecloseoutsidetoclose from "../../hooks/useCloseOutSideToClose";
import {
  getCommentsByPostID,
  getPostById,
  ShowDetail,
} from "../../features/home/homeSlice";
import SingleDestination from "../../features/chat/components/SingleDestination";
import { socket } from "../../App";
import NotificationItem from "./notificationItem";

const Header = () => {
  const current = JSON.parse(localStorage.getItem("LoginUser"));
  const currentUser = useSelector((state) => state.auth.current);
  const listUser = useSelector((state) => state.auth.listUser).filter(
    (user) => user._id !== currentUser._id
  );

  const { listNotification } = useSelector((state) => state.home);

  const [listNotifications, setListNotifications] = useState([]);

  useEffect(() => {
    listNotification.forEach((item) => {
      const obj = {
        senderName: item.sender.name,
        type: item.notiType,
        postId: item.desId,
      };

      setListNotifications((prev) => [...prev, obj]);
    });
  }, []);

  const [bruh, setBruh] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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

  const [isShowNotificationPanel, setIsShowNotificationPanel] = useState(false);

  const handleLogout = async () => {
    const action = Logout();
    await dispatch(action);
    navigate("/auth/login");
  };

  useEffect(async () => {
    socket
      .off("receive_notification")
      .on("receive_notification", async ({ senderName, type, postId }) => {
        const action = getPostById({ postId });
        await dispatch(action);
        const obj = {
          senderName,
          type,
          postId,
        };
        setListNotifications((prev) => [obj, ...prev]);
      });
  }, [socket]);

  const showNotificationPanel = () => {
    setIsShowNotificationPanel(!isShowNotificationPanel);
  };

  let domNode = Usecloseoutsidetoclose(() => {
    setIsShowNotificationPanel(false);
  });

  const showDetail = async (a) => {
    const action2 = getPostById({ postId: a });
    await dispatch(action2);
    //a là post id
    const action1 = getCommentsByPostID(a);
    dispatch(action1);

    const action = ShowDetail(a);
    dispatch(action);

    // const message = { room: a };
    socket.emit("joinRoom", a);
  };
  //phần react

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
        {searchValue !== "" && (
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
        <div className="notification">
          {listNotifications.length > 0 ? (
            <div className="notification__number">
              {listNotifications.length}
            </div>
          ) : (
            <></>
          )}

          <NotificationsOutlined onClick={showNotificationPanel} />
          {isShowNotificationPanel ? (
            <div ref={domNode} className="notification__panel">
              {listNotifications.length > 0 ? (
                <>
                  <ul>
                    {listNotifications.map((item, index) => {
                      return <NotificationItem info={item} />;
                    })}
                  </ul>
                </>
              ) : (
                <div className="noNotification">Không có thông báo nào</div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
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
