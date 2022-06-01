import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import "./post.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotification,
  getCommentsByPostID,
  getListUser,
  handleLike,
  handleUnLike,
  ShowDetail,
} from "../homeSlice";

import {
  FavoriteBorderOutlined,
  SendOutlined,
  AddCommentOutlined,
  Favorite,
  BookmarkBorderOutlined,
} from "@material-ui/icons";
import PostHeader from "./postHeader";
import { format } from "timeago.js";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import ReportModal from "./reportModal";
import { socket } from "../../../App";
import MessagePopup from "../../chat/components/MessagePopup";

const PostItem = ({ postId, content }) => {
  const dispatch = useDispatch();
  const captionRef = useRef();

  const current = JSON.parse(localStorage.getItem("LoginUser"));

  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  //hàm xử lý show phần comment khi show tất cả phần comment

  const showDetail = (a) => {
    const action1 = getCommentsByPostID(postId);
    dispatch(action1);

    const action = ShowDetail(postId);
    dispatch(action);

    // const message = { room: a };
    socket.emit("joinComment", a);
  };
  //phần react
  const { listPosts } = useSelector((state) => state.home);

  //get list like of the post
  const activePost = listPosts.find((post) => post._id === postId);
  const likes = activePost.likes;

  const isOverflow = () => {
    return (
      captionRef?.current?.offsetHeight < captionRef?.current?.scrollHeight
    );
  };
  //hàm xử lý show phần comment khi show tất cả phần comment

  //hàm xử lý like hay không like bài post
  const HandleLikePost = async (id, userid) => {
    if (content.likes.includes(current._id)) {
      const action1 = handleUnLike(id);
      await dispatch(action1).unwrap();
    } else {
      const action1 = handleLike(id);
      await dispatch(action1).unwrap();

      if (userid != current._id) {
        const paramsCreate = {
          receiver: userid,
          notiType: 2,
          desId: postId,
        };

        const action = createNotification(paramsCreate);
        await dispatch(action).unwrap();
        let notification = {
          postId,
          userId: userid, // cái này là id của thằng cần gửi thông báo tới
          type: 2,
          senderName: current.name,
          img: current.avatar,
        };
        socket.emit("send_notificaton", notification);
      }
    }
  };

  const ShowAlllikesModal = async (a) => {
    const action = getListUser(a);
    await dispatch(action).unwrap();
  };

  const handleWatchMore = (e) => {
    e.target.previousElementSibling.style.overflow = "auto";
    e.target.previousElementSibling.style.display = "block";
    e.target.style.display = "none";
  };
  return (
    <>
      <Row className="postItem">
        <Col md={12} className="postItem__header">
          <PostHeader postId={postId} postUser={content.user} />
        </Col>
        <Col md={12} className="postItem__slide">
          <Carousel
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}
          >
            {content.images.map((contenItem, index) => {
              return (
                <Carousel.Item key={index}>
                  {contenItem.split(".")[contenItem.split(".").length - 1] ===
                  "mp4" ? (
                    <video height="500" width="665" controls>
                      <source src={contenItem} type="video/mp4"></source>
                    </video>
                  ) : (
                    <img
                      className="d-block w-100"
                      src={contenItem}
                      alt="First slide"
                    />
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col className="postItem__react">
          <Row className="reactIcon">
            <Col md={9}>
              {content.likes.includes(current._id) === true ? (
                <Favorite
                  style={{ color: "#ed4956" }}
                  onClick={() => HandleLikePost(postId)}
                />
              ) : (
                <FavoriteBorderOutlined
                  onClick={() => HandleLikePost(postId, content.user._id)}
                />
              )}

              <AddCommentOutlined onClick={() => showDetail(postId)} />

              <SendOutlined onClick={() => setIsShowMessagePopup(true)} />
            </Col>
            <Col md={3} style={{ textAlign: "right" }}>
              <BookmarkBorderOutlined />
            </Col>
          </Row>
        </Col>

        <Col md={12} className="postItem__content">
          <div
            className="postItem__content__likes"
            onClick={() => ShowAlllikesModal(content.likes)}
          >
            {content.likes.length} lượt thích
          </div>
          <div className="postItem__content__caption" ref={captionRef}>
            {content.content}
          </div>
          {isOverflow() && (
            <span
              className="postItem__content__watchMoreBtn"
              onClick={(e) => handleWatchMore(e)}
            >
              Xem thêm
            </span>
          )}
          <div
            className="postItem__content__allCmt"
            onClick={() => showDetail(postId)}
          >
            Xem tất cả {content.comments.length} bình luận
          </div>
          <div className="postItem__content__time">
            {format(content.createdAt)}
          </div>
        </Col>
        <ReportModal userPostId={content.user._id} />
      </Row>
      {isShowMessagePopup && (
        <MessagePopup
          setIsShowPopup={setIsShowMessagePopup}
          type="forward"
          content={{ text: postId, messType: "post" }}
        />
      )}
    </>
  );
};

export default PostItem;
