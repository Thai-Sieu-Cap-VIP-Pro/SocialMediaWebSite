import React, { useState } from "react";
import { InsertEmoticonOutlined } from "@material-ui/icons";

import ChangeProfilePhotoPopup from './ChangeProfilePhotoPopup'
import FollowersList from "./FollowersList";
import { Button } from "react-bootstrap";
import Dialog from "./Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../../chat/ChatSlice";

const UserHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowChangeAvataPopup, setIsShowChangeAvataPopup] = useState(false);

  const authUserId = useSelector((state) => state.auth.current._id);
  const UserInfo = useSelector((state) => state.user.userInfo);
  const posts = useSelector((state) => state.user.posts);

  const { name, avatar, _id } = UserInfo;
  const totalFollower = UserInfo.followers?.length;
  const totalFollowing = UserInfo.following?.length;

  const conversations = useSelector((state) => state.chat.conversations);
  const currentUser = useSelector((state) => state.auth.current);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowFollow = (isFollowers) => {
    setIsShowFollowers(isFollowers);
    setShowModalFollow(true);
  };

  const handleChangeAvt = () => {
    setIsShowChangeAvataPopup(true)
  }
  const handleGuiTinNhan = (currentUser, destinationUser) => {
    let exist = [];
    console.log({ currentUser, destinationUser });
    console.log(conversations);
    if (conversations.length !== 0) {
      exist = conversations.filter((conversation) => {
        if (conversation.members.length === 2) {
          const listIds = conversation.members.map((member) => {
            return member._id;
          });
          if (
            listIds.includes(currentUser._id) &&
            listIds.includes(destinationUser._id)
          ) {
            return true;
          }
        }
        return false;
      });
      // exist = conversations.filter((conversation) => {
      //     const condition1 = conversation.members.length  === 2;
      //     if (condition1) {
      //         const tagIds = tags.map((tag) => tag._id);
      //         const condition2 = tagIds.every((tagId) => {
      //             return conversation.members.some((member) => {
      //                 return member._id === tagId;
      //             });
      //         });
      //         if (condition2) {
      //             return true;
      //         } else {
      //             return false;
      //         }
      //     } else {
      //         return false;
      //     }
      // });
    }
    if (exist.length !== 0) {
      navigate(`/messenger/${exist[0]._id}`);
    } else {
      dispatch(createConversation({ users: [destinationUser] }))
        .unwrap()
        .then((resultValue) => {
          navigate(`/messenger/${resultValue.conversation._id}`);
        })
        .catch((rejectedValue) => console.log(rejectedValue));
    }
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
      {isShowChangeAvataPopup && (
        <ChangeProfilePhotoPopup
          showModal={isShowChangeAvataPopup}
          setShowModal={setIsShowChangeAvataPopup}
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
            <div className="avatar__container" onClick={() => handleChangeAvt()}>
              <img src={avatar} />
            </div>
          </div>
          <div className="p-2 ">
            <div className="d-flex flex-column user__info ">
              <div className="p-0 ">
                <div className="">
                  <div className="d-flex  flex-row ">
                    <div className="p-2 username ">{name}</div>
                    {authUserId != _id && (
                      <>
                        <Button variant="outline-success" onClick={() => handleGuiTinNhan(currentUser, userInfo)}>Nhắn tin</Button>
                        <Button variant="outline-success">Theo dõi</Button>
                      </>
                    )}
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
                    <span style={{fontSize: 22}}>{posts?.length}</span>Bài viết
                  </div>
                  <div
                    className="p-2 follower"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowFollow(true)}
                  >
                    <span style={{fontSize: 22}}>{totalFollower}</span>Người theo dõi
                  </div>
                  <div
                    className="p-2 following"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowFollow(false)}
                  >
                    <span style={{fontSize: 22}}>{totalFollowing}</span>Đang theo dõi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
