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

    const showDialog = async (a) => {
        const action2 = getPostById({ postId: a });
        await dispatch(action2).unwrap();

        const action1 = getCommentsByPostID(a);
        await dispatch(action1).unwrap();

        const action = ShowDetail(a);
        dispatch(action);

        socket.emit('joinComment', a);
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
