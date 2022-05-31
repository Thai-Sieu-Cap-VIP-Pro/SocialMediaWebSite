import React, { useState } from "react";
import { InsertEmoticonOutlined } from "@material-ui/icons";

import Dialog from "./Dialog";
import { useSelector } from "react-redux";
import FollowersList from "./FollowersList";
import { Button } from "react-bootstrap";

const UserHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);

  const authUserId = useSelector((state) => state.auth.current._id);
  const UserInfo = useSelector((state) => state.user.userInfo);
  const posts = useSelector((state) => state.user.posts);

  const { name, avatar, _id } = UserInfo;
  const totalFollower = UserInfo.followers?.length;
  const totalFollowing = UserInfo.following?.length;

  const handleShowFollow = (isFollowers) => {
    setIsShowFollowers(isFollowers);
    setShowModalFollow(true);
  };

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
                    <Button variant="outline-success">Nhắn tin</Button>
                    <Button variant="outline-success">Theo dõi</Button>
                    {authUserId === _id && (
                      <Button
                        variant="outline-success"
                        onClick={() => setShowModal(true)}
                      >
                        Sửa thông tin
                      </Button>
                    )}
                    <div className="p-2  span align-self-center">
                      <InsertEmoticonOutlined />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-0 ">
                <div className="d-flex  flex-row">
                  <div className="p-2 numpost">
                    {" "}
                    <span>{posts?.length} </span>bài viết
                  </div>
                  <div
                    className="p-2 follower"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowFollow(true)}
                  >
                    <span> {totalFollower}</span> người theo dõi
                  </div>
                  <div
                    className="p-2 following"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowFollow(false)}
                  >
                    Đang theo dõi<span>{totalFollowing}</span>
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
