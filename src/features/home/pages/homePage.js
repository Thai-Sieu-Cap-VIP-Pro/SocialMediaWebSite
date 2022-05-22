import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import Header from "../../../shareComponents/header/Header";
import Category from "../components/category";
import PostComment from "../components/postComment";
import PostItem from "../components/postItem";
import ReportModal from "../components/reportModal";
import { useDispatch, useSelector } from "react-redux";
import { getListRecommendFriends, getPosts } from "../homeSlice";
import "./homePage.scss";
import ErrorFetch from "../../../shareComponents/fetchfail/error";

import io from "socket.io-client";
import AlllikesPopup from "../components/commons/allLikesPopup";
export const socket = io.connect("http://localhost:3002");

const HomePage = () => {
  const [showB, setShowB] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const toggleShowB = () => setShowB(!showB);
  const current = JSON.parse(localStorage.getItem("LoginUser"));
  const dispatch = useDispatch();
  const {
    listPosts,
    isLoading,
    loadListPostFail,
    activePostId,
    listRecommend,
  } = useSelector((state) => state.home);

  socket.emit("joinNotificationRoom", current._id);

  useEffect(() => {
    let action = getPosts();
    dispatch(action);

    let action1 = getListRecommendFriends();
    dispatch(action1);
  }, []);

  // useEffect(async () => {
  //   socket.off("receive_notification").on("receive_notification", (data) => {
  //     console.log(data.content);
  //     //  setToastMessage(data.content);
  //     // console.log(toastMessage);
  //     toggleShowB();
  //   });
  // }, [socket]);

  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <div className="toastMessage">
        <Toast onClose={toggleShowB} show={showB}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Thông báo</strong>
            <small>11s ago</small>
          </Toast.Header>
          <Toast.Body>Có ai đó mới comment bài viết của bạn</Toast.Body>
        </Toast>
      </div>
      <Container style={{ marginTop: "100px" }}>
        {loadListPostFail ? (
          <Row>
            <ErrorFetch />
          </Row>
        ) : (
          <Row>
            {isLoading ? (
              <Col md={{ span: 12 }} id="loadingPosts">
                <Spinner
                  id="loadingSpinner"
                  animation="border"
                  variant="primary"
                />
              </Col>
            ) : (
              <>
                <Col md={{ span: 7 }}>
                  {listPosts.map((post) => {
                    return (
                      <PostItem
                        key={post._id}
                        postId={post._id}
                        content={post}
                      />
                    );
                  })}
                </Col>
                <Col md={{ span: 4, offset: 1 }}>
                  <Category />
                </Col>
              </>
            )}
          </Row>
        )}
        {activePostId == "" ? "" : <PostComment />}
      </Container>
      <AlllikesPopup />
    </>
  );
};

export default HomePage;
