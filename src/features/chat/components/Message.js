import { DeleteOutline, Favorite, FavoriteBorder, Reply } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tymMessage } from '../ChatSlice';
import { socket } from '../pages/ChatPage';

const Message = ({ message, handleImagePopup }) => {
    const [isTymMsg, setIsTymMsg] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.current);
    const handleTymMessage = async (userId, messageId) => {
        try {
            const result = await dispatch(tymMessage({ userId, messageId })).unwrap();
            socket.emit('sendTym', result.newMessage);
            setIsTymMsg(true);
        } catch (error) {
            throw error;
        }
    };

    console.log({ message });
    console.log(message.sender._id === currentUser._id);
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
            {message.tym.length !== 0 && (
                <div
                    className={`rightPanel__conversation__content__react ${
                        message.sender._id === currentUser._id ? 'mine' : ''
                    }`}
                >
                    {message.tym.length}
                    <Favorite
                        htmlColor="red"
                        fontSize="small"
                        className="rightPanel__conversation__content__react__tym"
                    />
                </div>
            )}

            <div
                className={`rightPanel__conversation__content__options ${
                    message.sender._id === currentUser._id ? 'mine' : ''
                }`}
            >
                {!message.tym.includes(currentUser._id) ? (
                    <FavoriteBorder onClick={() => handleTymMessage(currentUser._id, message._id)} />
                ) : (
                    <Favorite htmlColor="red" onClick={() => setIsTymMsg(false)} />
                )}
                <Reply />
                <DeleteOutline />
            </div>
        </div>
    );
};

export default Message;
