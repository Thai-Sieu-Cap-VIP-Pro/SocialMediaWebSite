import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FavoriteBorderOutlined, CheckCircle, Favorite } from '@material-ui/icons';
import './common.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    createNotification,
    deleteComment,
    getCommentsByPostID,
    getListUser,
    likeOrUnlikeCmt,
    SetReplyCmd,
} from '../../homeSlice';
import { format } from 'timeago.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import useCloseOutSideToClose from '../../../../hooks/useCloseOutSideToClose';
import { socket } from '../../../../App';

const CommentItem = ({ CmtItem }) => {
    const dispatch = useDispatch();

    const LoginUser = JSON.parse(localStorage.getItem('LoginUser'));
    let islike = CmtItem.likes.includes(LoginUser._id);

    //state use in this component
    let [NumLikes, setNumLikes] = useState(CmtItem.likes.length);
    const [isLike, setisLike] = useState(islike);
    const [isShowChildrenCmt, setisShowChildrenCmt] = useState(false);
    const [isShowCmtOption, setisShowCmtOption] = useState(false);

    //get state from redux store
    const { activePostId, listPosts, post } = useSelector((state) => state.home);

    //variable
    const { reply } = CmtItem;
    let activePost = {};
    if (Object.keys(post).length === 0) {
        activePost = listPosts.find((post) => post._id == activePostId);
    } else {
        activePost = post;
    }

    const isDelete = CmtItem.user._id == LoginUser._id || LoginUser._id == activePost.user._id;

    const isEdit = LoginUser._id == CmtItem.user._id;

    const ShowAlllikesModal = async (a) => {
        const action = getListUser(a);
        await dispatch(action).unwrap();
    };

    const HandleReply = (cmtId, userName, userId) => {
        const action = SetReplyCmd({ cmtId, userName, userId });
        dispatch(action);
    };

    const handleLikeCmt = async (id, x) => {
        setisLike(!isLike);
        const action = likeOrUnlikeCmt(id);
        if (isLike == true) {
            setNumLikes(--NumLikes);
        } else {
            setNumLikes(++NumLikes);
            let notification = {
                postId: activePost._id,
                userId: CmtItem.user._id,
                type: 6,
                senderName: LoginUser.name,
                img: LoginUser.avatar,
            };
            let paramsCreate = {
                receiver: CmtItem.user._id,
                notiType: 6,
                desId: activePost._id,
            };

            const actionCreateNoti = createNotification(paramsCreate);
            await dispatch(actionCreateNoti).unwrap();
            socket.emit('send_notificaton', notification);
        }

        try {
            await dispatch(action);
        } catch (error) {
            console.log(error);
        }

        setisLike(!isLike);
    };

    // const handleEditCmt = (id) => {
    //   //const action = editCmt(CmtItem);
    //   //dispatch(action);
    // };

    const handleDeleteCmt = async (id) => {
        const action = deleteComment({ CmtId: id });
        try {
            await dispatch(action).unwrap();
        } catch (error) {
            console.log(error);
        }

        try {
            const action1 = getCommentsByPostID(activePostId);
            dispatch(action1);
        } catch (error) {}
    };

    let domNode1 = useCloseOutSideToClose(() => {
        setisShowCmtOption(false);
    });

    return (
        <Row className="comment">
            <Col md={{ span: 1, offset: 1 }}>
                <div className="comment_avatar">
                    <img src={CmtItem.user.avatar} alt="" />
                </div>
            </Col>
            <Col md={{ span: 9 }}>
                <div className="comment_content">
                    <div className="comment_content_caption">
                        <span className="comment_content_caption_name">{CmtItem.user.name}</span>
                        <CheckCircle />
                        <span className="comment_content_caption_contnet">{CmtItem.content}</span>
                    </div>
                    <div className="comment_content_interact">
                        <p className="comment_content_interact_time">{format(CmtItem.updatedAt)}</p>
                        {NumLikes > 0 ? (
                            <p
                                className="comment_content_interact_luotthich"
                                onClick={() => ShowAlllikesModal(CmtItem.likes)}
                            >
                                {NumLikes} lượt thích
                            </p>
                        ) : (
                            <></>
                        )}

                        <p
                            className="comment_content_interact_response"
                            onClick={() => HandleReply(CmtItem._id, CmtItem.user.name, CmtItem.user._id)}
                        >
                            Trả lời
                        </p>
                        {(isDelete || isEdit) && (
                            <div className="comment_content_interact_more">
                                <FontAwesomeIcon
                                    // className="comment_content_interact_more"
                                    icon={faEllipsis}
                                    onClick={() => setisShowCmtOption(!isShowCmtOption)}
                                />
                                <div
                                    ref={domNode1}
                                    className="comment_content_interact_more_option"
                                    style={{ display: isShowCmtOption == true ? '' : 'none' }}
                                >
                                    <ul>
                                        {/* <li
                  className={isEdit == true ? "" : "disabledd"}
                  onClick={() => handleEditCmt(CmtItem._id)}
                >
                  Sửa
                </li> */}
                                        <li
                                            className={isDelete == true ? '' : 'disabledd'}
                                            onClick={() => handleDeleteCmt(CmtItem._id)}
                                        >
                                            Xóa
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Col>
            <Col md={{ span: 1 }} className="comment_like">
                {isLike ? (
                    <Favorite className="likeActive" onClick={() => handleLikeCmt(CmtItem._id, CmtItem.user._id)} />
                ) : (
                    <FavoriteBorderOutlined onClick={() => handleLikeCmt(CmtItem._id)} />
                )}
            </Col>
            {reply.length > 0 ? (
                <Col
                    className="comment_childrenStatus"
                    md={{ span: 10, offset: 2 }}
                    onClick={() => setisShowChildrenCmt(!isShowChildrenCmt)}
                >
                    {!isShowChildrenCmt ? '____   Xem ' + reply.length + ' câu trả lời' : '____   Ẩn câu trả lời'}
                </Col>
            ) : (
                ''
            )}

            {isShowChildrenCmt == true ? (
                <Col className="comment_chilrentCmt">
                    {reply.length > 0 &&
                        reply.map((replyItem) => {
                            return <CommentItem key={replyItem._id} CmtItem={replyItem} />;
                        })}
                </Col>
            ) : (
                <Col></Col>
            )}
        </Row>
    );
};

export default CommentItem;
