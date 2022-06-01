import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../../App";
import { useNavigate } from "react-router-dom";
import { createNotification, follow, unFollow } from "../homeSlice";
import UserSumary from "./commons/userSumary";
import { addActiveId } from "../../user/profileSlice";

const RecommendItem = ({ user }) => {
  const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("LoginUser"));
  const [isShowRecommend, setIsShowRecommend] = useState(false);
  const dispatch = useDispatch();
  const [IsFollow, setIsFollow] = useState(false);
  const handleFollow = (id) => {
    if (IsFollow) {
      const action = unFollow(id);
      dispatch(action);

      setIsFollow(false);
    } else {
      const action1 = follow(id);
      dispatch(action1);

      setIsFollow(true);

      let notification = {
        postId: current._id,
        userId: user._id,
        type: 3,
        senderName: current.name,
        img: current.avatar,
      };
      socket.emit("send_notificaton", notification);

      let paramsCreate = {
        receiver: id,
        notiType: 3,
        desId: current._id,
      };

      const actionCreateNoti = createNotification(paramsCreate);
      dispatch(actionCreateNoti);
    }
  };

  const showRecommend = () => {
    setIsShowRecommend(true);
  };

  const hideRecommend = () => {
    setIsShowRecommend(false);
  };

  const hanldeShowProfile = (id) => {
    const action = addActiveId(id);
    dispatch(action);
    navigate("/account");
  };

  return (
    <li key={user._id}>
      <div className="recommend__img">
        <img src={user.avatar} alt="" />
      </div>
      <div
        className="recommend__name"
        onMouseOver={() => showRecommend()}
        onMouseLeave={() => hideRecommend()}
        onClick={() => hanldeShowProfile(user._id)}
      >
        <a href="">{user?.name}</a>
        <p className="recommend__name_desc">Gợi ý cho bạn</p>
        <div className="recommend__expand">
          {isShowRecommend ? <UserSumary user={user}></UserSumary> : ""}
        </div>
      </div>
      <p className="recommend__folo" onClick={() => handleFollow(user._id)}>
        {IsFollow == true ? "Bỏ theo dõi" : "Theo dõi"}
      </p>
    </li>
  );
};

export default RecommendItem;
