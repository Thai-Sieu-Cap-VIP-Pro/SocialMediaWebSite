import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Header from "../../../shareComponents/header/Header";
import { getNotification } from "../../home/homeSlice";
import NewpostContent from "../components/newPostContent";
import NewpostHeader from "../components/newPostHeader";
import NewpostImage from "../components/newPostImage";
import "./newpage.scss";

const NewPage = () => {
  const dispatch = useDispatch();
  const [listImg, setlistImg] = useState([]);
  const [valueInput, setValueInput] = useState("");

  useEffect(async () => {
    let action2 = getNotification();
    await dispatch(action2).unwrap();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container style={{ marginTop: "115px" }}>
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="newWrapper">
            <Row>
              <NewpostHeader listImg={listImg} content={valueInput} />
            </Row>
            <Row>
              <Col md={7} className="newImgWrapper">
                <NewpostImage listImg={listImg} setlistImg={setlistImg} />
              </Col>
              <Col md={5}>
                <NewpostContent
                  valueInput={valueInput}
                  setValueInput={setValueInput}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewPage;
