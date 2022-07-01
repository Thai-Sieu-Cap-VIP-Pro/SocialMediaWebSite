import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMembersInCon, getMessageInCons } from '../ChatSlice';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { useParams } from 'react-router-dom';
import { socket } from '../../../App';

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
            dispatch(getMessageInCons({ id: conversation._id, page: 0 }))
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
        dispatch(getMessageInCons({ id: conversation._id, page: 0 }))
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
                        conversation?.avatar
                            ? conversation?.avatar
                            : conversation?.members.length === 2
                            ? conversation?.members.find((item) => item._id !== currentUser._id).avatar
                            : conversation?.members.length === 1
                            ? 'https://res.cloudinary.com/wjbucloud/image/upload/v1653282748/haha_axj617.jpg'
                            : 'https://res.cloudinary.com/wjbucloud/image/upload/v1651308420/j2team_girl_8_btpoep.jpg'
                    }`}
                    alt="unsplash"
                />
            </div>
            <div className="singleChat__user">
                <h6 className="singleChat__user__name">
                    {conversation?.name
                        ? conversation?.name
                        : conversation?.members.length === 2
                        ? conversation?.members.find((item) => item._id !== currentUser._id).name
                        : conversation?.members.length === 1
                        ? 'Không còn ai muốn trò chuyện với bạn nữa'
                        : conversation?.members
                              .filter((item) => item._id !== currentUser._id)
                              .map((member) => member.name)
                              .join(', ')}
                </h6>
                <div className="singleChat__user__content">
                    {messages[0]?.isSeen.includes(currentUser._id) ? (
                        <p className="singleChat__user__content__summary">
                            {messages[0]?.content.messType === 'image'
                                ? 'Đã gửi hình ảnh'
                                : messages[0]?.content.messType === 'post'
                                ? `${messages[0]?.sender.name} vừa chia sẻ gì đó`
                                : messages[0]?.content.messType === 'video'
                                ? `${messages[0]?.sender.name} vừa gửi một video`
                                : messages[0]?.isDeleted
                                ? `${messages[0]?.sender.name} đã thu hồi tin nhắn`
                                : messages[0]?.content.text}{' '}
                        </p>
                    ) : (
                        <p
                            style={{ fontWeight: 'bold', color: 'black' }}
                            className="singleChat__user__content__summary"
                        >
                            {messages[0]?.content.messType === 'image'
                                ? 'Đã gửi hình ảnh'
                                : messages[0]?.content.messType === 'post'
                                ? `${messages[0]?.sender.name} vừa chia sẻ gì đó`
                                : messages[0]?.content.messType === 'video'
                                ? `${messages[0]?.sender.name} vừa gửi một video`
                                : messages[0]?.isDeleted
                                ? `${messages[0]?.sender.name} đã thu hồi tin nhắn`
                                : messages[0]?.content.text}{' '}
                        </p>
                    )}

                    <span className="singleChat__user__content__time">
                        {messages[0] && '•' + timeAgo.format(Date.parse(messages[0]?.createdAt), 'mini-now')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SingleChat;
