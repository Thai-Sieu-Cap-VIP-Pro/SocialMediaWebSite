import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import {
  InsertEmoticonOutlined,
  HighlightOffOutlined,
} from "@material-ui/icons";
import Picker from "emoji-picker-react";
import { addNewComment, CancelReplyCmd } from "../homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useCloseOutSideToClose from "../../../hooks/useCloseOutSideToClose";
import ErrToast from "../../../shareComponents/errorToast/errToast";
import { socket } from "../pages/homePage";

const AddComment = ({ postId, userPostId }) => {
  const current = JSON.parse(localStorage.getItem("LoginUser"));
  const { replingCmt, isLoadingAddCmt, editingCmt } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    console.log(editingCmt);
  }, [editingCmt]);
  const dispatch = useDispatch();
  const [showEmoji, setshowEmoji] = useState(false);
  const [inputValue, setinputValue] = useState(editingCmt?.content);

  const submitComment = async () => {
    const message = {
      postId,
      parentId: null,
      message: inputValue,
    };

    let params = {
      content: inputValue,
      postId: postId,
      commentId: replingCmt.CmtID,
    };

    const action = addNewComment(params);

    //trước khi gửi emmit thì gọi api add comment vào trong backend
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }

    let notification = {
      userId: userPostId, // cái này là id của thằng cần gửi thông báo tới
      type: "1",
      senderName: current.name,
    };

    socket.emit("send_message", message);
    socket.emit("send_notificaton", notification);
    setinputValue("");
    setshowEmoji(false);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setinputValue((a) => a + emojiObject.emoji);
    //setshowEmoji(false);
  };

  const DeleteReply = () => {
    const action = CancelReplyCmd();
    dispatch(action);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      submitComment();
    }
  };

  let domNode = useCloseOutSideToClose(() => {
    setshowEmoji(false);
  });

  return (
    <Row className="addComment">
      <div
        className="load"
        style={{ display: isLoadingAddCmt == true ? "" : "none" }}
      >
        <Spinner animation="border" variant="primary" size="sm" />
      </div>
      <Col md={1}>
        <InsertEmoticonOutlined onClick={() => setshowEmoji(!showEmoji)} />
      </Col>
      {showEmoji && (
        <Picker
          ref={domNode}
          className="addComment_emoji"
          onEmojiClick={handleEmojiClick}
          pickerStyle={{
            width: "100%",
            outerHeight: "100%",
            innerHeight: "100px",
          }}
        ></Picker>
      )}
      <Col md={9} className="reply">
        {replingCmt.CmtUserName == "" ? (
          ""
        ) : (
          <span className="replyName">
            <span>{replingCmt.CmtUserName}</span>
            <FontAwesomeIcon onClick={DeleteReply} icon={faCircleXmark} />
          </span>
        )}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Thêm bình luận..."
        ></input>
      </Col>
      <Col md={2}>
        <p
          style={{ textAlign: "right" }}
          className="addComment_btn"
          onClick={submitComment}
        >
          Đăng
        </p>
      </Col>
      {/* <ErrToast /> */}
    </Row>
  );
};

export default AddComment;
