import { DeleteOutline, Favorite, FavoriteBorder, Reply } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Message = ({ message, handleImagePopup, handleTymMessage }) => {
    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    const currentConversation = useSelector((state) => state.chat.conversations).find((item) => item._id === params.id);
    return (
        <div className={`rightPanel__conversation__content ${message.sender._id === currentUser._id ? 'mine' : ''}`}>
            {message.sender._id !== currentUser._id && (
                <div className="rightPanel__conversation__content__image">
                    <img src={message.sender.avatar} alt="unsplash" />
                </div>
            )}
            {message.content.isImage === true ? (
                <img
                    src={message.content.text}
                    alt="pictureChat"
                    className="rightPanel__conversation__content__textImage"
                    onClick={() => handleImagePopup(message.content.text)}
                />
            ) : (
                <p
                    className={`rightPanel__conversation__content__text ${
                        message.sender._id === currentUser._id ? 'mine' : ''
                    }`}
                >
                    {message.content.text}
                </p>
            )}

            {message.tym.length > 1 ? (
                <div
                    className={`rightPanel__conversation__content__react multiple ${
                        message.sender._id === currentUser._id ? 'mine' : ''
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
                            message.sender._id === currentUser._id ? 'mine' : ''
                        }`}
                    >
                        <Favorite
                            htmlColor="red"
                            fontSize="small"
                            className="rightPanel__conversation__content__react__tym"
                        />
                    </div>
                )
            )}
            <div
                className={`rightPanel__conversation__content__whoTymToolTip ${
                    message.sender._id === currentUser._id ? 'mine' : ''
                }`}
            >
                {currentConversation.members.map((member) => {
                    if (message.tym.includes(member._id)) {
                        return <p key={member._id}>{member.name}</p>;
                    }
                    return;
                })}
            </div>
            <div
                className={`rightPanel__conversation__content__options ${
                    message.sender._id === currentUser._id ? 'mine' : ''
                }`}
            >
                {!message.tym.includes(currentUser._id) ? (
                    <FavoriteBorder onClick={() => handleTymMessage(message._id, currentUser._id)} />
                ) : (
                    <Favorite htmlColor="red" />
                )}
                <Reply />
                <DeleteOutline />
            </div>
        </div>
    );
};

export default Message;
