
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import RecommendItem from "./recommendItem";

const Category = () => {
  const { listRecommend } = useSelector((state) => state.home);
  const current = JSON.parse(localStorage.getItem("LoginUser"));

  return (
    <Row>
      <div className="recommend">
        <div className="recommend__account">
          <img src={current.avatar} alt="" />
          <div className="recommend__account__name">
            <p>{current.name}</p>
            <p>{current.email}</p>
          </div>
        </div>
        <div className="recommend__header">
          <p>Gợi ý cho bạn</p>
          <a href="">Xem tất cả</a>
        </div>
        <ul>
          {listRecommend && listRecommend.map((user, index) => {
            if (index < 4) {
              return <RecommendItem key={index} user={user} />;
            }
          })}
        </ul>
      </div>
    </Row>
  );

};

export default Category;
