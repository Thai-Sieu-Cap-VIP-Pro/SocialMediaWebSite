import React from "react";
import { Carousel, Spinner } from "react-bootstrap";
import IMAGES from "../../../assets/images/imageStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { HideDetailReducer } from "../homeSlice";
import AddComment from "./addComment";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import PostHeader from "./postHeader";
import ListComment from "./ListComment";
import AlllikesPopup from "./commons/allLikesPopup";

const PostComment = () => {
  const dispatch = useDispatch();

  const { isShowDetail, isLoadCmt, activePostId, listPosts } = useSelector(
    (state) => state.home
  );

  let activePost = listPosts.find((post) => post._id == activePostId);

  const HideDetail = () => {
    const action = HideDetailReducer();
    dispatch(action);
  };

  return (
    <div className="detail" style={{ display: isShowDetail ? "" : "none" }}>
      <div className="detail__layout" onClick={HideDetail}></div>
      <div className="detail__content">
        <div className="detail__content__img">
          <Carousel
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}
          >
            {activePost.images.map((contenItem, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={contenItem}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="detail__content__comment">
          <div className="detail__content__comment__header postItem__header">
            <PostHeader postId={activePostId} postUser={activePost.user} />
          </div>
          <div className="detail__content__comment__body">
            {!isLoadCmt ? (
              <ListComment />
            ) : (
              <Spinner id="load" animation="grow" variant="primary" />
            )}
          </div>
          <div className="detail__content__comment__footer">
            <AddComment postId={activePostId} />
          </div>
        </div>
      </div>
      <div className="detail__icon" onClick={HideDetail}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
      <AlllikesPopup />
    </div>
  );
};

export default PostComment;
