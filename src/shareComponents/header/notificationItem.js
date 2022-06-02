import React, { useState } from 'react';

import { ModeComment, Forum, Favorite, ReplyAll, CreateNewFolder } from '@material-ui/icons';
import { format } from 'timeago.js';

import './Header.scss';
import { Col, Row } from 'react-bootstrap';
import {
    getCommentsByPostID,
    getNotification,
    getPostById,
    seenNotification,
    ShowDetail,
} from '../../features/home/homeSlice';
import { socket } from '../../App';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addActiveId } from '../../features/user/profileSlice';

const NotificationItem = ({ info, handleNum }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notiType, sender, postId } = info;
    let content = '';
    let icon;
    switch (notiType) {
        case 1:
            content = ' đã bình luận bài viết của bạn';
            icon = <ModeComment className="commentIcon" />;
            break;
        case 2:
            content = ' đã thích bài viết của bạn';
            icon = <Favorite className="tymIcon" />;
            break;
        case 3:
            content = ' đã theo dõi bạn';
            icon = <ReplyAll className="followIcon" />;
            break;
        case 4:
            content = ' đã phản hồi bình luận của bạn';
            icon = <Forum className="replyIcon" />;
            break;
        case 5:
            content = ' vừa đăng bài viết mới';
            icon = <CreateNewFolder className="newIcon" />;
            break;
        case 6:
            content = ' đã thích bình luận của bạn của bạn';
            icon = <Favorite className="tymIcon" />;
            break;
        default:
            break;
    }

    const showPostDetail = async (a, x) => {
        if (info.notiType === 3) {
            dispatch(addActiveId(info.desId));
            navigate('/account');
        } else {
            const actionIsSeen = seenNotification({ notiId: x });
            await dispatch(actionIsSeen).unwrap();

            const action2 = getPostById({ postId: a });
            await dispatch(action2).unwrap();

            const action1 = getCommentsByPostID(a);
            await dispatch(action1).unwrap();

            const action = ShowDetail(a);
            dispatch(action);

            socket.emit('joinComment', a);
        }
    };

    return (
        <Row className={info.isSeen ? 'notificationItem' : 'notificationItem notSeen'}>
            <Col md={3}>
                <div className="notificationItem_Img">
                    <img src={sender.avatar} alt="" />
                    {icon}
                </div>
            </Col>

            <Col md={9} style={{ padding: 0 }}>
                <div className="notificationContent">
                    <span className="commentName">{sender.name}</span> {content}.
                    <div className="seePost" onClick={() => showPostDetail(info.desId, info._id)}>
                        {info.notiType == 3 ? 'Xem trang cá nhân' : 'Xem bài viết'}
                    </div>
                    <Row>
                        <Col md={10}>
                            <div className="time">{format(info.createdAt)}</div>
                        </Col>
                        {info.isSeen ? (
                            <></>
                        ) : (
                            <Col md={2}>
                                <div className="notSeen"></div>
                            </Col>
                        )}
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default NotificationItem;
