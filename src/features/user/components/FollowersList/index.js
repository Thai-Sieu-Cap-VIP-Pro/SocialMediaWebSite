import React from "react";
import { useSelector } from "react-redux";

import Modal from "react-bootstrap/Modal";
import FollowerItem from "../FollowerItem";
import "./styles.scss";

import { Button } from "react-bootstrap";
import FollowingItem from "../FollowingItem";

const FollowersList = ({ showModal, setShowModal, isFollowers }) => {
  const followersList = useSelector((state) => state.user.userInfo.followers);
  const followingList = useSelector((state) => state.user.userInfo.following);

  const handleCloseDialog = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} bsSize="large" onHide={handleCloseDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isFollowers ? "Danh sách theo dõi bạn " : "Danh sách đang theo dõi"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(followersList.length == 0 || followingList.length == 0) &&
          "Danh sách trống"}
        {isFollowers &&
          followersList.length &&
          followersList.map((item, index) => (
            <FollowerItem key={index} user={item} />
          ))}
        {!isFollowers &&
          followingList.length &&
          followingList.map((item, index) => (
            <FollowingItem key={index} user={item} />
          ))}
      </Modal.Body>
    </Modal>
  );
};

export default FollowersList;
