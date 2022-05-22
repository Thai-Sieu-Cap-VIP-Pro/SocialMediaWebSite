import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPostsById } from "../../profileSlice";
import PostItem from "../PostItem";

import "./styles.scss"

const UserPost = () => {
    const dispatch = useDispatch()
    const activeId = useSelector((state) => state.user.activeId)
    const posts = useSelector(state => state.user.posts)
    console.log(posts)
    useEffect( async () => {
        const action = getPostsById(activeId);
        await dispatch(action)
    }, [])

    return (
        <Container>
            <Row className="container">
                {
                    posts.length && 
                    posts.map((item, index) => (
                        <PostItem key={index} post={item} />
                    ))
                }
            </Row>
        </Container>
    )
}

export default UserPost

const List = [
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    },
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    },
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    },
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    }
]