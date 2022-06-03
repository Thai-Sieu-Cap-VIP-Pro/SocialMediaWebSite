import React, { useState } from 'react';
import { Carousel, Col, Row, Spinner } from 'react-bootstrap';
import IMAGES from '../../../assets/images/imageStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, handleLike, handleUnLike, HideDetailReducer, getListUser } from '../homeSlice';

import AddComment from './addComment';
import {
    faCircleChevronRight,
    faCircleChevronLeft,
    faCircleXmark,
    faChessKing,
} from '@fortawesome/free-solid-svg-icons';
import PostHeader from './postHeader';
import ListComment from './ListComment';
import AlllikesPopup from './commons/allLikesPopup';
import CommentSkeleton from '../../../shareComponents/skeletonLoading/CommentSkeleton';
import { format } from 'timeago.js';
import { BookmarkBorderOutlined, Favorite, FavoriteBorderOutlined, SendOutlined } from '@material-ui/icons';
import { socket } from '../../../App';
import MessagePopup from '../../chat/components/MessagePopup';

const PostComment = () => {
    const dispatch = useDispatch();

    const current = JSON.parse(localStorage.getItem('LoginUser'));
    const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

    const { isShowDetail, isLoadCmt, activePostId, listPosts, post } = useSelector((state) => state.home);

    let activePost = {};
    if (Object.keys(post).length === 0) {
        console.log('Lấy post trong main');
        activePost = listPosts.find((post) => post._id == activePostId);
        console.log(activePost);
    } else {
        activePost = post;
    }

    const [isLike, setisLike] = useState(activePost.likes.includes(current._id));
    let [numLikes, setnumLikes] = useState(activePost.likes.length);

    const HideDetail = () => {
        const action = HideDetailReducer();
        dispatch(action);
    };

    const HandleLikePost = async (id, userid) => {
        setisLike(!isLike);
        if (isLike) {
            setnumLikes(--numLikes);
            const action1 = handleUnLike(id);
            await dispatch(action1).unwrap();
        } else {
            setnumLikes(++numLikes);
            const action1 = handleLike(id);
            await dispatch(action1).unwrap();

            if (userid != current._id) {
                const paramsCreate = {
                    receiver: userid,
                    notiType: 2,
                    desId: activePostId,
                };
                const action = createNotification(paramsCreate);
                await dispatch(action).unwrap();
                let notification = {
                    postId: activePostId,
                    userId: userid, // cái này là id của thằng cần gửi thông báo tới
                    type: 2,
                    senderName: current.name,
                    img: current.avatar,
                };
                socket.emit('send_notificaton', notification);
            }
        }
    };

    const ShowAlllikesModal = async (a) => {
        const action = getListUser(a);
        await dispatch(action).unwrap();
    };

    return (
        <div className="detail" style={{ display: isShowDetail ? '' : 'none' }}>
            <div className="detail__layout" onClick={HideDetail}></div>
            <div className="detail__content">
                <div className="detail__content__img">
                    <Carousel
                        prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
                        nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}
                    >
                        {activePost.images?.map((contenItem, index) => {
                            return (
                                <Carousel.Item key={index} style={{ display: 'grid', placeItems: 'center' }}>
                                    {contenItem.split('.')[contenItem.split('.').length - 1] === 'mp4' ? (
                                        <video
                                            style={{ display: 'grid', placeItems: 'center', maxHeight: '100%' }}
                                            controls
                                        >
                                            <source src={contenItem} type="video/mp4"></source>
                                        </video>
                                    ) : (
                                        <img className="d-block w-100" src={contenItem} alt="First slide" />
                                    )}
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </div>
                <div className="detail__content__comment">
                    <div className="detail__content__comment__header postItem__header">
                        <PostHeader postId={activePostId} postUser={activePost.user} />
                    </div>
                    <div className="detail__content__comment__body">
                        {!isLoadCmt ? <ListComment /> : <CommentSkeleton />}
                    </div>

                    <div className="detail__content__comment__footer">
                        <div className="react">
                            <Row>
                                <Col className="postItem__react">
                                    <Row className="reactIcon">
                                        <Col md={9}>
                                            {isLike === true ? (
                                                <Favorite
                                                    style={{ color: '#ed4956' }}
                                                    onClick={() => HandleLikePost(activePostId)}
                                                />
                                            ) : (
                                                <FavoriteBorderOutlined
                                                    onClick={() => HandleLikePost(activePostId, activePost.user._id)}
                                                />
                                            )}

                                            <SendOutlined onClick={() => setIsShowMessagePopup(true)} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className="postItem__content__likes" onClick={() => ShowAlllikesModal(activePost.likes)}>
                            {numLikes} lượt thích
                        </div>
                        <div className="postItem__content__caption">{activePost.content}</div>

                        <div className="postItem__content__time">{format(activePost.createdAt)}</div>
                        <AddComment postId={activePostId} userPostId={activePost.user._id} />
                    </div>
                </div>
            </div>
            <div className="detail__icon" onClick={HideDetail}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </div>
            <AlllikesPopup />
            {isShowMessagePopup && (
                <MessagePopup
                    setIsShowPopup={setIsShowMessagePopup}
                    type="forward"
                    content={{ text: activePostId, messType: 'post' }}
                />
            )}
        </div>
    );
};

export default PostComment;
