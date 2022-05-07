import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMembersInCon, getMessageInCons } from '../ChatSlice';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { socket } from '../pages/ChatPage';

TimeAgo.addLocale(en);
const SingleChat = ({ conversation = [], handleClick = null, setId = null, currentUser = null }) => {
    const [active, setActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const conversations = useSelector((state) => state.chat.conversations);
    const [chatUsers, setChatUsers] = useState([]);
    const timeAgo = new TimeAgo('en-US');
    const dispatch = useDispatch();
    const handleClickSingleChat = () => {
        setId(conversation._id);
        handleClick(conversation._id);
    };
    useEffect(() => {
        socket.on('recieveNotice', (mess) => {
            dispatch(getMessageInCons(conversation._id))
                .unwrap()
                .then((resultValue) => {
                    setMessages(resultValue.messages);
                    console.log('running');
                })
                .catch((rejectedValue) => console.log(rejectedValue));
        });
        return () => {
            socket.off('recieveNotice');
            console.log('client Off');
        };
    }, [socket]);

    useEffect(() => {
        dispatch(getMessageInCons(conversation._id))
            .unwrap()
            .then((resultValue) => {
                setMessages(resultValue.messages);
                console.log('running');
            })
            .catch((rejectedValue) => console.log(rejectedValue));
        const temp = conversation.members.filter((member) => member._id !== currentUser._id);
        setChatUsers(temp);
    }, []);

    return (
        <ListGroup.Item className="singleChat" onClick={handleClickSingleChat}>
            <div className="singleChat__image">
                <img
                    src={`${
                        chatUsers.length === 1
                            ? chatUsers[0]?.avatar
                            : 'https://res.cloudinary.com/wjbucloud/image/upload/v1651308420/j2team_girl_8_btpoep.jpg'
                    }`}
                    alt="unsplash"
                />
            </div>
            <div className="singleChat__user">
                <h6 className="singleChat__user__name">
                    {conversation.name
                        ? conversation.name
                        : chatUsers.length === 0
                        ? 'Không còn ai muốn trò chuyện với bạn nữa '
                        : chatUsers.map((user) => user.name).join(', ')}
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
        </ListGroup.Item>
    );
};

export default SingleChat;
