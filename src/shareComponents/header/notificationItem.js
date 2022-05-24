import React from "react";

import {
  ModeComment,
  Forum,
  Favorite,
  ReplyAll,
  CreateNewFolder,
} from "@material-ui/icons";
import { format } from "timeago.js";

import "./Header.scss";
import { Col, Row } from "react-bootstrap";
import {
  getCommentsByPostID,
  getPostById,
  ShowDetail,
} from "../../features/home/homeSlice";
import { socket } from "../../App";
import { useDispatch } from "react-redux";

const NotificationItem = ({ info }) => {
  const dispatch = useDispatch();
  const { type, senderName, postId } = info;
  let content = "";
  let icon;
  switch (type) {
    case 1:
      content = " đã bình luận bài viết của bạn";
      icon = <ModeComment className="commentIcon" />;
      break;
    case 2:
      content = " đã thích bài viết của bạn";
      icon = <Favorite className="tymIcon" />;
      break;
    case 3:
      content = " đã theo dõi bạn";
      icon = <ReplyAll className="followIcon" />;
      break;
    case 4:
      content = " đã phản hồi bình luận của bạn";
      icon = <Forum className="replyIcon" />;
      break;
    case 5:
      content = " vừa đăng bài viết mới";
      icon = <CreateNewFolder className="newIcon" />;
      break;
    default:
      break;
  }

  const showPostDetail = async (a) => {
    const action2 = getPostById(a);
    await dispatch(action2);

    const action1 = getCommentsByPostID(a);
    dispatch(action1);

    const action = ShowDetail(a);
    dispatch(action);

    socket.emit("joinRoom", a);
  };

  return (
    <Row className="notificationItem">
      <Col md={3}>
        <div className="notificationItem_Img">
          <img src={info.img} alt="" />
          {icon}
        </div>
      </Col>

      <Col md={9} style={{ padding: 0 }}>
        <div className="notificationContent">
          <span className="commentName">{senderName}</span> {content}.
          <span className="seePost" onClick={() => showPostDetail(postId)}>
            Xem bài viết
          </span>
          <div className="time">{format(info.time)}</div>
        </div>
      </Col>
    </Row>
  );
};

export default NotificationItem;
