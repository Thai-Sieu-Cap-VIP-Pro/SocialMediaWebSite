import React from "react";
import { Carousel, Container, Row } from "react-bootstrap";
import IMAGES from "../../../assets/images/imageStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { HideDetailReducer } from "../homeSlice";
import ReactIcon from "./reactIcon";
import AddComment from "./addComment";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import PostHeader from "./postHeader";

const PostComment = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.home.isShowDetail);

  const HideDetail = () => {
    console.log("HIde đi các popup");
    const action = HideDetailReducer();
    dispatch(action);
  };

  return (
    <div className="detail" style={{ display: isShow ? "" : "none" }}>
      <div className="detail__layout" onClick={HideDetail}></div>
      <div className="detail__content">
        <div className="detail__content__img">
          <Carousel
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={IMAGES.honme.jisoo}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={IMAGES.honme.jenni}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={IMAGES.honme.rose}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="detail__content__comment">
          <div className="detail__content__comment__header postItem__header">
            <PostHeader />
          </div>
          <div className="detail__content__comment__body"></div>
          <div className="detail__content__comment__footer">
            <div className="info">
              <div className="info__icon">
                <ReactIcon />
              </div>

              <p className="info__likes">1234567 lượt thích</p>
              <p className="info__time">15 giờ</p>
            </div>
            <AddComment />
          </div>
        </div>
      </div>
      <div className="detail__icon" onClick={HideDetail}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
    </div>
  );
};

export default PostComment;
