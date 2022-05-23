import React from "react";

import { ModeComment } from "@material-ui/icons";

import "./Header.scss";

const NotificationItem = ({ info }) => {
  const { type, senderName } = info;
  let content = "";
  switch (type) {
    case 1:
      content = " đã bình luận bài viết của bạn";
      break;
    case 2:
      content = " đã thích bài viết của bạn";
      break;
    case 3:
      content = " đã theo dõi bạn";
      break;
    case 4:
      content = " đã phản hồi bình luận của bạn";
      break;
    case 5:
      content = " vừa đăng bài viết mới";
      break;
    default:
      break;
  }
  return (
    <span className="notificationItem">
      <ModeComment className="commentIcon" />
      <div className="notificationContent">
        <span className="commentName">{senderName}</span> {content}
        <div className="seePost">Xem bài viết</div>
      </div>
    </span>
  );
};

export default NotificationItem;
