import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import {
  InsertEmoticonOutlined,
  HighlightOffOutlined,
} from "@material-ui/icons";
import Picker from "emoji-picker-react";
import { socket } from "./postItem";
import { addNewComment, CancelReplyCmd } from "../homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const AddComment = ({ postId }) => {
  const { replingCmt } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [showEmoji, setshowEmoji] = useState(false);
  const [inputValue, setinputValue] = useState("");

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

    socket.emit("send_message", message);
    setinputValue("");
  };

  const handleEmojiClick = (event, emojiObject) => {
    setinputValue((a) => a + emojiObject.emoji);
    //setshowEmoji(false);
  };

  const DeleteReply = () => {
    const action = CancelReplyCmd();
    dispatch(action);
  };

  // useEffect(() => {
  //   const closeEmojiPanel = (e) => {
  //     if (e.path[0].tagName !== "SVG") {
  //       setshowEmoji(false);
  //     }
  //   };

  //   document.body.addEventListener("click", closeEmojiPanel);
  //   return () => {
  //     document.body.addEventListener("click", closeEmojiPanel);
  //   };
  // }, []);

  return (
    <Row className="addComment">
      <Col md={1}>
        <InsertEmoticonOutlined onClick={() => setshowEmoji(!showEmoji)} />
      </Col>
      {showEmoji && (
        <Picker
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
    </Row>
  );
};

export default AddComment;
