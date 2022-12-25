import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WarningPopup from "../../../shareComponents/WarningPopup/WarningPopup";
import {
  getPostById,
  getCommentsByPostID,
  ShowDetail,
} from "../../home/homeSlice";

import MessagePopup from "./MessagePopup";
import { socket } from "../../../App";
import { AiOutlineDelete } from "react-icons/ai";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { BsFillReplyFill } from "react-icons/bs";

const Message = ({
  message,
  handleImagePopup,
  handleTymMessage,
  handleUnTymMessage,
  handleDeleteMessage,
}) => {
  const currentUser = useSelector((state) => state.auth.current);
  const params = useParams();
  const currentConversation = useSelector(
    (state) => state.chat.conversations
  ).find((item) => item._id === params.id);
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);
  const [isClosePopup, setIsClosePopup] = useState(true);
  const [post, setPost] = useState({});
  const handleClosePopup = () => {
    setIsClosePopup(true);
  };
  const dispatch = useDispatch();

  const handleDeleteMsg = () => {
    handleDeleteMessage(message._id);
    setIsClosePopup(true);
  };

  useEffect(() => {
    if (message.content.messType === "post") {
      getPost(message.content.text);
    }
  }, []);

  const getPost = async (id) => {
    const result = await dispatch(getPostById({ postId: id })).unwrap();
    setPost(result.post[0]);
    console.log(result);
  };

  const showPostDetail = async (a) => {
    const action2 = getPostById({ postId: a });
    await dispatch(action2).unwrap();

    const action1 = getCommentsByPostID(a);
    await dispatch(action1).unwrap();

    const action = ShowDetail(a);
    dispatch(action);

    socket.emit("joinComment", a);
  };

  if (!message.sender) {
    return (
      <div className="rightPanel__conversation__content BOT">
        {message.content.text}
      </div>
    );
  } else {
    return (
      <div
        className={`rightPanel__conversation__content ${
          message.sender?._id === currentUser._id ? "mine" : ""
        }`}
      >
        {console.log(post)}
        {message.sender?._id !== currentUser._id && (
          <div className="rightPanel__conversation__content__image">
            <img src={message.sender?.avatar} alt="unsplash" />
          </div>
        )}
        {message.isDeleted ? (
          <p
            id="bruh-bruh-lmao-lmao"
            className={`rightPanel__conversation__content__text ${
              message.sender?._id === currentUser._id ? "mine" : ""
            }`}
          >
            {message.sender.name} đã thu hồi tin nhắn
          </p>
        ) : message.content.messType === "image" ? (
          <img
            src={message.content.text}
            alt="pictureChat"
            className="rightPanel__conversation__content__textImage"
            onClick={() => handleImagePopup(message.content.text)}
            loading="lazy"
          />
        ) : message.content.messType === "video" ? (
          <video
            controls
            className="rightPanel__conversation__content__textImage"
          >
            <source src={message.content.text} type="video/mp4"></source>
          </video>
        ) : message.content.messType === "post" ? (
          <div
            className={`rightPanel__conversation__content__post ${
              message.sender?._id === currentUser._id ? "mine" : ""
            }`}
            onClick={() => showPostDetail(post._id)}
          >
            <div className="rightPanel__conversation__content__post__header">
              <div className="rightPanel__conversation__content__post__header__ownerAvatar">
                <img src={post?.user?.avatar} alt="ownerAvatar"></img>
              </div>
              <p className="rightPanel__conversation__content__post__header__ownerName">
                {post?.user?.name}
              </p>
            </div>
            <div className="rightPanel__conversation__content__post__body">
              {post?.images?.[0].split(".")[
                post?.images?.[0].split(".").length - 1
              ] === "mp4" ? (
                <video controls>
                  <source src={post?.images?.[0]} type="video/mp4" />
                </video>
              ) : (
                <img src={post?.images?.[0]} alt="thumbnail of the POST" />
              )}
            </div>
            <div className="rightPanel__conversation__content__post__footer">
              <p className="rightPanel__conversation__content__post__footer__postContent">
                <span>{post?.user?.name}</span> {post?.content}
              </p>
            </div>
          </div>
        ) : (
          <p
            className={`rightPanel__conversation__content__text ${
              message.sender?._id === currentUser._id ? "mine" : ""
            }`}
          >
            {message.content.text.includes("http") ? (
              <a href={message.content.text}>{message.content.text}</a>
            ) : (
              message.content.text
            )}
          </p>
        )}

        {!message.isDeleted &&
          (message.tym.length > 1 ? (
            <div
              className={`rightPanel__conversation__content__react multiple ${
                message.sender?._id === currentUser._id ? "mine" : ""
              }`}
            >
              <MdFavorite
                className="rightPanel__conversation__content__react__tym"
                style={{ color: "rgb(237, 73, 86)" }}
              />

              <span>{message.tym.length}</span>
            </div>
          ) : (
            message.tym.length !== 0 && (
              <div
                className={`rightPanel__conversation__content__react ${
                  message.sender?._id === currentUser._id ? "mine" : ""
                }`}
              >
                <MdFavorite
                  className="rightPanel__conversation__content__react__tym"
                  style={{ color: "rgb(237, 73, 86)" }}
                />
              </div>
            )
          ))}
        <div
          className={`rightPanel__conversation__content__whoTymToolTip ${
            message.sender?._id === currentUser._id ? "mine" : ""
          }`}
        >
          {currentConversation.members.map((member) => {
            if (message.tym.includes(member._id)) {
              return <p key={member._id}>{member.name}</p>;
            }
            return null;
          })}
        </div>
        {!message.isDeleted && (
          <div
            className={`rightPanel__conversation__content__options ${
              message.sender?._id === currentUser._id ? "mine" : ""
            }`}
          >
            {!message.tym.includes(currentUser._id) ? (
              <MdFavoriteBorder
                onClick={() => handleTymMessage(message._id, currentUser._id)}
              />
            ) : (
              <MdFavorite
                onClick={() => handleUnTymMessage(message._id, currentUser._id)}
              />
            )}
            <BsFillReplyFill onClick={() => setIsShowMessagePopup(true)} />

            {message.sender?._id === currentUser._id && (
              <AiOutlineDelete onClick={() => setIsClosePopup(false)} />
            )}
          </div>
        )}
        {!isClosePopup && (
          <WarningPopup
            title="Thu hồi tin nhắn"
            content="Bạn có thật sự muốn thu hồi tin nhắn này không?"
            handleOK={handleDeleteMsg}
            handleCANCEL={handleClosePopup}
          />
        )}
        {isShowMessagePopup && (
          <MessagePopup
            setIsShowPopup={setIsShowMessagePopup}
            type="forward"
            content={message.content}
          />
        )}
      </div>
    );
  }
};

export default Message;
