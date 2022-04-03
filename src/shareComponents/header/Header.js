import React from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaperPlane,
  faCirclePlus,
  faCircleH,
  faHeart,
  faMagnifyingGlass,
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { faFontAwesome } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-bootstrap";

import IMAGES from "../../assets/images/imageStore";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={IMAGES.logo} alt="" />
      </div>
      <div className="header__search">
        <FontAwesomeIcon className="concho" icon={faMagnifyingGlass} />
        <input type="text" value="search..." />
      </div>
      <div className="header__icons">
        <NavLink>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink>
          <FontAwesomeIcon icon={faPaperPlane} />
        </NavLink>
        <NavLink>
          <FontAwesomeIcon icon={faCirclePlus} />
        </NavLink>
        <NavLink>
          <FontAwesomeIcon icon={faFontAwesome} />
        </NavLink>
        <NavLink>
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
      </div>
      <div className="header__profile">
        <img src={IMAGES.avatar} alt="" />
        <div className="header__profile__list">
          <ul>
            <li>
              <FontAwesomeIcon icon={faHome} />
              <i>Trang chủ</i>
            </li>
            <li>
              <FontAwesomeIcon icon={faGear} />
              <i>Cài đặt</i>
            </li>
            <li>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <i>Đăng xuất</i>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
