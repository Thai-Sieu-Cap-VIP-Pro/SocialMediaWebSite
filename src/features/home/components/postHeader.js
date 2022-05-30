import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Modal, Row, Form, Button } from 'react-bootstrap';
import IMAGES from '../../../assets/images/imageStore';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ShowReportModal, HideDetailEdit, deletePost } from '../homeSlice';
import ReportModal from './reportModal';
import { addActiveId, getPostsByUserId } from '../../user/profileSlice';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({ postId, postUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfoId = useSelector((state) => state.auth.current._id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //show report modal
  const showModal = (id) => {
    console.log(id);
    const action = ShowReportModal();
    dispatch(action);
    // setIsShowDialog(!isShowDialog);
  };

  const hanldeShowProfile = (id) => {
    const action = addActiveId(id);
    dispatch(action);
    navigate('/account');
  };

  const hideDetail = () => {
    const action = HideDetailEdit();
    dispatch(action);
  };

  const handleEditPost = () => {
    navigate('new/edit-post');
    hideDetail();
  };
  const handleDeletePost = () => {
    setShowDeleteModal(true);
  };

  const closeDialog = () => {
    setShowDeleteModal(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const action1 = deletePost(postId);
    dispatch(action1);
    const action2 = getPostsByUserId(postUser._id);
    dispatch(action2);
    closeDialog();
    hideDetail();
  };

  return (
    <Row>
      <Col md={1} onClick={() => hanldeShowProfile(postUser._id)}>
        <img src={postUser?.avatar} alt="" />
      </Col>
      <Col md={8} onClick={() => hanldeShowProfile(postUser._id)}>
        <h6>{postUser?.name}</h6>
      </Col>
      {
        //check if user is not the owner of the post
        userInfoId === postUser._id && (
          <Col className="edit_container" md={3}>
            <div className="dialog_container">
              <FontAwesomeIcon
                icon={faEllipsis}
                id="more"
                onClick={() => showModal(postId)}
              />
              <div className="button edit_btn" onClick={() => handleEditPost()}>
                Edit
              </div>
              <div
                className="button delete_btn"
                onClick={() => handleDeletePost()}
              >
                Delete
              </div>
            </div>
          </Col>
        )
      }
      {
        // check show delete modal
        <Modal
          centered
          show={showDeleteModal}
          onHide={closeDialog}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xóa bài viết?</Modal.Title>
          </Modal.Header>
          <Form onSubmit={onSubmit}>
            <Modal.Body>Bài viết sẽ được xóa vĩnh viễn!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeDialog}>
                Hủy
              </Button>
              <Button variant="secondary" type="submit">
                Xóa
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      }
    </Row>
  );
};

export default PostHeader;
