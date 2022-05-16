import React, { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Header from "../../../shareComponents/header/Header";
import Category from "../components/category";
import PostComment from "../components/postComment";
import PostItem from "../components/postItem";
import ReportModal from "../components/reportModal";
import { useDispatch, useSelector } from "react-redux";
import { getListRecommendFriends, getPosts } from "../homeSlice";
import "./homePage.scss";
import ErrorFetch from "../../../shareComponents/fetchfail/error";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    listPosts,
    isLoading,
    loadListPostFail,
    activePostId,
    listRecommend,
  } = useSelector((state) => state.home);

  useEffect(() => {
    let action = getPosts();
    dispatch(action);

    let action1 = getListRecommendFriends();
    dispatch(action1);
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container style={{ marginTop: "80px" }}>
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
                <Col md={{ span: 6, offset: 1 }}>
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
                <Col md={{ span: 4 }}>
                  <Category />
                </Col>
              </>
            )}
          </Row>
        )}
        {activePostId == "" ? "" : <PostComment />}
      </Container>
    </>
  );
};

export default HomePage;
