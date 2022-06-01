import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Modal from "react-bootstrap/Modal";
import FollowerItem from "../FollowerItem";
import "./styles.scss";

import { Button } from "react-bootstrap";
import FollowingItem from "../FollowingItem";

const FollowersList = ({ showModal, setShowModal, isFollowers }) => {
  const followersListStore = useSelector(
    (state) => state.user.userInfo.followers
  );
  const followingListStore = useSelector(
    (state) => state.user.userInfo.following
  );

  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    setFollowersList(followersListStore);
    setFollowingList(followingListStore);
  }, [followersListStore, followingListStore]);

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
        {isFollowers
          ? followersList.length === 0
            ? 'Danh sách trống!'
            : followersList.map((item, index) => (
                <FollowerItem key={index} user={item} />
              ))
          : followingList.length === 0
          ? 'Danh sách trống!'
          : followingList.map((item, index) => (
              <FollowingItem key={index} user={item} />
            ))}
      </Modal.Body>
    </Modal>
  );
};

export default FollowersList;
