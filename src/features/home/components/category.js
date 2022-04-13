import React from "react";
import { Row } from "react-bootstrap";
import IMAGES from "../../../assets/images/imageStore";

const Category = () => {
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
          <li>
            <div className="recommend__img">
              <img src={IMAGES.logo} alt="" />
            </div>
            <div className="recommend__name">
              <a href="">Ngô Gia Thái</a>
              <p className="recommend__name_desc">Gợi ý cho bạn</p>
            </div>
            <p className="recommend__folo">Theo dõi</p>
          </li>
          <li>
            <div className="recommend__img">
              <img src={IMAGES.login.avatar2} alt="" />
            </div>
            <div className="recommend__name">
              <a href="">Ngô Gia Thái</a>
              <p className="recommend__name_desc">Gợi ý cho bạn</p>
            </div>
            <p className="recommend__folo">Theo dõi</p>
          </li>
          <li>
            <div className="recommend__img">
              <img src={IMAGES.login.phone} alt="" />
            </div>
            <div className="recommend__name">
              <a href="">Ngô Gia Thái</a>
              <p className="recommend__name_desc">Gợi ý cho bạn</p>
            </div>
            <p className="recommend__folo">Theo dõi</p>
          </li>
        </ul>
      </div>
    </Row>
  );
};

export default Category;
