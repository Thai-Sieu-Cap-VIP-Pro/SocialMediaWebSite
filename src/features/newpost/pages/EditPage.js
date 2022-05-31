import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../shareComponents/header/Header';
import { getNotification } from '../../home/homeSlice';
import UpdatePostHeader from '../components/EditPostHeader';
import NewpostContent from '../components/newPostContent';
import NewpostImage from '../components/newPostImage';
import './newpage.scss';

const EditPage = () => {
  const dispatch = useDispatch();
  const { _id, images, content } = useSelector((state) => state.home.post);

  const [listImg, setlistImg] = useState(images);
  const [valueInput, setValueInput] = useState(content);

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
      <Container style={{ marginTop: '115px' }}>
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="newWrapper">
            <Row>
              <UpdatePostHeader listImg={listImg} content={valueInput} postId={_id} />
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

export default EditPage;
