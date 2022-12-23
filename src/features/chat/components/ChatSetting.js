import { AiFillInfoCircle } from "react-icons/ai";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import WarningPopup from "../../../shareComponents/WarningPopup/WarningPopup";
import {
  changeConversationAvatar,
  changeConversationName,
  deleteCon,
  removeUserInCon,
} from "../ChatSlice";
import ChatMember from "./ChatMember";
import useImageUpload from "../../../hooks/useImageUpload";
import { socket } from "../../../App";
import MessagePopup from "./MessagePopup";
import { createMessage } from "../ChatSlice";

const ChatSetting = ({ setIsOpenSetting, currentConversation }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.current);
  const [isClosePopup, setIsClosePopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);
  const uploadImage = useImageUpload();

  const handleDeleteCon = async () => {
    try {
      await dispatch(
        removeUserInCon({
          conversationId: params.id,
          userId: currentUser._id,
        })
      )
        .unwrap()
        .then((resultValue) => console.log(resultValue))
        .catch((rejectedValue) => console.log(rejectedValue));
      const newMessage = await dispatch(
        createMessage({
          content: `${currentUser.name} đã rời khỏi cuộc trò chuyện`,
          conversationId: params.id,
        })
      ).unwrap();
      socket.emit("sendNotice", currentConversation?.members);
      socket.emit("sendMessage", newMessage.newMessage);
      navigate("/messenger");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleClosePopup = () => {
    setIsClosePopup(true);
  };
  const handleOpenPopup = () => {
    setIsClosePopup(false);
  };
  const handleChange = (e) => {
    if (!e.target.value) {
      setIsTyping(false);
      setText("");
    } else {
      setIsTyping(true);
      setText(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await dispatch(
        changeConversationName({ id: params.id, newName: text })
      ).unwrap();
      const newMessage = await dispatch(
        createMessage({
          content: `${currentUser.name} vừa đổi tên cuộc trò chuyện thành ${text}`,
          conversationId: params.id,
        })
      ).unwrap();
      socket.emit("sendMessage", newMessage.newMessage);
      socket.emit("sendNotice", currentConversation?.members);
      setText("");
      setIsTyping(false);
      setIsOpenSetting(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleFileChange = async (e) => {
    setImage(window.URL.createObjectURL(e.target.files[0]));
    const url = await uploadImage(e.target.files[0]);
    const result = await dispatch(
      changeConversationAvatar({ id: params.id, newAvt: url })
    ).unwrap();
    const newMessage = await dispatch(
      createMessage({
        content: `${currentUser.name} đã thay đổi ảnh đại diện cuộc trò chuyện`,
        conversationId: params.id,
      })
    ).unwrap();
    socket.emit("sendMessage", newMessage.newMessage);
    socket.emit("sendNotice", currentConversation?.members);
    setIsOpenSetting(false);
  };

  return (
    <div className="rightPanel">
      <div className="rightPanel__titleSetting">
        <h4>Details</h4>
        <AiFillInfoCircle onClick={() => setIsOpenSetting(false)} />
      </div>
      {currentConversation?.members.length > 2 ? (
        <div>
          <div className="rightPanel__changeGroupPhoto">
            <div className="rightPanel__changeGroupPhoto__image">
              <img
                src={`${
                  currentConversation?.avatar
                    ? currentConversation?.avatar
                    : currentConversation?.members.length === 2
                    ? currentConversation?.members.find(
                        (item) => item._id !== currentUser._id
                      ).avatar
                    : currentConversation?.members.length === 1
                    ? "https://res.cloudinary.com/wjbucloud/image/upload/v1653282748/haha_axj617.jpg"
                    : "https://res.cloudinary.com/wjbucloud/image/upload/v1651308420/j2team_girl_8_btpoep.jpg"
                }`}
                alt="unsplash"
              />
            </div>
            {/* <button
                                onClick={handleSubmit}
                            >Change Group Photo</button> */}
            <div className="rightPanel__changeGroupPhoto__changeImg">
              <label htmlFor="image-input">Change Group Photo</label>
              <input type="file" id="image-input" onChange={handleFileChange} />
            </div>
          </div>

          <div className="rightPanel__changeName">
            <p>Group Name: </p>
            <input
              type="text"
              placeholder="Add a name..."
              value={text}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            {isTyping ? <button onClick={handleSubmit}>Done</button> : <></>}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="rightPanel__mainSetting">
        <div className="rightPanel__mainSetting__title">
          <h4>Members</h4>
          <button onClick={() => setIsShowMessagePopup(true)}>
            Add People
          </button>
        </div>
        <div className="rightPanel__mainSetting__listMember">
          {currentConversation?.members.map((member) => {
            return <ChatMember member={member} key={member._id} />;
          })}
        </div>
        <div className="rightPanel__mainSetting__control">
          <button
            className="rightPanel__mainSetting__control__button"
            onClick={handleOpenPopup}
          >
            Delete Chat
          </button>{" "}
          <br />
          <button className="rightPanel__mainSetting__control__button">
            Block
          </button>{" "}
          <br />
          <button className="rightPanel__mainSetting__control__button">
            Report
          </button>{" "}
          <br />
        </div>
      </div>
      {!isClosePopup && (
        <WarningPopup
          title="Xóa cuộc trò chuyện?"
          content="Việc này sẽ khiến bạn và người khác không thể xem lại nội dung cuộc trò chuyện này nữa"
          handleOK={handleDeleteCon}
          handleCANCEL={handleClosePopup}
        />
      )}
      {isShowMessagePopup && (
        <MessagePopup
          setIsShowPopup={setIsShowMessagePopup}
          type="add"
          listUserId={currentConversation.members.map((mem) => mem._id)}
          setIsOpenSetting={setIsOpenSetting}
        />
      )}
    </div>
  );
};

export default ChatSetting;
