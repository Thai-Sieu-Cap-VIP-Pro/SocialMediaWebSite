import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  FavoriteBorderOutlined,
  CheckCircle,
  Favorite,
} from "@material-ui/icons";
import IMAGES from "../../../../assets/images/imageStore";
import "./common.scss";
import { useDispatch, useSelector } from "react-redux";
import { SetReplyCmd, ShowAllLikesModal } from "../../homeSlice";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const CommentItem = ({ CmtItem }) => {
  const dispatch = useDispatch();

  //state use in this component
  const [isLike, setisLike] = useState(false);
  const [isShowChildrenCmt, setisShowChildrenCmt] = useState(false);
  const [isShowCmtOption, setisShowCmtOption] = useState(false);

  //get state from redux store
  const { activePostId, listPosts } = useSelector((state) => state.home);
  const { loginUser } = useSelector((state) => state.auth);

  //variable
  const { reply } = CmtItem;
  let activePost = listPosts.find((post) => post._id == activePostId);
  console.log(activePost);

  const isDelete =
    CmtItem.user._id == loginUser || loginUser == activePost.user._id;

  const isEdit = loginUser == CmtItem.user._id;

  const ShowAlllikesModal = () => {
    const action = ShowAllLikesModal();
    dispatch(action);
  };

  const HandleReply = (cmtId, userName) => {
    const action = SetReplyCmd({ cmtId, userName });
    dispatch(action);
  };

  return (
    <Row className="comment">
      <Col md={{ span: 1, offset: 1 }}>
        <div className="comment_avatar">
          <img src={IMAGES.avatar} alt="" />
        </div>
      </Col>
      <Col md={{ span: 9 }}>
        <div className="comment_content">
          <div className="comment_content_caption">
            <span className="comment_content_caption_name">
              {CmtItem.user.email}
            </span>
            <CheckCircle />
            <span className="comment_content_caption_contnet">
              {CmtItem.content}
            </span>
          </div>
          <div className="comment_content_interact">
            <p className="comment_content_interact_time">
              {format(CmtItem.updatedAt)}
            </p>
            <p
              className="comment_content_interact_luotthich"
              onClick={() => ShowAlllikesModal()}
            >
              {CmtItem.likes.length} lượt thích
            </p>
            <p
              className="comment_content_interact_response"
              onClick={() => HandleReply(CmtItem._id, CmtItem.user.email)}
            >
              Trả lời
            </p>
            <FontAwesomeIcon
              className="comment_content_interact_more"
              icon={faEllipsis}
              onClick={() => setisShowCmtOption(!isShowCmtOption)}
            />
            <div
              className="comment_content_interact_option"
              style={{ display: isShowCmtOption == true ? "" : "none" }}
            >
              <ul>
                <li className={isEdit == true ? "" : "disabledd"}>Sửa</li>
                <li className={isDelete == true ? "" : "disabledd"}>Xóa</li>
              </ul>
            </div>
          </div>
        </div>
      </Col>
      <Col md={{ span: 1 }} className="comment_like">
        {isLike ? (
          <Favorite className="likeActive" onClick={() => setisLike(false)} />
        ) : (
          <FavoriteBorderOutlined onClick={() => setisLike(true)} />
        )}
      </Col>
      {reply.length > 0 ? (
        <Col
          className="comment_childrenStatus"
          md={{ span: 10, offset: 2 }}
          onClick={() => setisShowChildrenCmt(!isShowChildrenCmt)}
        >
          {!isShowChildrenCmt
            ? "____   Xem " + reply.length + " câu trả lời"
            : "____   Ẩn câu trả lời"}
        </Col>
      ) : (
        ""
      )}

      {isShowChildrenCmt == true ? (
        <Col className="comment_chilrentCmt">
          {reply.length > 0 &&
            reply.map((replyItem) => {
              return <CommentItem key={replyItem._id} CmtItem={replyItem} />;
            })}
        </Col>
      ) : (
        <Col></Col>
      )}
    </Row>
  );
};

export default CommentItem;
