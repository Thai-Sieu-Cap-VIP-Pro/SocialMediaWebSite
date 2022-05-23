import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { getCommentsByPostID, getPostById, ShowDetail } from '../../../home/homeSlice';

import PostComment from '../../../home/components/postComment';

import './styles.scss';
import { socket } from '../../../../App';

const PostItem = ({ post }) => {
    const dispatch = useDispatch();
    const { isShowDetail } = useSelector((state) => state.home);
    console.log(isShowDetail);

    const showDialog = async (id) => {
        //get post with id selected
        const postSelectedAction = getPostById(id);
        await dispatch(postSelectedAction);

        // get comments of post selected
        const commentAction = getCommentsByPostID(id);
        await dispatch(commentAction);

        // show dialog
        const dialogAction = ShowDetail(id);
        dispatch(dialogAction);

        //socket
        socket.emit('joinRoom', id);
    };

    return (
        <>
            {isShowDetail && <PostComment />}
            <Col sm={4} className="flex" onClick={() => showDialog(post._id)}>
                <Row>
                    <Col className="post-item">
                        <img className="post-image" src={post.images[0]} alt="image" />
                    </Col>
                </Row>
                {/* <Row>
          <Col>{post.content}</Col>
        </Row> */}
            </Col>
        </>
    );
};

export default PostItem;
