import { DeleteOutline, Favorite, FavoriteBorder, Reply } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import WarningPopup from '../../../shareComponents/WarningPopup/WarningPopup';
import MessagePopup from './MessagePopup';

const Message = ({ message, handleImagePopup, handleTymMessage, handleUnTymMessage, handleDeleteMessage }) => {
    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    const currentConversation = useSelector((state) => state.chat.conversations).find((item) => item._id === params.id);
    const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);
    const [isClosePopup, setIsClosePopup] = useState(true);
    const handleClosePopup = () => {
        setIsClosePopup(true);
    };

    const handleDeleteMsg = () => {
        handleDeleteMessage(message._id);
        setIsClosePopup(true);
    };

    if (!message.sender) {
        return <div className="rightPanel__conversation__content BOT">{message.content.text}</div>;
    } else {
        return (
            <div
                className={`rightPanel__conversation__content ${message.sender?._id === currentUser._id ? 'mine' : ''}`}
            >
                {message.sender?._id !== currentUser._id && (
                    <div className="rightPanel__conversation__content__image">
                        <img src={message.sender?.avatar} alt="unsplash" />
                    </div>
                )}
                {message.isDeleted ? (
                    <p
                        id="bruh-bruh-lmao-lmao"
                        className={`rightPanel__conversation__content__text ${
                            message.sender?._id === currentUser._id ? 'mine' : ''
                        }`}
                    >
                        {message.sender.name} đã thu hồi tin nhắn
                    </p>
                ) : message.content.isImage === true ? (
                    <img
                        src={message.content.text}
                        alt="pictureChat"
                        className="rightPanel__conversation__content__textImage"
                        onClick={() => handleImagePopup(message.content.text)}
                        loading="lazy"
                    />
                ) : (
                    <p
                        className={`rightPanel__conversation__content__text ${
                            message.sender?._id === currentUser._id ? 'mine' : ''
                        }`}
                    >
                        {message.content.text}
                    </p>
                )}

                {!message.isDeleted &&
                    (message.tym.length > 1 ? (
                        <div
                            className={`rightPanel__conversation__content__react multiple ${
                                message.sender?._id === currentUser._id ? 'mine' : ''
                            }`}
                        >
                            <Favorite
                                htmlColor="red"
                                fontSize="small"
                                className="rightPanel__conversation__content__react__tym"
                            />
                            <span>{message.tym.length}</span>
                        </div>
                    ) : (
                        message.tym.length !== 0 && (
                            <div
                                className={`rightPanel__conversation__content__react ${
                                    message.sender?._id === currentUser._id ? 'mine' : ''
                                }`}
                            >
                                <Favorite
                                    htmlColor="red"
                                    fontSize="small"
                                    className="rightPanel__conversation__content__react__tym"
                                />
                            </div>
                        )
                    ))}
                <div
                    className={`rightPanel__conversation__content__whoTymToolTip ${
                        message.sender?._id === currentUser._id ? 'mine' : ''
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
                            message.sender?._id === currentUser._id ? 'mine' : ''
                        }`}
                    >
                        {!message.tym.includes(currentUser._id) ? (
                            <FavoriteBorder onClick={() => handleTymMessage(message._id, currentUser._id)} />
                        ) : (
                            <Favorite
                                htmlColor="red"
                                onClick={() => handleUnTymMessage(message._id, currentUser._id)}
                            />
                        )}
                        <Reply onClick={() => setIsShowMessagePopup(true)} />
                        {message.sender?._id === currentUser._id && (
                            <DeleteOutline onClick={() => setIsClosePopup(false)} />
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
                    <MessagePopup setIsShowPopup={setIsShowMessagePopup} type="forward" content={message.content} />
                )}
            </div>
        );
    }
};

export default Message;
