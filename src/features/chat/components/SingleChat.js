import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMembersInCon, getMessageInCons } from '../ChatSlice';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { socket } from '../pages/ChatPage';
import { useParams } from 'react-router-dom';

TimeAgo.addLocale(en);
const SingleChat = ({ conversation = null, handleClick = null, setId = null, currentUser = null }) => {
    console.log('render singleChat again');
    const [active, setActive] = useState(false);
    const [messages, setMessages] = useState([]);
    // const conversations = useSelector((state) => state.chat.conversations);
    const params = useParams();
    // console.log({ param: params }, { conId: conversation._id });
    const timeAgo = new TimeAgo('en-US');
    const dispatch = useDispatch();
    const handleClickSingleChat = () => {
        setId(conversation._id);
        handleClick(conversation._id);
    };
    useEffect(() => {
        socket.on('recieveNotice', (leaved) => {
            dispatch(getMessageInCons(conversation._id))
                .unwrap()
                .then((resultValue) => {
                    setMessages(resultValue.messages);
                })
                .catch((rejectedValue) => console.log(rejectedValue));
        });
        return () => {
            // socket.off('recieveNotice');
            console.log('client Off');
        };
    }, [socket]);

    useEffect(() => {
        dispatch(getMessageInCons(conversation._id))
            .unwrap()
            .then((resultValue) => {
                setMessages(resultValue.messages);
            })
            .catch((rejectedValue) => {});
    }, []);

    useEffect(() => {
        console.log(params);
        if (params['*'] === conversation._id) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [params]);

    return (
        <div className={`singleChat ${active ? 'currentConversation' : ''}`} onClick={handleClickSingleChat}>
            <div className="singleChat__image">
                <img
                    src={`${
                        conversation?.members.length === 2
                            ? conversation?.members.find((item) => item._id !== currentUser._id).avatar
                            : 'https://res.cloudinary.com/wjbucloud/image/upload/v1651308420/j2team_girl_8_btpoep.jpg'
                    }`}
                    alt="unsplash"
                />
            </div>
            <div className="singleChat__user">
                <h6 className="singleChat__user__name">
                    {conversation?.members.length === 2
                        ? conversation?.members.find((item) => item._id !== currentUser._id).name
                        : conversation?.members.length === 1
                        ? 'Không còn ai muốn trò chuyện với bạn nữa'
                        : conversation?.members
                              .filter((item) => item._id !== currentUser._id)
                              .map((member) => member.name)
                              .join(', ')}
                </h6>
                <div className="singleChat__user__content">
                    <p className="singleChat__user__content__summary">
                        {messages[messages.length - 1]?.content.isImage === true
                            ? 'Đã gửi hình ảnh'
                            : messages[messages.length - 1]?.content.text}{' '}
                    </p>
                    <span className="singleChat__user__content__time">
                        {messages[messages.length - 1] &&
                            '•' + timeAgo.format(Date.parse(messages[messages.length - 1]?.createdAt), 'mini-now')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SingleChat;
