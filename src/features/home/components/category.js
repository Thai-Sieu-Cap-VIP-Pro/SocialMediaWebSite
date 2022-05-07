import React from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import IMAGES from "../../../assets/images/imageStore";
import UserSumary from "./commons/userSumary";

const Category = () => {
  const { listRecommend } = useSelector((state) => state.home);

  console.log(listRecommend);

  return (
    <Row>
      <div className="recommend">
        <div className="recommend__account">
          <img src={IMAGES.avatar} alt="" />
          <div className="recommend__account__name">
            <p>giathai_1505</p>
            <p>Gia Thái</p>
          </div>
        </div>
        <div className="recommend__header">
          <p>Gợi ý cho bạn</p>
          <a href="">Xem tất cả</a>
        </div>
        <ul>
          {listRecommend.map((user) => {
            return (
              <li key={user._id}>
                <div className="recommend__img">
                  <img src={IMAGES.logo} alt="" />
                </div>
                <div className="recommend__name">
                  <a href="">{user.email}</a>
                  <p className="recommend__name_desc">Gợi ý cho bạn</p>
                  <div className="recommend__expand">
                    <UserSumary user={user}></UserSumary>
                  </div>
                </div>
                <p className="recommend__folo">Theo dõi</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Row>
  );
};

export default Category;
