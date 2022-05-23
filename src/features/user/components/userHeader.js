import React, { useState } from 'react';
import { InsertEmoticonOutlined } from '@material-ui/icons';

import Dialog from './Dialog';
import { useSelector } from 'react-redux';
import FollowersList from './FollowersList';

const UserHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);

  const UserInfo = useSelector((state) => state.user.userInfo);
  const posts = useSelector((state) => state.user.posts)

  const { name, avatar } = UserInfo;
  const totalFollower = UserInfo.followers?.length;
  const totalFollowing = UserInfo.following?.length;

  const handleShowFollow = (isFollowers) => {
    setIsShowFollowers(isFollowers)
    setShowModalFollow(true)
  }

  return (
    <div>
      {showModal && (
        <Dialog showModal={showModal} setShowModal={setShowModal} />
      )}
      {showModalFollow && (
        <FollowersList
          showModal={showModalFollow}
          setShowModal={setShowModalFollow}
          isFollowers={isShowFollowers}
        />
      )}
      {/* {showModalFollow && isShowFollowers (
        <FollowersList
          showModal={showModalFollow}
          setShowModal={setShowModalFollow}
          followers={isShowFollowers}
        />
      )} */}
      <div className="header__container ">
        <div className="d-flex flex-row justify-content-center">
          <div className="p-2">
            <div className="avatar__container">
              <img src={avatar} />
            </div>
          </div>
          <div className="p-2 ">
            <div className="d-flex flex-column user__info ">
              <div className="p-0 ">
                <div className="">
                  <div className="d-flex  flex-row ">
                    <div className="p-2 username ">{name}</div>
                    <div
                      className="p-2  span align-self-center"
                      onClick={() => setShowModal(true)}
                    >
                      <button className="edit_button">Edit profile </button>
                    </div>
                    <div className="p-2  span align-self-center">
                      <InsertEmoticonOutlined />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-0 ">
                <div className="d-flex  flex-row">
                  <div className="p-2 ">{posts?.length} posts</div>
                  <div
                    className="p-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleShowFollow(true)}
                  >
                    {totalFollower} followers
                  </div>
                  <div
                    className="p-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleShowFollow(false)}
                  >
                    {totalFollowing} following
                  </div>
                </div>
              </div>
              {/* <div className="p-2">
                <div>TT</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
