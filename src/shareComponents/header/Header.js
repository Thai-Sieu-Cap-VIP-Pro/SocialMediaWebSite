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
  Close,
} from "@material-ui/icons";
import IMAGES from "../../assets/images/imageStore";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../features/auth/authSlice";
import { Button, Col } from "react-bootstrap";
import Usecloseoutsidetoclose from "../../hooks/useCloseOutSideToClose";
import {
  getCommentsByPostID,
  getNotification,
  seenAllNotification,
  getPostById,
  ShowDetail,
} from "../../features/home/homeSlice";
import SingleDestination from "../../features/chat/components/SingleDestination";
import { socket } from "../../App";
import NotificationItem from "./notificationItem";
import { addActiveId } from "../../features/user/profileSlice";

const Header = () => {
  const activeUserId = useSelector((state) => state.auth.current._id);
  const handleChangeToProfilePage = () => {
    const action = addActiveId(activeUserId);
    dispatch(action);
  };

  const [refresh, setFefresh] = useState(false);
  let [numNotifications, setNumNotifications] = useState(0);
  const current = JSON.parse(localStorage.getItem("LoginUser"));
  const currentUser = useSelector((state) => state.auth.current);
  const listUser = useSelector((state) => state.auth.listUser).filter(
    (user) => user._id !== currentUser._id
  );

  const { listNotification } = useSelector((state) => state.home);

  useEffect(() => {
    setNumNotifications(0);
    listNotification.forEach((item) => {
      if (item.isSeen == false) {
        console.log(item);
        setNumNotifications((prev) => {
          return prev + 1;
        });
      }
    });
  }, [listNotification]);

  const [bruh, setBruh] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .on("receive_notification", async ({ postId }) => {
        console.log("Nhận được thông báo");
        const action = getPostById({ postId });
        await dispatch(action).unwrap();

        let action2 = getNotification();
        await dispatch(action2).unwrap();

        setFefresh(!refresh);
      });
  }, [socket]);

  const showNotificationPanel = () => {
    setIsShowNotificationPanel((prev) => {
      return !prev;
    });
  };

  let domNode = Usecloseoutsidetoclose(() => {
    setIsShowNotificationPanel(false);
  });

  const handleSeenAll = async () => {
    const action = seenAllNotification();
    await dispatch(action).unwrap();
  };

  const handleDirectToProfile = async (userId) => {
    const action = addActiveId(userId);
    dispatch(action);
    navigate("/account");
    setSearchValue("");
  };

  //phần react

  return (
    <header className="header">
      <NavLink className="header__logo" to="/">
        <img src={IMAGES.logo} alt="" />
      </NavLink>
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
            <div
              style={{
                backgroundColor: "#c7c7c7",
                position: "absolute",
                right: 15,
                height: "25px",
                width: "25px",
                borderRadius: "50%",
                padding: "5px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setSearchValue("")}
            >
              <Close fontSize="large" htmlColor="white" />
            </div>
            <div className="header__search__triangleUp"></div>
            <div className="header__search__resultContainer">
              {bruh.length !== 0 ? (
                bruh.map((user, index) => (
                  <div onClick={() => handleDirectToProfile(user._id)}>
                    <SingleDestination
                      follow={user}
                      forRenderSearch={true}
                      key={index}
                    />
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    color: "grey",
                    fontStyle: "italic",
                  }}
                >
                  Không tìm thấy kết quả phù hợp
                </div>
              )}
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
          {numNotifications > 0 ? (
            <div className="notification__number">{numNotifications}</div>
          ) : (
            <></>
          )}

          <NotificationsOutlined
            ref={domNode}
            onClick={showNotificationPanel}
          />
          {isShowNotificationPanel ? (
            <div ref={domNode} className="notification__panel">
              {listNotification.length > 0 ? (
                <>
                  <div className="headerThongBao">Thông báo</div>
                  <ul>
                    {listNotification.map((item, index) => {
                      return (
                        <NotificationItem
                          info={item}
                          handleNum={setNumNotifications}
                        />
                      );
                    })}
                  </ul>
                  <div className="seeMore" onClick={handleSeenAll}>
                    Đánh dấu đã đọc
                  </div>
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
              <NavLink
                onClick={() => handleChangeToProfilePage()}
                to="/account"
                className="profile"
              >
                Trang cá nhân
              </NavLink>
            </li>
            <li id="logout" onClick={handleLogout}>
              <LocalDiningOutlined />
              <i> Đăng xuất</i>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
