import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsByUserId } from '../../profileSlice';
import PostItem from '../PostItem';

import './styles.scss';

const UserPost = () => {
    const dispatch = useDispatch();
    const activeId = useSelector((state) => state.user.activeId);
    const posts = useSelector((state) => state.user.posts);
    useEffect(async () => {
        const action = getPostsByUserId(activeId);
        await dispatch(action);
    }, [activeId]);

    return (
        <Container>
            <Row className="container">
                {posts.length > 0 &&
                    posts
                        .slice()
                        .reverse()
                        .map((item, index) => <PostItem key={index} post={item} />)}
            </Row>
        </Container>
    );
};

export default UserPost;
